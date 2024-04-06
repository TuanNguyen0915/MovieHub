"use client"
import { icons } from "@/lib/constant"
import Link from "next/link"
import { IconType } from "react-icons/lib"
import { motion } from "framer-motion"
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 2 }}
      className="flexCol w-full items-center space-y-8 rounded-t-xl border-t-4 border-border py-4"
    >
      <p
        className="cursor-pointer text-xl font-semibold transition-all hover:text-primary"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back To Top
      </p>
      <div className="flexCenter w-full gap-4 max-lg:flex-col">
        <div className="flex w-full items-center justify-center gap-4 lg:justify-end">
          {icons.map((icon, idx) => {
            const Icon: IconType = icon.icon
            return (
              <Link key={idx} href={icon.path} target="_blank">
                <Icon className="size-6 transition-all hover:text-primary hover:brightness-125 md:size-10" />
              </Link>
            )
          })}
        </div>
        <Link
          href="/contact"
          className="w-full text-muted-foreground transition-all hover:underline hover:brightness-125 max-lg:text-center"
        >
          <p>Copyright &copy; Tuan Nguyen. All rights reserved</p>
        </Link>
      </div>
    </motion.footer>
  )
}

export default Footer
