"use client"

import { getCurrentUser } from "@/lib/action/user.action"
import { useUserStore } from "@/lib/stores/user.store"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const CurrentUser = () => {
  const { data: session } = useSession()
  const { currentUser, setCurrentUser } = useUserStore()
  useEffect(() => {
    if (session?.user?.email) {
      const fetchUser = async () => {
        const res = await getCurrentUser(session?.user?.email as string)
        setCurrentUser(res!)
      }
      fetchUser()
    } else {
      return
    }
  }, [session?.user, setCurrentUser])
  return <></>
}

export default CurrentUser
