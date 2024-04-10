"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ISeason, ITvShowDetails, IVideo } from "@/lib/types"
import { Download, Play } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import Seasons from "./Seasons"

interface IProps {
  tvShow: ITvShowDetails | undefined
  trailer?: IVideo | undefined
  season?: ISeason
}

const TvShowInfo = ({ tvShow, trailer, season }: IProps) => {
  const [openTrailer, setOpenTrailer] = useState(false)
  return (
    <div className="flexCol gap-10 p-2 z-20">
      <Link href={`/tv-shows/${tvShow?.id}`}>
        <h1 className="cursor-pointer text-3xl font-extrabold tracking-wider text-primary transition-all hover:brightness-125 lg:text-5xl">
          {tvShow?.name || tvShow?.original_name}{" "}
          {season && `- ${season?.name}`}
        </h1>
      </Link>
      <div className="flex w-full items-center gap-4">
        <span>{season ? season?.air_date : tvShow?.first_air_date}</span> |{" "}
        <Seasons tvShow={tvShow} season={season} />|{" "}
        <Link
          href={`/tv-shows/genre/${tvShow?.genres[0].name}`}
          className="hover:text-primary"
        >
          {tvShow?.genres[0].name}
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
      <p className="max-lg:text-sm">
        {season ? season?.overview : tvShow?.overview}
      </p>
      {season ? (
        <div className="flexBetween w-full gap-4">
          <Progress value={season?.vote_average * 10} className="flex-1" />
          <div>
            <span className="font-bold text-primary">
              {tvShow?.vote_average.toFixed(2)}
            </span>{" "}
            / 10
          </div>
        </div>
      ) : (
        tvShow?.vote_average && (
          <div className="flexBetween w-full gap-4">
            <Progress value={tvShow?.vote_average * 10} className="flex-1" />
            <div>
              <span className="font-bold text-primary">
                {tvShow?.vote_average.toFixed(2)}
              </span>{" "}
              /{" "}
              <span className="text-muted-foreground">
                {tvShow?.vote_count} (votes)
              </span>{" "}
            </div>
          </div>
        )
      )}
      <div className="flex w-full justify-between">
        <div className="w-full p-2">
          <p className="text-center font-semibold lg:text-lg">Genres</p>
          <div className="mt-4 flex w-full flex-wrap gap-2 lg:gap-4">
            {tvShow?.genres?.map((item) => (
              <Link
                key={item.id}
                href={`/tv-shows/genre/${item.name}`}
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
            {tvShow?.tagline}
          </p>
        </div>
        <div className="w-full p-2">
          <p className="text-center font-semibold lg:text-lg">Languages</p>
          <div className="mt-4 flex w-full flex-wrap gap-2 lg:gap-4">
            {tvShow?.spoken_languages?.map((item, idx) => (
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

export default TvShowInfo
