/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io',"massdesigngroup.org"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig