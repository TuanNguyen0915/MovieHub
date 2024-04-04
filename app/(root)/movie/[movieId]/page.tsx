import LoadingCard from "@/components/shared/LoadingCard"
import MovieDetails from "@/components/shared/movieDetails/MovieDetails"
import { getMovieById } from "@/lib/services/movie.service"
import { IMovie, IMovieDetails } from "@/lib/types"

interface IParams {
  movieId: string | number
}
const MoviePage = async ({ params }: { params: IParams }) => {
  const movie: IMovieDetails = await getMovieById(params.movieId)

  if (!movie) {
    return (
      <div className="mt-20 w-full">
        <LoadingCard />
      </div>
    )
  } else {
    const times = {
      hours: Math.floor(movie.runtime / 60),
      minutes: movie.runtime % 60,
    }
    return <MovieDetails movie={movie && movie} times={times}/>
  }
}

export default MoviePage
