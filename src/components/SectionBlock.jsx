import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/postModel'
import MagneticButton from './ui/MagneticButton'

export default async function SectionBlock({ category, title, description, categoryPath }) {
  try {
    await connectToDatabase()

    const posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .limit(8)

    const postsData = JSON.parse(JSON.stringify(posts))

    return (
      <section className="py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {description}
            </p>
          </div>

          {/* Posts Grid */}
          {postsData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {postsData.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Show More Button */}
              <div className="flex justify-center">
                <Link href={categoryPath}>
                  <MagneticButton 
                    variant="primary" 
                    size="lg"
                    className="flex bg-gradient-to-r from-blue-500 to-blue-300 items-center gap-2"
                  >
                    Show More {title}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </MagneticButton>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center py-8">No posts found in this category yet.</p>
          )}
        </div>
      </section>
    )
  } catch (error) {
    console.error(`Error fetching ${category} posts:`, error)
    return <div>Error loading posts</div>
  }
}