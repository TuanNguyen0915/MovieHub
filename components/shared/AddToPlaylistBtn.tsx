"use client"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"

const AddToPlaylistBtn = () => {
  return (
    <Button
      variant={"outline"}
      className="w-44 p-4 bg-transparent text-lg font-semibold backdrop-blur-lg border-primary"
    >
      Add to playlist
    </Button>
  )
}

export default AddToPlaylistBtn
