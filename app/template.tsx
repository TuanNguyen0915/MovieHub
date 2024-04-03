"use client"

import useScrollbar from "@/hooks/useScrollbar"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
}

const Template = ({ children }: { children: React.ReactNode }) => {
  const completion = useScrollbar()
  return (
    <>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "linear", delay: 0.2, duration: 0.4 }}
      >
        {children}
      </motion.main>
      {/* COMPLETION BAR */}
      <span
        style={{ transform: `translateY(${completion - 100}%)` }}
        className="fixed bottom-0 right-0 top-0 z-20 w-1 bg-primary transition-all duration-700"
      ></span>
    </>
  )
}

export default Template
