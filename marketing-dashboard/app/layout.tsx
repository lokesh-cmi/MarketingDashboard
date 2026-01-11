import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Header */}
          <header className="relative z-10 px-8 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="text-white font-bold text-3xl flex items-center">
                  <span className="text-4xl mr-1">𝕏</span>
                  <span>Metrics</span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
                <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Quarterly</option>
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative z-10 px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
