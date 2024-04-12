"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/lib/constant"
import { User } from "@prisma/client"
import { Menu, Search, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import SignInButton from "./SignInButton"
import UserButton from "./UserButton"
import SignOutButton from "./SignOutButton"
const MobileNav = ({
  currentUser,
}: {
  currentUser: User | undefined | null
}) => {
  const pathname = usePathname()
  return (
    <div className="flex items-center gap-4">
      <Sheet>
        <SheetTrigger>
          {currentUser ? (
            <div className="flexCenter rounded-full p-2 ring-primary">
              <UserButton currentUser={currentUser} />
            </div>
          ) : (
            <div className="headerIcon">
              <Menu size={20} />
            </div>
          )}
        </SheetTrigger>
        <SheetContent>
          <div className="flexCol h-full w-full gap-10 pt-20">
            <div className="flexBetween w-full gap-2 rounded-full border border-muted-foreground/60 px-4 py-2 opacity-80">
              <Search />
              <input
                placeholder="Search"
                className="w-full border-b border-b-primary bg-transparent p-2 text-sm hover:outline-none focus:outline-none"
              />
            </div>
            {currentUser && (
              <div className="flexBetween w-full border-b border-primary pb-10">
                <div className="flex flex-1 items-center gap-2">
                  <UserButton currentUser={currentUser} />
                  <div className="flexCol">
                    <p className="text-sm">{currentUser.email.split("@")[0]}</p>
                    <p className="text-xs italic">
                      {currentUser.currentPlan} member
                    </p>
                  </div>
                </div>

                <Link href="/dashboard">Dashboard</Link>
              </div>
            )}

            <div className="flexCol mt-5 flex-1 gap-4 text-end text-lg">
              {navLinks.map((link) => {
                const isActive = pathname === link.path
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`capitalize ${isActive ? "text-primary" : ""}`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
            {currentUser ? <SignOutButton /> : <SignInButton />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
