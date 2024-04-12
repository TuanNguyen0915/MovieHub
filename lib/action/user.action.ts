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

export const removeMovieFromPlaylist = async (
  userEmail: string,
  movieId: number,
) => {
  let user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })
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
    user = await removeMovieFromPlaylist(userEmail, movieId)
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
            image: movieImg.replace("original", "w500"),
          },
        },
      },
    })
  }
  return user
}

export const removeTvShowFromPlaylist = async (
  userEmail: string,
  movieId: number,
) => {
  let user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })
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
    user = await removeTvShowFromPlaylist(userEmail, movieId)
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
            image: movieImg.replace("original", "w500"),
          },
        },
      },
    })
  }
  return user
}
