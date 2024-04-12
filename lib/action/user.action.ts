"use server"
import prisma from "@/prisma/prisma.db"

export const getCurrentUser = async (userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })
  return user
}
