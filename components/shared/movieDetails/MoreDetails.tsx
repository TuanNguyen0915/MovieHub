"use client"
import { ICast, IMovieDetails, IVideo } from "@/lib/types"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Pagination } from "swiper/modules"
import "swiper/css/pagination"

import Image from "next/image"
import { useEffect, useState } from "react"
import { getMovieCasts } from "@/lib/services/movie.service"
interface IProps {
  movie: IMovieDetails | undefined
  videos: IVideo[] | undefined
}
const MoreDetails = ({ movie, videos }: IProps) => {
  const [casts, setCasts] = useState<ICast[] | []>()
  useEffect(() => {
    const fetchCasts = async () => {
      const data = await getMovieCasts(movie?.id)
      if (data.length > 10) setCasts(data.slice(0, 10))
      else setCasts(data)
    }
    fetchCasts()
  }, [movie?.id])
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      className="flexCol w-full gap-4"
    >
      <div className="w-full space-y-4">
        <div className="border-l-4 border-primary px-2">
          <h1 className="text-xl font-semibold lg:text-3xl">
            Videos ({videos?.length})
          </h1>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
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
            },
          }}
        >
          {videos?.reverse()?.map((item) => (
            <SwiperSlide key={item.key}>
              <div className="h-[250px] w-[200px]">
                <div className="h-[200px] w-full">
                  <iframe
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${item.key}`}
                    key={item.key}
                    className="h-full w-full"
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {casts && (
        <div className="w-full space-y-4">
          <div className="border-l-4 border-primary px-2">
            <h1 className="text-xl font-semibold lg:text-3xl">
              Casts ({casts?.length})
            </h1>
          </div>
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
              },
            }}
          >
            {casts?.map((cast: ICast) => (
              <SwiperSlide key={cast.id}>
                <div className="flexCol h-[200px] w-[200px] items-center gap-2">
                  <p>{cast.name}</p>
                  <div className="relative h-[150px] w-[150px] rounded-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      fill
                      alt="avatar"
                      className="rounded-full object-cover object-center"
                    />
                  </div>
                  <p>{cast.character}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </motion.div>
  )
}

export default MoreDetails
