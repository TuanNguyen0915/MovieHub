import LoadingCard from "@/components/shared/LoadingCard"
import SeasonDetails from "@/components/shared/tvShowDetails/SeasonDetails"
import { getTvShowById } from "@/lib/services/tvShow.service"

interface IProps {
  tvShowId: string
  seasonId: string
}

const SeasonPage = async ({ params }: { params: IProps }) => {
  const { tvShowId, seasonId } = params
  const tvShow = await getTvShowById(tvShowId)
  const selectedSeason = tvShow.seasons.find(
    (season: any) => season.id === Number(seasonId),
  )
  if (!selectedSeason) {
    return (
      <div className="mt-20 w-full">
        <LoadingCard />
      </div>
    )
  }
  return <SeasonDetails tvShow={tvShow} season={selectedSeason} />
}

export default SeasonPage
