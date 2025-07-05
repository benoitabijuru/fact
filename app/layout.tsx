import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fact ltd",
  description: "A leading Rwandan Based Architecture firm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  flex flex-col`}
      >
        {/* Fixed TopBar */}
        <TopBar />
        
        {/* Main content area that grows to fill available space */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        
        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}