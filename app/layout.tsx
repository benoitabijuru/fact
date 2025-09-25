import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Fact",
  description: "A leading Rwandan-based architecture firm crafting innovative spaces that blend modern design with cultural heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       <html lang="en" className="">
      <body
        className="antialiased flex flex-col font-sf-pro"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {/* Fixed TopBar */}
        <TopBar />
        
        {/* Main content area that grows to fill available space */}
        <main className="flex-1 overflow-auto">
          {children}
          <Analytics/>
        </main>
        
        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
   
  );
}