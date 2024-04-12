"use client"
import DashBoard from "@/components/shared/dashboard/DashBoard"
import { useUserStore } from "@/lib/stores/user.store"
import { redirect } from "next/navigation"

const DashBoardPage = () => {
  const { currentUser } = useUserStore()
  if (!currentUser) {
    return redirect("/auth/signin")
  } else {
    return (
      <div className="flexCenter w-full">
        <DashBoard currentUser={currentUser} />
      </div>
    )
  }
}

export default DashBoardPage
