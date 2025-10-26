import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

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

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalAndConstructionFirm',
  name: 'Fact Architecture and Construction',
  description: 'Leading Rwanda-based architecture firm specializing in innovative, sustainable architectural design that blends modern concepts with cultural heritage.',
  url: 'https://www.fact.rw',
  logo: 'https://www.fact.rw/assets/logo.jpg', // Add your logo URL
  image: 'https://www.fact.rw/assets/logo.jpg', // Add your image
  telephone: '+250781885103', // Add your phone number
  email: 'factcustom1@gmail.com', // Update with your actual email
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'KK 579 Main Street', // Add your address
    addressLocality: 'Kigali',
    addressRegion: 'Kigali',
    postalCode: '00000', // Add your postal code
    addressCountry: 'RW'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-1.9536', // Update with your actual coordinates
    longitude: '30.0605'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'],
    opens: '08:00',
    closes: '17:00'
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=100091942292303',
    'https://www.instagram.com/factltd/',
    'https://www.linkedin.com/in/fact-ltd-09a569272/',
    'https://x.com/factcustom',
    'https://www.linkedin.com/in/fact-ltd-09a569272/',
    'https://www.youtube.com/@FACTLTD-v6x/videos',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Rwanda'
  },
  priceRange: '$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9', // Update with actual ratings
    reviewCount: '25' // Update with actual review count
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* JSON-LD Structured Data */}
          <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            strategy="beforeInteractive"
          />
          
          {/* Favicon and app icons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          
          {/* Theme color for mobile browsers */}
          <meta name="theme-color" content="#000000" />
          
          {/* Geo tags for local SEO */}
          <meta name="geo.region" content="RW-01" />
          <meta name="geo.placename" content="Kigali" />
          <meta name="geo.position" content="-1.9536;30.0605" />
          <meta name="ICBM" content="-1.9536, 30.0605" />
        </head>
        <body
          className="antialiased flex flex-col font-sf-pro"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {/* Skip to main content for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white">
            Skip to main content
          </a>
          
          {/* Fixed TopBar */}
          <TopBar />
          
          {/* Main content area that grows to fill available space */}
          <main id="main-content" className="flex-1 overflow-auto">
            {children}
            <Analytics />
          </main>
          
          {/* Footer always at bottom */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}