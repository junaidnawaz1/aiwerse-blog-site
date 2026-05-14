import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/postModel'


export async function generateMetadata() {
  return {
    title: 'AI Tool Comparisons & Reviews | Compare the Best AI Platforms | AIwerse',
    description: 'Compare AI tools, platforms, chatbots, generators, and automation software to find the best AI solution for your business and workflow.',
    alternates: {
      canonical: 'https://www.aiwerse.blog/ai/comparisions',
    },
    openGraph: {
      title: 'AI Tool Comparisons & Reviews | Compare the Best AI Platforms | AIwerse',
      description: 'Compare AI tools, platforms, chatbots, generators, and automation software to find the best AI solution for your business and workflow.',
      url: 'https://www.aiwerse.blog/ai/comparisions',
      type: 'website',
      images: [
        {
          url: 'https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default',
          width: 1200,
          height: 630,
          alt: 'AI Comparisons - AIwerse',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Tool Comparisons & Reviews | Compare the Best AI Platforms | AIwerse',
      description: 'Compare AI tools, platforms, chatbots, generators, and automation software to find the best AI solution for your business and workflow.',
      images: ['https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default'],
    },
  }
}

async function fetchAIComparisonsPosts() {
  try {
    await connectToDatabase()

    const posts = await Post.find({ category: 'comparisions' })
      .sort({ createdAt: -1 })

    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error('DB fetch error:', error)
    return []
  }
}

export default async function AIComparisonsPage() {
  const posts = await fetchAIComparisonsPosts()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            AI Tool Comparisons & Reviews
          </h1>
          <p className="text-lg text-gray-600">
            Compare AI tools, platforms, chatbots, generators, and automation software to find the best AI solution for your business and workflow.
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