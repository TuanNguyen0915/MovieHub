"use client"

import LoadingCard from "@/components/shared/LoadingCard"
import Hero from "@/components/shared/hero/Hero"
import MovieByGenre from "@/components/shared/movieByGenre/MovieByGenre"
import { genresTvShow } from "@/lib/constant"
import { getAllTvShows, getRateTvShows } from "@/lib/services/tvShow.service"

import { IMovie } from "@/lib/types"
import { useEffect, useState } from "react"

const TvShowsPage = () => {
  const [top10TvShows, setTop10TvShows] = useState<IMovie[]>([])
  const [topRatedTvShows, setTop10RatedMovies] = useState<IMovie[]>([])
  const fetch10TvShows = async () => {
    const data = await getAllTvShows()
    setTop10TvShows(data.slice(0, 10))
  }
  const fetchRatedMovies = async () => {
    const data = await getRateTvShows()
    setTop10RatedMovies(data.slice(0, 10))
  }
  useEffect(() => {
    Promise.all([fetch10TvShows(), fetchRatedMovies()])
  }, [setTop10TvShows])

  if (!top10TvShows || !topRatedTvShows) {
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
          movies={top10TvShows}
          ratedMovies={topRatedTvShows}
          type="tv-shows"
        />
        <div className="flexCol gap-10">
          {genresTvShow.map((genre, idx) => (
            <MovieByGenre
              key={genre.id}
              genre={genre}
              idx={idx + 1}
              type="tv-shows"
            />
          ))}
        </div>
      </div>
    )
  }
}


export default TvShowsPage
