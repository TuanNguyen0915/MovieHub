"use client"
import GitHubForm from "@/components/shared/form/GitHubForm"
import SignInForm from "@/components/shared/form/SignInForm"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
const LoginPage = () => {
  const { status } = useSession()
  if (status === "authenticated") {
    redirect("/")
  }

  return (
    <div className="flexCenter h-[80vh] w-full p-4">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flexCol w-full items-center gap-4 md:w-2/3 lg:w-1/2"
      >
        <h1 className="bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-6xl font-extrabold leading-[6rem] text-transparent max-lg:text-4xl max-lg:leading-[4rem]">
          Login
        </h1>
        <GitHubForm />
        <p className="text-center text-2xl font-bold text-primary">or</p>
        <SignInForm />
      </motion.div>
    </div>
  )
}

export default LoginPage
