"use client"
import { signIn } from "next-auth/react"
import { RiGoogleLine } from "react-icons/ri"



const GoogleForm = () => {
  return (
    <div
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
      className="flexCenter w-full cursor-pointer gap-4 rounded-xl border-2 bg-secondary p-4 transition-all hover:border-primary"
    >
      <p>Continue with Google</p>
      <RiGoogleLine className="size-6" />
    </div>
  )
}

export default GoogleForm
