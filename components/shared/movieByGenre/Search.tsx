"use client"

import { SearchIcon } from "lucide-react"

import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { PopoverContent } from "@/components/ui/popover"
import { genres } from "@/lib/constant"
import Link from "next/link"
interface IProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const Search = ({ searchTerm, setSearchTerm }: IProps) => {
  return (
    <div className="flex w-full items-center gap-2 lg:gap-4">
      <Popover>
        <PopoverTrigger className="rounded-2xl border border-primary bg-primary p-2 transition-all hover:bg-transparent lg:p-4">
          <p>Genres</p>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flexCol w-full gap-4">
            {genres.map((genre) => (
              <Link key={genre.id} href={`/genre/${genre.name}`} className="capitalize hover:text-primary transition-all">
                {genre.name}
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <form
        className={` flexBetween group flex-1 rounded-lg border p-2 transition-all hover:border-muted-foreground lg:p-4 ${searchTerm.length > 0 ? "border-muted-foreground" : "border-border"}`}
      >
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent  focus:outline-none focus:ring-0 "
        />
        <SearchIcon className="opacity-60 transition-all group-hover:opacity-100" />
      </form>
    </div>
  )
}

export default Search
