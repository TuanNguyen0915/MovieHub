"use client"
import { IMovie } from "@/lib/types"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"

import TopMovieCard from "./TopMovieCard"

interface IProps {
  movies: IMovie[]
  type: string
}

const TopMoviesSwiper = ({ movies, type }: IProps) => {
  return (
    <Swiper
      navigation
      loop
      modules={[Navigation]}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 40,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1920: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
    >
      {movies.map((movie: IMovie, idx) => (
        <SwiperSlide key={movie.id}>
          <TopMovieCard movie={movie} idx={idx + 1} type={type}/>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TopMoviesSwiper
