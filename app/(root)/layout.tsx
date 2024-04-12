"use client"
import Footer from "@/components/shared/footer/Footer"
import Header from "@/components/shared/header/Header"
import { getCurrentUser } from "@/lib/action/user.action"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [currentUser, setCurrentUser] = useState<User | undefined | null>()
  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user) {
        const res = await getCurrentUser(session?.user?.email as string)
        setCurrentUser(res)
      } else {
        return
      }
    }
    fetchUser()
  }, [session?.user])
  return (
    <main className="flexCol min-h-screen gap-4">
      <Header currentUser={currentUser}/>
      <section className="w-full flex-1 max-xl:px-4">{children}</section>
      <Footer  />
    </main>
  )
}

export default RootLayout
