"use client"

import { IMovie } from "@/lib/types"
import { Button } from "../ui/button"
import { useUserStore } from "@/lib/stores/user.store"
import {
  addMovieToPlaylist,
  addTvShowToPlaylist,
} from "@/lib/action/user.action"

interface IProps {
  type: string
  movieId: number | undefined
  movieImg: string | undefined
  movieName: string | undefined
}

const AddToPlaylistBtn = ({ type, movieId, movieImg, movieName }: IProps) => {
  const { currentUser, setCurrentUser } = useUserStore()
  let isInclude
  if (type === "movie") {
    isInclude = currentUser?.movies?.find((item: IMovie) => item.id === movieId)
  } else if (type === "tv-shows") {
    isInclude = currentUser?.tvShows?.find(
      (item: IMovie) => item.id === movieId,
    )
  }

  const handleAddMovie = async (e: any) => {
    e.preventDefault()
    if (currentUser && type === "movie") {
      const updatedUser = await addMovieToPlaylist(
        currentUser.email,
        movieId!,
        movieName!,
        movieImg!,
      )
      if (updatedUser) setCurrentUser(updatedUser)
    }
    if (currentUser && type === "tv-shows") {
      const updatedUser = await addTvShowToPlaylist(
        currentUser.email,
        movieId!,
        movieName!,
        movieImg!,
      )
      if (updatedUser) setCurrentUser(updatedUser)
    }
  }
  return (
    <Button
      variant={"outline"}
      className={`${isInclude ? "text-sm" : "text-lg"} w-44 border-primary bg-transparent p-4 font-semibold backdrop-blur-lg`}
      onClick={handleAddMovie}
    >
      {isInclude ? "Remove from playlist" : "Add to playlist"}
    </Button>
  )
}

export default AddToPlaylistBtn
