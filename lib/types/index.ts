export interface IMovie {
  adult?: boolean
  backdrop_path?: string
  id?: number
  name?: string
  title?: string
  original_language?: string
  original_name?: string
  overview?: string
  poster_path?: string
  media_type?: string
  genre_ids?: number[]
  popularity?: number
  release_date?: string
  vote_average?: number
  vote_count?: number
  origin_country?: string[]
}

export interface IMovieDetails {
  adult: boolean
  backdrop_path: string

  belongs_to_collection: null

  budget: number

  genres: [{ id: number; name: string }]

  homepage: string

  id: number

  original_language: string

  original_title: string

  overview: string

  popularity: number

  poster_path: string

  production_companies: [
    {
      id: number

      logo_path: string

      name: string

      origin_country: string
    },
  ]

  production_countries: [
    {
      iso_3166_1: string

      name: string
    },
  ]

  release_date: string

  revenue: number

  runtime: number

  spoken_languages: [
    {
      english_name: string

      name: string
    },
  ]

  status: string

  tagline: string

  title: string

  video: boolean

  vote_average?: number

  vote_count: number
}

export interface IVideo {
  id: string
  key: string
  type: string
  site: string
}

export interface ICast {
  id: number
  name: string
  profile_path: string
  character: string
}

export interface IReview {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string

  created_at: string

  id: string
  url: string
  updated_at: string
}

export interface ITvShowDetails {
  adult: false
  backdrop_path: string
  created_by: [
    {
      id: number
      credit_id: string
      name: string
      gender: 2
      profile_path: string
    },
  ]
  episode_run_time: string[]
  first_air_date: string
  genres: [
    {
      id: number
      name: string
    },
  ]
  homepage: string
  id: number
  in_production: true
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  name: string
  next_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: boolean
  }
  networks: [
    {
      id: number
      logo_path: string
      name: string
      origin_country: string
    },
  ]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: [
    {
      id: number
      logo_path: string
      name: string
      origin_country: string
    },
  ]
  production_countries: [
    {
      iso_3166_1: string
      name: string
    },
  ]
  seasons: ISeason[]
  spoken_languages: [
    {
      english_name: string

      name: string
    },
  ]
  status: string
  tagline: string
  type: string
  vote_average: 7.964
  vote_count: 3589
}

export interface ISeason {
  air_date: null
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: null
  season_number: number
  vote_average: number
}

export interface IEpisode {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  runtime: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
}
