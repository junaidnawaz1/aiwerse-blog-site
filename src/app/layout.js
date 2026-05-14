import { Geist, Geist_Mono } from "next/font/google";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AIwerse - Latest AI Tools, News & Insights",
  description: "Discover the latest AI tools, comparisons, guides, business use cases, and news from AIwerse.",
  alternates: {
    canonical: 'https://www.aiwerse.blog',
  },
  openGraph: {
    title: 'AIwerse - Latest AI Tools, News & Insights',
    description: 'Discover the latest AI tools, comparisons, guides, business use cases, and news from AIwerse.',
    url: 'https://www.aiwerse.blog',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default',
        width: 1200,
        height: 630,
        alt: 'AIwerse - Latest AI Tools, News & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIwerse - Latest AI Tools, News & Insights',
    description: 'Discover the latest AI tools, comparisons, guides, business use cases, and news from AIwerse.',
    images: ['https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProviderWrapper>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}