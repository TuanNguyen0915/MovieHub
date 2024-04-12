"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import MovieCard from "./MovieCard"
import { IMovie } from "@/lib/types"
import "swiper/css"
interface IProps {
  movies: IMovie[] | null
  type: string
}
const SwiperCard = ({ movies, type }: IProps) => {
  return (
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
        1920: {
          slidesPerView: 6,
        }
      }}
    >
      {movies?.slice(0, 10).map((movie: IMovie) => {
        const title = movie.title || movie.original_name
        return (
          <SwiperSlide key={movie.id}>
            <div className="h-[250px] w-[150px] md:w-[200px] group">
              <div
                className="flexCenter relative h-[200px] w-full overflow-hidden border-l-4 border-black hover:border-primary transition-all rounded-xl"
                key={movie.id}
              >
                <MovieCard movie={movie} type={type} />
              </div>
              {title && (
                <p className="text-muted-foreground transition-all">
                  {title.length > 20 ? title.slice(0, 20) + "..." : title}
                </p>
              )}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default SwiperCard
