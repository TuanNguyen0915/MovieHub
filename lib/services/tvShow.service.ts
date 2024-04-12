import axios from "axios"
import { OPTIONS } from "./movie.service"

export const getAllTvShows = async () => {
  const url =
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US&include_adult=false"
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getRateTvShows = async () => {
  const url =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&include_adult=false"
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getTvShowsByGenre = async (genreId: any) => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getTvShowVideo = async (tvShowId: any) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}/videos?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getTvShowById = async (tvShowId: any) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data
}

export const getRecommendedTvShows = async (tvShowId: any) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?language=en-US&page=1`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getTvShowCasts = async (tvShowId: any) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}/credits?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data.cast
}
export const getTvShowReviews = async (tvShowId: any) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}/reviews?language=en-US&page=1`
  const { data } = await axios.get(url, OPTIONS)
  return data.results
}

export const getSeasonEpisodes = async (tvShowId: any, seasonNumber: any) => {
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonNumber}?language=en-US`
  const { data } = await axios.get(url, OPTIONS)
  return data.episodes
}
