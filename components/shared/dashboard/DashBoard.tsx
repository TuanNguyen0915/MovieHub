"use client"
import { User } from "@prisma/client"
import Link from "next/link"
import React from "react"
import UserTabs from "./UserTabs"
import { motion } from "framer-motion"

const DashBoard = ({
  currentUser,
}: {
  currentUser: User | null | undefined
}) => {

  return (
    <motion.div className="flexCenter w-full flex-col gap-10">
      <div className="flex w-full items-center gap-4">
        <Link href={"/"} className="transition-all hover:text-primary">
          Home
        </Link>
        <p>{">"}</p>
        <Link href={"/dashboard"} className="transition-all hover:text-primary">
          Dashboard
        </Link>
        <p>{">"}</p>
        <Link href={"/dashboard"} className="transition-all hover:text-primary">
          {currentUser?.email.split("@")[0]}
        </Link>
      </div>
      <div className="flexCenter w-full p-2 lg:w-4/5">
        <UserTabs currentUser={currentUser} />
      </div>
    </motion.div>
  )
}

export default DashBoard
