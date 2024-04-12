import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "@prisma/client"
import UserButton from "./UserButton"
import Link from "next/link"
import { RiDashboardLine, RiShutDownLine } from "react-icons/ri"
import { signOut } from "next-auth/react"

const PopUser = ({ currentUser }: { currentUser: User | undefined | null }) => {
  return (
    <Popover>
      <PopoverTrigger>
        {currentUser && <UserButton currentUser={currentUser} />}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flexCol w-full gap-4">
          <Link
            href={"/dashboard"}
            className="transition-all hover:text-primary"
          >
            Hi, {currentUser?.email.split("@")[0]}
          </Link>
          <Link
            href={"/pricing"}
            className="text-sm italic text-muted-foreground transition-all hover:text-foreground"
          >
            {" "}
            Current member: {currentUser?.currentPlan}
          </Link>
          <hr />
          <Link
            href={"/dashboard"}
            className="flexBetween my-4 w-full text-end transition-all hover:text-primary"
          >
            <RiDashboardLine size={20} />
            <p>My Dashboard</p>
          </Link>
          <div
            className="flexBetween w-full cursor-pointer transition-all hover:text-primary"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <RiShutDownLine size={20} />
            <p>Logout</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopUser
