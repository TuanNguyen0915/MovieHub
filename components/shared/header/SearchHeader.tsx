"use client"
import { SearchIcon } from "lucide-react"
import { useState } from "react"


const SearchHeader = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  return (
    <div
      className={`${searchTerm ? "w-[16rem]" : ""} flexCenter hover:flexBetween group h-12 w-12  rounded-full border border-muted-foreground p-2 transition-all duration-700 hover:w-[16rem] hover:gap-2 hover:border-foreground`}
    >
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search"
        className={`${searchTerm ? "w-full" : "w-0"} h-full w-0 border-b border-primary bg-transparent focus:outline-none focus:ring-0 group-hover:w-full`}
      />
      <SearchIcon />
    </div>
  )
}

export default SearchHeader
