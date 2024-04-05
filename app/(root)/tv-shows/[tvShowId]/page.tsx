import LoadingCard from "@/components/shared/LoadingCard"
import MovieDetails from "@/components/shared/movieDetails/MovieDetails"
import TvShowDetails from "@/components/shared/tvShowDetails/TvShowDetails"
import { getTvShowById } from "@/lib/services/tvShow.service"
import { IMovieDetails, ITvShowDetails } from "@/lib/types"

interface IParams {
  tvShowId: string
}

const TvShowPage = async ({ params }: { params: IParams }) => {
  const tvShow: ITvShowDetails = await getTvShowById(params.tvShowId)
  if (!tvShow) {
    return (
      <div className="mt-20 w-full">
        <LoadingCard />
      </div>
    )
  } else {
    return <TvShowDetails tvShow={tvShow} />
  }
}

export default TvShowPage
