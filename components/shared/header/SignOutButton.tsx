import { signOut } from 'next-auth/react'


const SignOutButton = () => {
  return (
    <div
    onClick={() => signOut()}
    className="flexCenter cursor-pointer rounded-xl border border-primary bg-primary px-4 py-2 transition-all hover:bg-transparent"
  >
    SignOut
  </div>
  )
}

export default SignOutButton