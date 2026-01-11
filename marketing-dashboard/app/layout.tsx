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
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/4 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Header */}
            <Header />

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
