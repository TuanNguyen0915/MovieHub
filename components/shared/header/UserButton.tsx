
import { User } from "@prisma/client"
import { User2 } from "lucide-react"
import Image from "next/image"
import React from "react"

const UserButton = ({ currentUser }: { currentUser: User }) => {
  if (currentUser?.avatar) {
    return (
      <Image
        src={currentUser?.avatar}
        alt="profile"
        width={40}
        height={40}
        className="cursor-pointer rounded-full"
      />
    )
  } else {
    return <User2 size={30} />
  }
}
export default UserButton
