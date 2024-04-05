"use client"
import { ISeason, ITvShowDetails, IVideo } from "@/lib/types"
import Image from "next/image"
import TvShowInfo from "./TvShowInfo"
import { useEffect, useState } from "react"
import { getTvShowVideo } from "@/lib/services/tvShow.service"
import SeasonEpisodes from "./SeasonEpisodes"
interface IProps {
  tvShow: ITvShowDetails | undefined
  season: ISeason | undefined
}
const SeasonDetails = ({ tvShow, season }: IProps) => {
  const [trailer, setTrailer] = useState<IVideo | undefined>()
  const src = `https://image.tmdb.org/t/p/original/${season?.poster_path || tvShow?.backdrop_path}`
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getTvShowVideo(tvShow?.id)
      const trailer = data.find(
        (item: any) => item.type === "Trailer" && item.site === "YouTube",
      )
      setTrailer(trailer)
    }

    Promise.all([fetchVideos()])
  }, [tvShow?.id])

  return (
    <section className="mt-5 min-h-screen w-full space-y-5">
      <div className="flexBetween max-xl:flexCol h-full w-full gap-10">
        <div className="relative h-[60vh] w-full max-xl:hidden">
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
        <div className="flexCenter w-1/2 xl:hidden">
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
        <TvShowInfo tvShow={tvShow} season={season} trailer={trailer} />
      </div>
      <SeasonEpisodes
        tvShow={tvShow}
        seasonNumber={season?.season_number}
      />
    </section>
  )
}

export default SeasonDetails
