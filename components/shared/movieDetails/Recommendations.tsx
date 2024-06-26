"use client"
import { getRecommendedMovies } from "@/lib/services/movie.service"
import { IMovie } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import LoadingCard from "../LoadingCard"
import { motion } from "framer-motion"
import { getRecommendedTvShows } from "@/lib/services/tvShow.service"

interface IProps {
  movieId: number | undefined
  type: string
}

const Recommendations = ({ movieId, type }: IProps) => {
  const [recommendations, setRecommendations] = useState<IMovie[] | []>()
  const [transitioning, setTransition] = useTransition()
  useEffect(() => {
    setTransition(async () => {
      if (type === "tv-shows") {
        const data = await getRecommendedTvShows(movieId)
        setRecommendations(data)
      } else {
        const data = await getRecommendedMovies(movieId)
        setRecommendations(data)
      }
    })
  }, [movieId, type])
  if (transitioning || !recommendations) {
    return (
      <div className="w-full space-y-10">
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <h1 className="mt-10 border-l-8 border-primary px-2 text-2xl lg:mt-16 lg:text-4xl">
          Recommendations
        </h1>

        <div className="mt-5 grid w-full grid-cols-2 gap-4 p-2  md:grid-cols-3 lg:mt-10 lg:grid-cols-5 place-items-center">
          {recommendations.slice(0, 10).map((movie: IMovie) => (
            <Link
              href={`/${type}/${movie.id}`}
              key={movie.id}
              className="flexCol group h-[200px] w-[150px] gap-2 lg:h-[250px] lg:w-[200px]"
            >
              <div className="relative h-[150px] w-full overflow-hidden rounded-xl lg:h-[200px]">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`}
                  fill
                  alt="movie image"
                  className="transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <p className="text-muted-foreground transition-all group-hover:text-foreground">
                {movie.title || movie.original_name}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>
    )
  }
}

export default Recommendations
