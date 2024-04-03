"use client"
import { IMovie } from "@/lib/types"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { PlayCircleIcon } from "lucide-react"
import Link from "next/link"
import { genres } from "@/lib/constant"

interface IGenre {
  name: string | undefined
  id: number
}

const HeroCard = ({ movie }: { movie: IMovie }) => {
  const src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`
  const movieName = movie.name || movie.title || movie.original_name
  let genresListName: IGenre[] = []
  movie.genre_ids?.forEach((genre) => {
    const item = genres.find((item) => item.id === genre)
    if (item) genresListName.push(item)
  })
  return (
    <div className="h-[50vh] lg:h-[70vh] w-full">
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={movie.name || movie.original_name || "movie"}
          fill
          className="object-cover object-center opacity-0 transition-all duration-500"
          onLoadingComplete={(image) => {
            image.classList.remove("opacity-0")
          }}
        />
        <div className="absolute z-20 flex h-full w-full justify-between bg-gradient-to-r from-indigo-950/80 via-black/80 to-indigo-950/80 p-8">
          <div className="w-full space-y-8">
            <h1 className="mt-20 w-fit text-4xl font-bold text-primary brightness-150 lg:mt-36 lg:text-6xl">
              {movieName}
            </h1>

            <div className="group w-full text-sm text-muted-foreground lg:text-lg">
              <span>{movie.overview?.slice(0, 200)}</span>
              <br />
              <Link
                href={`/movie/${movie.id}`}
                className="font-semibold tracking-wider text-primary transition-all group-hover:brightness-200"
              >
                ...read more
              </Link>
            </div>
            <div className="flex w-full gap-2 max-lg:hidden">
              <span className="font-bold text-primary">Genres</span>
              <div className="flex gap-2">
                {genresListName.map((genre: IGenre, idx) => (
                  <div key={idx}>
                    <Link href={`/movie/genre/${genre.id}`} className="flex">
                      <span className="transition-all hover:text-primary">
                        {genre.name}{" "}
                      </span>
                      <span
                        className={`${idx === genresListName.length - 1 && "hidden"}`}
                      >
                        ,
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <p className="space-x-2 font-bold text-primary max-lg:hidden">
              Release Date{" "}
              <span className="font-normal italic text-foreground">
                {movie.release_date}
              </span>
            </p>
          </div>
          <div className="flexCenter w-full max-lg:hidden">
            <div className="flexCenter group w-full gap-4">
              <PlayCircleIcon className="group-hover:animate-custom-spin size-28 transition-all duration-1000 group-hover:text-primary group-hover:brightness-150" />
              <h1 className="text-3xl font-bold text-muted-foreground group-hover:animate-pulse group-hover:text-foreground">
                Play trailer
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroCard
