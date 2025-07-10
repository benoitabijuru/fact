import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

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
        </main>
        
        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}