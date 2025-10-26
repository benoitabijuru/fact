
import AboutUsPage from '@/components/AboutUs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: "Fact Ltd | Leading Architecture and Construction Firm in Rwanda",
    template: "%s | Fact Ltd Rwanda"
  },
  description: "Fact Ltd is Rwanda's premier architecture and Construction firm specializing in innovative, sustainable design. Based in Kigali, we create modern architectural solutions blending contemporary design with Rwandan cultural heritage. Expert architects serving Kigali, Musanze, and all of Rwanda.",
  keywords: [
    "architecture firm Rwanda",
    "Musanze architecture firm",
    "Musanze construction company",
    "Kigali construction company",
    "architects in Rwanda",
    "Kigali architecture",
    "Kigali constructions company",
    "Rwanda construction company",
    "Rwanda architecture firm",
    "architectural design Rwanda",
    "building design Kigali",
    "modern architecture Rwanda",
    "sustainable architecture Rwanda",
    "commercial architecture Rwanda",
    "residential architecture Rwanda",
    "Fact Ltd Rwanda",
    "Rwanda architects",
    "East Africa architecture",
    "East Africa construction company",
    "Construction supervion Rwanda",
    "Civil engineering Rwanda",
    "Structural design Rwanda",
    "Interior design Rwanda",
    "3D visualization Rwanda",
    "Architectural rendering Kigali",
    "Architectural animation Rwanda",
    "Urban planning Rwanda",
    "Landscape architecture Rwanda",
    "Renovation services Rwanda",
    "Building restoration Rwanda",
    "Construction management Rwanda",
    "Project management Kigali",
    "Building information modeling Rwanda",
    "Green building design Rwanda",
    "Eco-friendly architecture Rwanda",
    "Cultural architecture Rwanda",
    "Contemporary architecture Rwanda",
    "Fact Architecture",

  ],
  authors: [{ name: "Fact Architecture and Construction", url: "https://www.fact.rw" }],
  creator: "Fact Architecture and Construction",
  publisher: "Fact Architecture and Construction",
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://www.fact.rw",
    siteName: "Fact Architecture and Construction",
    title: "Fact Ltd| Leading Architecture and Construction Firm in Rwanda",
    description: "Rwanda's premier architecture firm crafting innovative spaces that blend modern design with cultural heritage. Serving Kigali and all of Rwanda.",
    images: [
      {
        url: "https://www.fact.rw/assets/logo.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Fact Ltd - Rwanda's Leading Architecture and Construction Firm",
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Fact Ltd | Leading Architecture and Construction Firm in Rwanda",
    description: "Rwanda's premier architecture and construction firm crafting innovative spaces that blend modern design with cultural heritage.",
    images: ["https://www.fact.rw/assets/logo.jpg"], // Add your Twitter image
    creator: "@factltd",
  },
  
  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification tokens (add your actual tokens)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // Additional metadata
  alternates: {
    canonical: "https://www.fact.rw",
  },
  
  category: "Architecture and Construction in Rwanda",
};

const page = () => {
  
  return (
    <>
        <AboutUsPage/>
    </>
  )
}

export default page