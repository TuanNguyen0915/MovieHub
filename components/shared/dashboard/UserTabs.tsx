"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User } from "@prisma/client"

const UserTabs = ({
  currentUser,
}: {
  currentUser: User | undefined | null
}) => {
  return (
    <Tabs defaultValue="movies" className="w-full">
      <TabsList>
        <TabsTrigger value="movies">Movies</TabsTrigger>
        <TabsTrigger value="tv-shows">TvShows</TabsTrigger>
      </TabsList>
      <TabsContent value="movies">
        All liked movies here. {currentUser?.movies.length}
      </TabsContent>
      <TabsContent value="tv-shows">
        All liked tv-shows here. {currentUser?.tvShows.length}
      </TabsContent>
    </Tabs>
  )
}

export default UserTabs
