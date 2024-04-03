"use client"
import { IMovie } from "@/lib/types"
import { SearchIcon } from "lucide-react"
import React, { useState } from "react"

interface IProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const Search = ({ searchTerm, setSearchTerm }: IProps) => {
  return (
    <div className="flex w-full items-center gap-2 lg:gap-4">
      <form
        className={` flexBetween group flex-1 rounded-lg border p-4 transition-all hover:border-muted-foreground ${searchTerm.length > 0 ? "border-muted-foreground" : "border-border"}`}
      >
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent  focus:outline-none focus:ring-0 "
        />
        <SearchIcon className="opacity-60 transition-all group-hover:opacity-100" />
      </form>
      <div>Genres</div>
    </div>
  )
}

export default Search
