"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/lib/constant"
import { Menu, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger>
        <div className="headerIcon">
          <Menu size={20} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className="flexCol h-full w-full gap-10 p-4 mt-10">
          <div className="flexBetween w-full gap-2 rounded-full border border-muted-foreground/60 px-4 py-2 opacity-80">
            <Search />
            <input
              placeholder="Search"
              className="w-full border-b border-b-primary bg-transparent p-2 hover:outline-none focus:outline-none"
            />
          </div>
          <div className="flexCol mt-10 flex-1 gap-10 text-end text-2xl">
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
          <Button variant={"custom"}>Subscribe Now</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
