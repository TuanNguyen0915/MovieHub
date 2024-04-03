"use client"
import { navLinks } from "@/lib/constant"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface INavLink {
  style?: string
  setIsOpen?: (value: boolean) => void
}

const NavLink = ({ style, setIsOpen }: INavLink) => {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (setIsOpen) setIsOpen(false)
  }
  return (
    <div className={style}>
      {navLinks.map((link) => {
        const isActive = pathname === link.path
        return (
          <div
            className="group space-y-1"
            key={link.name}
            onClick={handleClick}
          >
            <Link
              href={link.path}
              className={`${isActive ? "text-primary" : ""} text-lg font-bold capitalize`}
            >
              {link.name}
            </Link>
            <div
              className={`h-[1px] w-0 bg-primary transition-all duration-500 ${!isActive && !setIsOpen && "group-hover:w-full"}`}
            ></div>
          </div>
        )
      })}
    </div>
  )
}

export default NavLink
