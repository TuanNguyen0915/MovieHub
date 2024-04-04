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
    name: ""
    username: string
    avatar_path: string
    rating: number
  }
  content: string

  created_at: string

  id: string

  updated_at: string
}
