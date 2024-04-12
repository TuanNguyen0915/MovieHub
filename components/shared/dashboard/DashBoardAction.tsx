import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { removeMovieFromPlaylist, removeTvShowFromPlaylist } from "@/lib/action/user.action"
import { useUserStore } from "@/lib/stores/user.store"
import { Film, MoreHorizontal, XCircle } from "lucide-react"
import Link from "next/link"
import React from "react"

interface IProps {
  type: string
  movieId: number | undefined
}
const DashBoardAction = ({ type, movieId }: IProps) => {
  
  const { currentUser, setCurrentUser } = useUserStore()
  const handleOnClick = async () => {
    if (currentUser && type === "movie") {
      const updatedUser = await removeMovieFromPlaylist(
        currentUser.email,
        movieId!,
      )
      if (updatedUser) setCurrentUser(updatedUser)
    }
    if (currentUser && type === "tv-shows") {
      const updatedUser = await removeTvShowFromPlaylist(
        currentUser.email,
        movieId!,
      )
      if (updatedUser) setCurrentUser(updatedUser)
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent className="mt-4 w-48 border-none">
        <div className="flexCol w-full justify-end gap-4">
          <Link
            href={`/${type}/${movieId}`}
            className="flexBetween cursor-pointer transition-all hover:text-primary"
          >
            <Film /> <p>Views</p>
          </Link>
          <div
            className="flexBetween cursor-pointer transition-all hover:text-primary"
            onClick={handleOnClick}
          >
            <XCircle /> <p>Delete</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DashBoardAction
