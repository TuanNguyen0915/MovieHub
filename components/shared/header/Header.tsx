import { Button } from "@/components/ui/button"
import Logo from "./Logo"
import NavLink from "./NavLink"

import MobileNav from "./MobileNav"
import Search from "./SearchHeader"

const Header = () => {
  return (
    <header className="flexBetween sticky left-0 right-0 top-0 z-20 bg-black/40 py-6 backdrop-blur-md max-xl:px-4">
      <div className="flex items-center gap-10">
        <Logo />
        <NavLink style="hidden lg:flexBetween gap-4" />
      </div>
      <div className="lg:flexBetween relative hidden gap-4">
        <Search styles="flexCenter hover:flexBetween group h-12 w-12  rounded-full border border-muted-foreground p-2 transition-all duration-700 hover:w-[16rem] hover:gap-2 hover:border-foreground" />
        <Button variant={"custom"}>Log In</Button>
      </div>
      <div className="flex lg:hidden">
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
