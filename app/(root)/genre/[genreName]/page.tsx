"use client"
import LoadingCard from "@/components/shared/LoadingCard"
import { genres } from "@/lib/constant"
import { getMoviesByGenre } from "@/lib/services/movie.service"
import { useEffect, useState, useTransition } from "react"

interface IParams {
  genreName: string
}
import { motion } from "framer-motion"
import { IMovie } from "@/lib/types"
import MovieCard from "@/components/shared/MovieCard"
import Link from "next/link"
import Search from "@/components/shared/header/Search"

const GenrePage = ({ params }: { params: IParams }) => {
  const { genreName } = params
  const [movies, setMovies] = useState<IMovie[] | null>(null)
  const [transition, setTransition] = useTransition()

  useEffect(() => {
    setTransition(async () => {
      const genreId = genres.find((genre) => genre.name === genreName)?.id
      if (!genreId) return
      const fetchMovies = async () => {
        const data = await getMoviesByGenre(genreId)
        setMovies(data)
      }
      fetchMovies()
    })
  }, [genreName])

  if (transition) {
    return (
      <div className="w-full space-y-10">
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  } else {
    return (
      <motion.div
        className="mt-10 w-full space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <Search movies={movies} />
        <h1 className="group text-3xl text-primary transition-all hover:text-foreground">
          {genreName}{" "}
          <span className="text-muted-foreground transition-all group-hover:text-primary">
            Movies
          </span>
        </h1>
        {movies && (
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {movies.map((movie: IMovie) => (
              <Link
                href={`/movie/${movie.id}`}
                className="group w-full  space-y-4"
                key={movie.id}
              >
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                  <MovieCard movie={movie} />
                </div>
                <p className="cursor-pointer text-center text-muted-foreground transition-all group-hover:text-foreground">
                  {movie.name || movie.title || movie.original_name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    )
  }
}

export default GenrePage
