"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserStore } from "@/lib/stores/user.store"
import MovieTable from "./MovieTable"
import Link from "next/link"

const UserTabs = () => {
  const { currentUser, setCurrentUser } = useUserStore()
  return (
    <Tabs defaultValue="movies" className="w-full">
      <TabsList>
        <TabsTrigger value="movies">Movies ({currentUser?.movies?.length})</TabsTrigger>
        <TabsTrigger value="tv-shows">TvShows ({currentUser?.tvShows?.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="movies">
        {currentUser?.movies?.length === 0 ? (
          <Link href="/" className="text-center text-lg hover:text-primary transition-all">
            No movies in your watching list
          </Link>
        ) : (
          <MovieTable movies={currentUser?.movies!} type="movie" />
        )}
      </TabsContent>
      <TabsContent value="tv-shows">
        {currentUser?.tvShows?.length === 0 ? (
          <Link href="/" className="text-center text-lg hover:text-primary transition-all">
            No tv-show in your watching list
          </Link>
        ) : (
          <MovieTable movies={currentUser?.tvShows!} type="tv-shows" />
        )}
      </TabsContent>
    </Tabs>
  )
}

export default UserTabs
