import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/postModel'


export const metadata = {
  title: 'Business Use Cases - AIwerse',
  description: 'Explore real-world business use cases and applications of artificial intelligence.',
}

async function fetchBusinessUseCasesPosts() {
  try {
    await connectToDatabase()

    const posts = await Post.find({ category: 'business-use-cases' })
      .sort({ createdAt: -1 })

    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error('DB fetch error:', error)
    return []
  }
}

export default async function BusinessUseCasesPage() {
  const posts = await fetchBusinessUseCasesPosts()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Business Use Cases
          </h1>
          <p className="text-lg text-gray-600">
            Explore real-world business use cases and applications of artificial intelligence transforming industries.
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