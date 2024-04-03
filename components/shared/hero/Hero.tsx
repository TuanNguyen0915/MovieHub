"use client"
import { IMovie } from "@/lib/types"
import { motion } from "framer-motion"

import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import "swiper/css/pagination"
import TopMoviesSwiper from "./TopMoviesSwiper"
import HeroCard from "./HeroCard"

interface IProps {
  movies: IMovie[]
  ratedMovies: IMovie[]
}

const Hero = ({ movies, ratedMovies }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          loop
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {movies.map((movie: IMovie) => (
            <SwiperSlide key={movie.id}>
              <HeroCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full space-y-4">
        <div className="w-full cursor-pointer">
          <h1 className="text-3xl tracking-widest">
            Top <span className="text-primary">10</span> Movies
          </h1>
        </div>
        <TopMoviesSwiper movies={movies} />
      </div>
      <div className="w-full space-y-4">
        <div className="w-full cursor-pointer">
          <h1 className="text-3xl tracking-widest">
            Top <span className="text-primary">Rated</span> Movies
          </h1>
        </div>
        <TopMoviesSwiper movies={ratedMovies} />
      </div>
    </motion.div>
  )
}

export default Hero
