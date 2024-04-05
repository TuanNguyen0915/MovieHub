"use client"
import { ISeason, ITvShowDetails } from "@/lib/types"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
interface IProps {
  tvShow: ITvShowDetails | undefined
  season?: ISeason
}

const Seasons = ({ tvShow, season }: IProps) => {
  if (season) {
    let episodes = []
    for (let i = 1; i <= season.episode_count; i++) {
      episodes.push(i)
    }
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-secondary">
              {season.episode_count}{" "}
              {season.episode_count && season.episode_count > 1
                ? "Episodes"
                : "Episode"}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flexCol min-w-[200px] gap-4 p-4">
                {episodes.map((episode) => (
                  <p className="hover:text-primary cursor-pointer" key={episode}>
                    Episode {episode}
                  </p>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  } else {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-secondary">
              {tvShow?.number_of_seasons}{" "}
              {tvShow?.number_of_seasons && tvShow?.number_of_seasons > 1
                ? "Seasons"
                : "Season"}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flexCol min-w-[150px] gap-4 p-4">
                {tvShow?.seasons?.map((season) => (
                  <Link
                    key={season.id}
                    href={`/tv-shows/${tvShow?.id}/${season.id}`}
                    className="hover:text-primary"
                  >
                    {season.name}
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
}

export default Seasons
