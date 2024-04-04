"use client"
import { getMovieReviews } from "@/lib/services/movie.service"
import { useEffect, useState, useTransition } from "react"
import LoadingCard from "../LoadingCard"
import { motion } from "framer-motion"
import { IReview } from "@/lib/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import Image from "next/image"
import { User2 } from "lucide-react"
import Link from "next/link"

const Reviews = ({ movieId }: { movieId: number | undefined }) => {
  const [reviews, setReviews] = useState<IReview[] | []>([])
  const [transitioning, setTransition] = useTransition()
  useEffect(() => {
    setTransition(async () => {
      const data = await getMovieReviews(movieId)
      setReviews(data)
    })
  }, [movieId])

  if (transitioning || !reviews) {
    return (
      <div className="w-full space-y-10">
        <LoadingCard />
        <LoadingCard />
      </div>
    )
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <h1 className="mt-10 border-l-8 border-primary px-2 text-2xl lg:mt-16 lg:text-4xl">
          Reviews ({reviews.length})
        </h1>
        <div className="mt-10 w-full">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1366: {
                slidesPerView: 4,
              },
              1920: {
                slidesPerView: 6,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="flexBetween h-[300px] w-[270px] flex-col ">
                  <Link
                    href={review.url}
                    target="_blank"
                    className="flexCol h-[250px] w-full gap-2 rounded-lg border border-border p-2 transition-all hover:border-foreground"
                  >
                    <div className="flex w-full items-center gap-4">
                      <div className="relative h-[40px] w-[40px] rounded-full">
                        {review.author_details.avatar_path ? (
                          <Image
                            fill
                            alt="avatar"
                            src={`https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`}
                            className="rounded-full object-cover object-center"
                          />
                        ) : (
                          <User2 className="h-[40px] w-[40px]" />
                        )}
                      </div>

                      <p className="font-semibold">
                        {review.author || review.author_details.username}
                      </p>
                    </div>
                    <p className="flex-1 text-sm text-muted-foreground">
                      {review.content.length > 150
                        ? review.content.slice(0, 150) + "..."
                        : review.content}
                    </p>
                    <p className="text-right text-sm italic text-muted-foreground">
                      {new Date(review.updated_at).toLocaleDateString() ||
                        new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    )
  }
}

export default Reviews
