"use client"

import { useEffect, useState } from "react"

const useScrollbar = () => {
  const [complete, setComplete] = useState(0)
  useEffect(() => {
    const updatedScrollbar = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setComplete(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }
    window.addEventListener("scroll", updatedScrollbar)
    return () => window.removeEventListener("scroll", updatedScrollbar)
  })
  return complete
}

export default useScrollbar
