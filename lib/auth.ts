import { Account, AuthOptions, User as AuthUser } from "next-auth"
import GitHubProviders from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/prisma/prisma.db"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProviders({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password")
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) {
          throw new Error("This email doest not exist")
        }
        const matching = await bcrypt.compare(
          credentials.password,
          user?.hashPassword!,
        )
        if (!matching) {
          throw new Error("password not correct")
        } else {
          return user
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
      if (account?.provider === "credentials") {
        return true
      }
      if (account?.provider === "github") {
        const githubUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        })
        if (!githubUser) {
          await prisma.user.create({
            data: {
              email: user.email as string,
              avatar: user.image as string,
            },
          })
          return true
        }
      }
      return true
    },
  },
}