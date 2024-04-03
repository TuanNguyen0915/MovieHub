import axios from "axios"

const OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
}
export const getAllMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US"

  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getRatedMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getMoviesByGenre = async (genreId: number | string) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&without_genres=${genreId}`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}
