"use client"
import DashBoard from "@/components/shared/daboard/DashBoard"
import { getCurrentUser } from "@/lib/action/user.action"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
const DashBoardPage = () => {
  const { data: session } = useSession()
  const [currentUser, setCurrentUser] = useState<User | null>()
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
    <div className="w-full flexCenter">
      <DashBoard currentUser={currentUser} />
    </div>
  )
}

export default DashBoardPage
