"use client"
import Footer from "@/components/shared/footer/Footer"
import Header from "@/components/shared/header/Header"
import { getAllMovies } from "@/lib/services/movie.service"
import { IMovie } from "@/lib/types"
import { useEffect, useState } from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [movies, setAllMovies] = useState<IMovie[] | null>()
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getAllMovies()
      setAllMovies(data)
    }
    fetchMovies()
  })

  return (
    <main className="flexCol min-h-screen gap-4">
      <Header />
      <section className="w-full flex-1 max-xl:px-4">{children}</section>
      <Footer />
    </main>
  )
}

export default RootLayout
