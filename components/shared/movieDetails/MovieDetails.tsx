"use client"
import { getMovieCasts, getMovieVideo } from "@/lib/services/movie.service"
import { ICast, IMovieDetails, IVideo } from "@/lib/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import MovieInfo from "./MovieInfo"
import { ArrowRight } from "lucide-react"
import MoreDetails from "./MoreDetails"
import Recommendations from "./Recommendations"
import Reviews from "./Reviews"

interface IProps {
  movie: IMovieDetails | undefined
  times: {
    hours: number
    minutes: number
  }
}

const MovieDetails = ({ movie, times }: IProps) => {
  const src = `https://image.tmdb.org/t/p/original/${movie?.poster_path || movie?.backdrop_path}`
  const src2 = `https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`
  
  const [videos, setVideos] = useState<IVideo[] | []>()
  const [trailer, setTrailer] = useState<IVideo | undefined>()
  const [isMoreOpen, setMoreOpen] = useState(false)
  const [casts, setCasts] = useState<ICast[] | []>()
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getMovieVideo(movie?.id)
      setVideos(data)
      const trailer = data.find(
        (item: any) => item.type === "Trailer" && item.site === "YouTube",
      )
      setTrailer(trailer)
    }
    const fetchCast = async () => {
      const data = await getMovieCasts(movie?.id)
      setCasts(data)
    }
    Promise.all([fetchVideos(), fetchCast()])
  }, [movie?.id])
  return (
    <section className="mt-5 min-h-screen w-full space-y-5">
      <div className="flexBetween max-xl:flexCol relative h-full w-full gap-10">
        <div className="relative h-[60vh] w-full max-xl:hidden z-20">
          <Image
            src={src}
            fill
            className="relative rounded-lg object-contain opacity-0 transition-all duration-1000"
            onLoadingComplete={(image) => {
              image.classList.remove("opacity-0")
            }}
            alt="movie"
          />
        </div>
        <div className="flexCenter w-1/2 xl:hidden z-20">
          <Image
            src={src}
            width={2000}
            height={2000}
            alt="movie"
            className="rounded-lg opacity-0 transition-all duration-1000"
            onLoadingComplete={(image) => {
              image.classList.remove("opacity-0")
            }}
          />
        </div>
        <MovieInfo movie={movie} times={times} trailer={trailer} />
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="relative h-full w-full">
            <Image
            fill
            src={src2}
            alt="movie"
            className="opacity-10"
            />
          </div>
        </div>
      </div>
      <div className="flexCenter mt-10 w-full">
        <div
          className="flexCenter group gap-2"
          onClick={() => setMoreOpen(!isMoreOpen)}
        >
          <p className="cursor-pointer text-xl font-bold transition-all group-hover:text-primary lg:text-3xl">
            More Details
          </p>
          <ArrowRight
            className={`cursor-pointer group-hover:text-primary ${isMoreOpen ? "rotate-90" : ""} transition-all`}
          />
        </div>
      </div>
      {isMoreOpen && (
        <MoreDetails movie={movie} videos={videos} casts={casts} />
      )}
      <Reviews movieId={movie?.id && movie?.id} />
      <Recommendations movieId={movie?.id && movie?.id} type="movie" />
    </section>
  )
}

export default MovieDetails
