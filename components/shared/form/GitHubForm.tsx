"use client"
import { signIn } from "next-auth/react"

import { RiGithubLine } from "react-icons/ri"

const GitHubForm = () => {
  return (
    <div
      onClick={() =>
        signIn("github", {
          callbackUrl: "/",
        })
      }
      className="flexCenter w-full cursor-pointer gap-4 rounded-xl border-2 bg-secondary p-4 transition-all hover:border-primary"
    >
      <p>Continue with GitHub</p>
      <RiGithubLine className="size-6" />
    </div>
  )
}

export default GitHubForm
