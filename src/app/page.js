import Landing from "@/components/Home";

export const metadata = {
  title: 'AIwerse - Latest AI Tools, News & Insights',
  description: 'Discover the latest AI tools, comparisons, guides, business use cases, and news from AIwerse.',
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
}

export default function Home() {
  return <Landing />
}