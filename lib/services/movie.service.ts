import axios from "axios"

export const OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
}
export const getAllMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US&include_adult=true"

  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getRatedMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=true"
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getMoviesByGenre = async (genreId: any) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getMovieVideo = async (movieId: any) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getMovieById = async (movieId: any) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data
}

export const getRecommendedMovies = async (movieId: any) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getMovieCasts = async (movieId: any) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data.cast
}

export const getMovieReviews = async (movieId: any) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}
