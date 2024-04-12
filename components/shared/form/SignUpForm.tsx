"use client"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOff, Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import z from "zod"
import toast from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNewUser } from "@/lib/services/user.service"

const FormSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type InputType = z.infer<typeof FormSchema>
const SignUpForm = () => {
  const router = useRouter()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [visibleVPassword, setVisibleVPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })
  const submitForm: SubmitHandler<InputType> = async (data) => {
    const newUser = await createNewUser(data)
    if (!newUser) {
      toast.error("Sign Up Failed", {
        style: {
          background: "#333",
          color: "#fff",
        },
      })
    } else {
      toast.success("Sign Up Successful", {
        style: {
          background: "#333",
          color: "#fff",
        },
      })
      router.push("/auth/signin")
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-full space-y-8">
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
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
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
          <EyeIcon
            onClick={() => setVisiblePassword(false)}
            className="cursor-pointer"
          />
        ) : (
          <EyeOff
            onClick={() => setVisiblePassword(true)}
            className="cursor-pointer"
          />
        )}
      </div>
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <div className="flex w-full gap-4 rounded-xl border-2 border-border px-4 py-2 transition-all hover:border-primary">
        <Lock />
        <input
          type={visibleVPassword ? "text" : "password"}
          {...register("confirmPassword")}
          className="flex-1 bg-transparent outline-none focus:outline-none"
          autoComplete="off"
          placeholder="Confirm Your Password"
        />
        {visibleVPassword ? (
          <EyeIcon onClick={() => setVisibleVPassword(false)} />
        ) : (
          <EyeOff onClick={() => setVisibleVPassword(true)} />
        )}
      </div>
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
      )}
      <div className="flexBetween w-full gap-4">
        <div className="flex w-full flex-col gap-2">
          <p>Already have an account?</p>{" "}
          <p
            className="cursor-pointer bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent transition-all hover:brightness-200"
            onClick={() => router.push("/auth/signin")}
          >
            Login here
          </p>
        </div>
        <Button variant={"custom"} className="w-full">
          Register
        </Button>
      </div>
    </form>
  )
}

export default SignUpForm
