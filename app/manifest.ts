import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Focus on Architecture and Construction Technologies Ltd',
    short_name: 'Fact Ltd',
    description: 'Next.js App',
    start_url: 'www.fact.rw',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}