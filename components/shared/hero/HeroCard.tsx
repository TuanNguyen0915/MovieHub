"use client"
import { IMovie } from "@/lib/types"
import Image from "next/image"
import { PlayCircleIcon } from "lucide-react"
import Link from "next/link"
import { genres } from "@/lib/constant"
import { useState } from "react"
import { getMovieVideo } from "@/lib/services/movie.service"
import { Button } from "@/components/ui/button"

interface IGenre {
  name: string | undefined
  id: number
}
interface ITrailer {
  iso_639_1?: string
  iso_3166_1?: string
  name?: string
  key?: string
  site?: string
  type?: string
  official?: boolean
  id?: string
}
const HeroCard = ({ movie }: { movie: IMovie }) => {
  const [trailer, setTrailer] = useState<ITrailer | null>()
  const [playTrailer, setPlayTrailer] = useState(false)
  const fetchTrailer = async () => {
    const data = await getMovieVideo(movie.id)
    const res = data.find((item: any) => item.type === "Trailer")
    setTrailer(res)
    setPlayTrailer(true)
  }
  const src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`
  const movieName = movie.name || movie.title || movie.original_name
  let genresListName: IGenre[] = []
  movie.genre_ids?.forEach((genre) => {
    const item = genres.find((item) => item.id === genre)
    if (item) genresListName.push(item)
  })

  return (
    <div className="h-[50vh] w-full lg:h-[70vh]">
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
              <div className="mt-20 w-full space-x-4 lg:hidden">
                <Button variant="default" onClick={fetchTrailer}>
                  Play Trailer
                </Button>
                <Button variant="secondary">
                  <Link href={`/movie/${movie.id}`}>More Details</Link>
                </Button>
              </div>
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
            <Button
              variant="custom"
              className="mt-20 p-4 text-xl font-semibold max-lg:hidden"
            >
              <Link href={`/movie/${movie.id}`}>View Details</Link>
            </Button>
          </div>
          {/* PLAY TRAILER */}
          <div className="flexCenter w-full max-lg:hidden">
            <div
              className="flexCenter group w-full gap-4"
              onClick={fetchTrailer}
            >
              <PlayCircleIcon className="group-hover:animate-custom-spin size-28 transition-all duration-1000 group-hover:text-primary group-hover:brightness-150" />
              <h1 className="text-3xl font-bold text-muted-foreground group-hover:animate-pulse group-hover:text-foreground">
                Play trailer
              </h1>
            </div>
          </div>
        </div>
      </div>
      {playTrailer && (
        <div className="flexCenter absolute bottom-0 left-0 top-0 z-50 mx-auto h-full w-full gap-10 bg-black/40 p-8 backdrop-blur-lg">
          <div className="flexCenter h-2/3 w-2/3 flex-col gap-2">
            <div className="flex w-full items-center justify-end">
              <Button variant={"custom"} onClick={() => setPlayTrailer(false)}>
                Close
              </Button>
            </div>
            <iframe
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailer?.key}`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroCard
