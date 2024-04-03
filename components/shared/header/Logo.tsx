import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="group cursor-pointer space-x-2  text-3xl tracking-wider transition-all duration-500 hover:text-primary">
        Movie
        <span className="text-primary transition-all duration-500 group-hover:text-foreground">
          Hub
        </span>
      </h1>
    </Link>
  )
}

export default Logo
