"use client"
import Logo from "./Logo"
import NavLink from "./NavLink"
import MobileNav from "./MobileNav"
import Search from "./SearchHeader"
import { User } from "@prisma/client"
import UserButton from "./UserButton"
import PopUser from "./PopUser"
import SignInButton from "./SignInButton"
import { useUserStore } from "@/lib/stores/user.store"

const Header = () => {
  const {currentUser} = useUserStore()
  return (
    <header className="flexBetween sticky left-0 right-0 top-0 z-50 bg-black/40 py-6 backdrop-blur-md max-xl:px-4">
      <div className="flex items-center gap-10">
        <Logo />
        <NavLink style="hidden lg:flexBetween gap-4" />
      </div>
      <div className="lg:flexBetween relative hidden gap-4">
        <Search />

        {currentUser ? <PopUser currentUser={currentUser} /> : <SignInButton />}
      </div>
      <div className="flex lg:hidden">
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
