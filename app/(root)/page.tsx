"use client"
import LoadingCard from "@/components/shared/LoadingCard"
import Hero from "@/components/shared/hero/Hero"
import MovieByGenre from "@/components/shared/movieByGenre/MovieByGenre"
import { genres } from "@/lib/constant"
import { getAllMovies, getRatedMovies } from "@/lib/services/movie.service"

import { useEffect, useState } from "react"

const HomePage = () => {
  const [top10Movies, setTop10Movies] = useState(null)
  const [top10RatedMovies, setTop10RatedMovies] = useState(null)

  const fetch10Movies = async () => {
    const data = await getAllMovies()
    setTop10Movies(data.slice(0, 10))
  }
  const fetchRatedMovies = async () => {
    const data = await getRatedMovies()
    setTop10RatedMovies(data.slice(0, 10))
  }
  useEffect(() => {
    const fetchData = async () => {
      Promise.all([fetch10Movies(), fetchRatedMovies()])
    }
    fetchData()
  }, [setTop10Movies, setTop10RatedMovies])
  if (!top10Movies || !top10RatedMovies) {
    return (
      <div className="space-y-10">
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  } else {
    return (
      <div className="flexCol gap-10">
        <Hero
          movies={top10Movies}
          ratedMovies={top10RatedMovies}
          type="movie"
        />
        <div className="flexCol gap-10">
          {genres.map((genre, idx) => (
            <MovieByGenre
              key={genre.id}
              genre={genre}
              idx={idx + 1}
              type="movie"
            />
          ))}
        </div>
      </div>
    )
  }
}

export default HomePage
