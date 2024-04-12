"use client"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOff, Lock, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"

interface IFromInPuts {
  email: string
  password: string
}

const SignInForm = () => {
  const router = useRouter()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  const { register, handleSubmit } = useForm<IFromInPuts>({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const submitForm: SubmitHandler<IFromInPuts> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (res?.error) {
      return toast.error(res.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-full space-y-4">
      <div className="flex w-full gap-4 rounded-xl border-2 border-border px-4 py-2 transition-all hover:border-primary">
        <Mail />
        <input
          type="email"
          {...register("email")}
          className="flex-1 bg-transparent outline-none focus:ring-0"
          autoComplete="off"
          placeholder="Your Email"
        />
      </div>
      <div className="flex w-full gap-4 rounded-xl border-2 border-border px-4 py-2 transition-all hover:border-primary">
        <Lock />
        <input
          type={visiblePassword ? "text" : "password"}
          {...register("password")}
          className="flex-1 bg-transparent outline-none focus:outline-none"
          autoComplete="off"
          placeholder="Your Password"
        />
        {visiblePassword ? (
          <EyeIcon onClick={() => setVisiblePassword(!visiblePassword)} />
        ) : (
          <EyeOff onClick={() => setVisiblePassword(!visiblePassword)} />
        )}
      </div>
      <div className="flexBetween w-full gap-4">
        <div className="flex w-full flex-col gap-2">
          <p>Don&#39;t have an account?</p>{" "}
          <p
            className="cursor-pointer bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent transition-all hover:brightness-200"
            onClick={() => router.push("/auth/signup")}
          >
            Register here
          </p>
        </div>
        <Button variant={"custom"} className="w-full">
          LogIn
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
