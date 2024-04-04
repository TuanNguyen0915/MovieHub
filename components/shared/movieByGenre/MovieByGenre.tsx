"use client"
import Link from "next/link"
import React, { useEffect, useState, useTransition } from "react"
import { getMoviesByGenre } from "@/lib/services/movie.service"
import LoadingCard from "../LoadingCard"
import { IMovie } from "@/lib/types"
import "swiper/css"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SwiperCard from "../SwiperCard"
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
              <SwiperCard movies={movies} />
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
