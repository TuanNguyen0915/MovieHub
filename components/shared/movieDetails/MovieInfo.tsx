import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IMovieDetails, IVideo } from "@/lib/types"
import { useState } from "react"

interface IProps {
  movie: IMovieDetails | undefined
  times: {
    hours: number
    minutes: number
  }
  trailer: IVideo | undefined
}

const MovieInfo = ({ movie, times, trailer }: IProps) => {
  const [openTrailer, setOpenTrailer] = useState(false)
  return (
    <div className="flexCol z-20 gap-10 p-2">
      <h1 className="cursor-pointer text-3xl font-extrabold tracking-wider text-primary transition-all hover:brightness-125 lg:text-5xl">
        {movie?.title}
      </h1>
      <div className="flex w-full items-center gap-4">
        <span>{movie?.release_date}</span> |{" "}
        <span>
          {times.hours}h {times.minutes}m
        </span>{" "}
        |{" "}
        <Link
          href={`/movie/genre/${movie?.genres[0].name}`}
          className="hover:text-primary"
        >
          {movie?.genres[0].name}
        </Link>
      </div>
      <div className="flexBetween w-full gap-10">
        <Button
          className="w-1/2 lg:py-6 lg:text-xl"
          onClick={() => {
            setOpenTrailer(true)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <>
            <Play className="mr-4" />
            Play Trailer
          </>
        </Button>
        <Button className="w-1/2 lg:py-6 lg:text-xl" variant="secondary">
          <>
            <Download className="mr-4" />
            Download
          </>
        </Button>
      </div>
      <p className="max-lg:text-sm">{movie?.overview}</p>
      {movie?.vote_average && (
        <div className="flexBetween w-full gap-4">
          <Progress value={movie?.vote_average * 10} className="flex-1" />
          <div>
            <span className="font-bold text-primary">
              {movie?.vote_average.toFixed(2)}
            </span>{" "}
            /{" "}
            <span className="text-muted-foreground">
              {movie?.vote_count} (votes)
            </span>{" "}
          </div>
        </div>
      )}
      <div className="flex w-full justify-between">
        <div className="w-full p-2">
          <p className="text-center font-semibold lg:text-lg">Genres</p>
          <div className="mt-4 flex w-full flex-wrap gap-2 lg:gap-4">
            {movie?.genres?.map((item) => (
              <Link
                key={item.id}
                href={`/movie/genre/${item.name}`}
                className=" text-muted-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full border-x border-border p-2">
          <p className="text-center font-semibold lg:text-lg">
            This movie is ...
          </p>
          <p className="mt-4 flex w-full flex-wrap gap-2 text-muted-foreground lg:gap-4">
            {movie?.tagline}
          </p>
        </div>
        <div className="w-full p-2">
          <p className="text-center font-semibold lg:text-lg">Languages</p>
          <div className="mt-4 flex w-full flex-wrap gap-2 lg:gap-4">
            {movie?.spoken_languages?.map((item, idx) => (
              <span
                key={idx + 1}
                className="cursor-pointer text-muted-foreground hover:text-primary"
              >
                {item.english_name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {openTrailer && (
        <div className="flexCenter absolute left-0 right-0 top-0 z-50 h-screen w-screen bg-black/40 backdrop-blur-md">
          <div className=" h-1/2 w-3/4 space-y-2 lg:w-1/2">
            <div className="flex w-full items-center justify-end">
              <Button onClick={() => setOpenTrailer(false)} variant="custom">
                Close
              </Button>
            </div>
            <iframe
              width="100%"
              height="90%"
              src={`https://www.youtube.com/embed/${trailer?.key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieInfo
