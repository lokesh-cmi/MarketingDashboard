import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketing Dashboard",
  description: "Comprehensive marketing analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DateRangeProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-900 to-purple-900 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-gradient-to-br from-purple-600 via-fuchsia-500 to-purple-700 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-fuchsia-600 rounded-full blur-3xl opacity-35 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/4 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-fuchsia-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Sticky Header */}
            <div className="sticky top-0 z-50">
              <Header />
            </div>

            {/* Main Content */}
            <main className="relative z-10 px-8 pb-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </DateRangeProvider>
      </body>
    </html>
  );
}
