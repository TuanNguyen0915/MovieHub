"use client"

import { getSeasonEpisodes } from "@/lib/services/tvShow.service"
import { IEpisode, ITvShowDetails } from "@/lib/types"
import { useEffect, useState, useTransition } from "react"
import LoadingCard from "../LoadingCard"
import Image from "next/image"
import { motion } from "framer-motion"
interface IProps {
  tvShow: ITvShowDetails | undefined
  seasonNumber: number | string | undefined
}

const SeasonEpisodes = ({ tvShow, seasonNumber }: IProps) => {
  const [allEpisodes, setAllEpisodes] = useState<IEpisode[] | []>()
  const [transitioning, setTransition] = useTransition()
  useEffect(() => {
    setTransition(async () => {
      const data = await getSeasonEpisodes(tvShow?.id, seasonNumber)
      setAllEpisodes(data)
    })
  }, [tvShow?.id, seasonNumber])

  if (transitioning || !allEpisodes) {
    return (
      <div className="mt-20 w-full">
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  } else {
    const src = `https://image.tmdb.org/t/p/original/${tvShow?.poster_path || tvShow?.backdrop_path}`
    return (
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="space-y-4"
      >
        <h1 className="mt-10 border-l-8 border-primary px-2 text-2xl lg:mt-16 lg:text-4xl">
          Episodes ({allEpisodes?.length})
        </h1>
        <div className="mt-5 grid w-full grid-cols-2 place-items-center gap-4  p-2 md:grid-cols-3 lg:mt-10 lg:grid-cols-5">
          {allEpisodes?.map((episode) => {
            const runtime = episode.runtime ? episode.runtime : 0
            return (
              <div
                key={episode.id}
                className="flexCol group h-[200px] w-[150px] gap-2 lg:h-[250px] lg:w-[200px]"
              >
                <div className="relative h-[150px] w-full overflow-hidden rounded-xl lg:h-[200px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${episode.still_path || tvShow?.backdrop_path || tvShow?.poster_path} `}
                    fill
                    alt="movie image"
                    className="opacity-0 transition-all duration-500 group-hover:scale-110"
                    onLoadingComplete={(image) => {
                      image.classList.remove("opacity-0")
                    }}
                  />
                </div>
                <div className="w-full">
                  <p className="text-muted-foreground transition-all group-hover:text-foreground">
                    Ep{episode.episode_number} &#8212; {episode.name}
                  </p>
                  <p className="text-sm italic text-muted-foreground">
                    {runtime} mins
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>
    )
  }
}

export default SeasonEpisodes
