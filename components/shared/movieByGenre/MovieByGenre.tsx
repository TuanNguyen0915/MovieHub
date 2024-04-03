"use client"
import Link from "next/link"
import React, { useEffect, useState, useTransition } from "react"
import { motion } from "framer-motion"
import { getMoviesByGenre } from "@/lib/services/movie.service"
import LoadingCard from "../LoadingCard"
import MovieCard from "../MovieCard"
import { IMovie } from "@/lib/types"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
interface IProps {
  genre: {
    id: number
    name: string
  }
  idx: number
}

const MovieByGenre = ({ genre, idx }: IProps) => {
  const [movies, setMovies] = useState<IMovie[] | null>(null)
  const [transition, setTransition] = useTransition()
  useEffect(() => {
    setTransition(async () => {
      const data = await getMoviesByGenre(genre.id)
      setMovies(data)
    })
  }, [genre.id])
  if (transition) {
    return (
      <div className="flexCenter w-full">
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  } else {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`item-${idx}`}>
          <AccordionTrigger className="w-full">
            <div className="group flex w-full cursor-pointer items-center gap-4">
              <h1 className="text-xl lg:text-3xl">
                <span className="text-primary transition-all group-hover:brightness-125">
                  {genre.name}
                </span>{" "}
                Movies
              </h1>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full">
              <Swiper
                loop
                slidesPerView={2}
                spaceBetween={50}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {movies?.slice(0, 10).map((movie: IMovie) => {
                  const title = movie.title || movie.original_name
                  return (
                    <SwiperSlide key={movie.id}>
                      <div className="h-[250px] w-[150px] md:w-[200px]">
                        <div
                          className="flexCenter relative h-[200px] w-full"
                          key={movie.id}
                        >
                          <MovieCard movie={movie} />
                        </div>
                        {title && (
                          <p className="text-muted-foreground transition-all">
                            {title.length > 20
                              ? title.slice(0, 20) + "..."
                              : title}
                          </p>
                        )}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              <Link
                href={`/genre/${genre.name}`}
                className="mt-4 tracking-wider text-muted-foreground transition-all hover:text-primary lg:mt-10 lg:text-xl"
              >
                See more ...
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
}

export default MovieByGenre
