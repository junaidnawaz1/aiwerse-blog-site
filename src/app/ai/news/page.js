import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/postModel'


export async function generateMetadata() {
  return {
    title: 'Latest AI News, Trends & Industry Updates | AIwerse',
    description: 'Stay updated with the latest AI news, breakthroughs, technology trends, OpenAI updates, AI startups, and industry developments worldwide.',
    alternates: {
      canonical: 'https://www.aiwerse.blog/ai/news',
    },
    openGraph: {
      title: 'Latest AI News, Trends & Industry Updates | AIwerse',
      description: 'Stay updated with the latest AI news, breakthroughs, technology trends, OpenAI updates, AI startups, and industry developments worldwide.',
      url: 'https://www.aiwerse.blog/ai/news',
      type: 'website',
      images: [
        {
          url: 'https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default',
          width: 1200,
          height: 630,
          alt: 'Latest AI News, Trends & Industry Updates | AIwerse',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Latest AI News, Trends & Industry Updates | AIwerse',
      description: 'Stay updated with the latest AI news, breakthroughs, technology trends, OpenAI updates, AI startups, and industry developments worldwide.',
      images: ['https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default'],
    },
  }
}

async function fetchAINewsPosts() {
  try {
    await connectToDatabase()

    const posts = await Post.find({ category: 'news' })
      .sort({ createdAt: -1 })

    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error('DB fetch error:', error)
    return []
  }
}

export default async function AINewsPage() {
  const posts = await fetchAINewsPosts()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            AI News
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest artificial intelligence news, breakthroughs, and industry developments.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p>No posts found</p>
        )}

      </div>
    </main>
  )
}