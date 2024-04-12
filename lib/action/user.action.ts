"use server"
import prisma from "@/prisma/prisma.db"

export const getCurrentUser = async (userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })
  return user
}

export const addMovieToPlaylist = async (
  userEmail: string,
  movieId: number,
  movieName: string,
  movieImg: string,
) => {
  let user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  const isInclude = user?.movies.find((item) => item.id === movieId)
  if (isInclude) {
    user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        movies: {
          set: user?.movies.filter((item) => item.id !== movieId),
        },
      },
    })
  } else {
    user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        movies: {
          push: {
            id: movieId,
            name: movieName,
            movieImg: movieImg,
          },
        },
      },
    })
  }
  return user
}


export const addTvShowToPlaylist = async (
  userEmail: string,
  movieId: number,
  movieName: string,
  movieImg: string,
) => {
  let user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  const isInclude = user?.tvShows.find((item) => item.id === movieId)
  if (isInclude) {
    user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        tvShows: {
          set: user?.tvShows.filter((item) => item.id !== movieId),
        },
      },
    })
  } else {
    user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        tvShows: {
          push: {
            id: movieId,
            name: movieName,
            tvShowImg: movieImg,
          },
        },
      },
    })
  }
  return user
}