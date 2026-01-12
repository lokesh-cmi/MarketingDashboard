import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import ClientLayout from "@/components/ClientLayout";

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
          <ClientLayout>
            {children}
          </ClientLayout>
        </DateRangeProvider>
      </body>
    </html>
  );
}
