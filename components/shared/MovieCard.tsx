"use client"
import { IMovie } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const MovieCard = ({
  movie,
  topMovies,
  type,
}: {
  movie: IMovie
  topMovies?: boolean
  type: string
}) => {
  const src = `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`
  return (
    <Link href={`/${type}/${movie.id}`}>
      <Image
        src={src}
        alt={movie.name || movie.original_name || "movie"}
        fill
        className="rounded-xl object-cover object-center opacity-0 transition-all duration-300 group-hover:scale-110"
        onLoadingComplete={(image) => {
          image.classList.remove("opacity-0")
        }}
      />
      {topMovies && (
        <div className="flexCenter absolute h-full w-full scale-0 rounded-xl bg-black/40 p-2 backdrop-blur-sm transition-all group-hover:scale-100">
          <p className="text-base font-bold">
            {movie.title || movie.original_name}
          </p>
        </div>
      )}
    </Link>
  )
}

export default MovieCard
