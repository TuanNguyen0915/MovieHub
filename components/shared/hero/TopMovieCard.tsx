import { IMovie } from "@/lib/types"
import MovieCard from "../MovieCard"

interface IProps {
  movie: IMovie
  idx?: number
  type: string
  textStoke?: boolean
}
const TopMovieCard = ({ movie, idx, type, textStoke }: IProps) => {
  return (
    <div className="flexCenter w-full">
      <div className="relative h-[200px] w-[300px]">
        <div className="flexCenter absolute h-full">
          {/* <h1 className="text-[200px] font-extrabold text-muted-foreground opacity-20">
            {idx}
          </h1> */}
          {textStoke && (
            <h1 className="text-stroke text-[200px] font-extrabold">{idx}</h1>
          )}
        </div>
        <div className="group absolute right-0 z-10 h-full w-[200px] rounded-xl transition-all duration-300 hover:w-full">
          <div className="relative h-[200px] w-full overflow-hidden rounded-xl border-l-2 border-transparent transition-all duration-300 group-hover:w-full group-hover:border-primary">
            <MovieCard movie={movie} topMovies type={type} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopMovieCard
