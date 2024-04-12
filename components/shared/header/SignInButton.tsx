import Link from "next/link"

const SignInButton = () => {
  return (
    <Link
      href={"/auth/signin"}
      className="flexCenter rounded-xl border border-primary bg-primary px-4 py-2 transition-all hover:bg-transparent"
    >
      Log In
    </Link>
  )
}

export default SignInButton
