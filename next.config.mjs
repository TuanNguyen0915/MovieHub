/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        protocol: "https",
      },
      { hostname: "avatars.githubusercontent.com", protocol: "https" },
    ],
  },
}

export default nextConfig
