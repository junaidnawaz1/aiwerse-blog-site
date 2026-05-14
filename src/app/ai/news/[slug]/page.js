import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/postModel'
import ShareButton from '@/components/ui/shareButton';

import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi'
import '@/app/prose-override.css'


async function getPost(slug) {
  try {
    await connectToDatabase()
    const post = await Post.findOne({ slug })
    if (!post) return null
    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'Blog post not found',
    }
  }
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.title,
    alternates: {
      canonical: `https://www.aiwerse.blog/ai/news/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.title,
      url: `https://www.aiwerse.blog/ai/news/${post.slug}`,
      type: 'article',
      images: post.imageUrl ? [{
        url: post.imageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [{
        url: 'https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default',
        width: 1200,
        height: 630,
        alt: 'AIwerse - Latest AI Tools, News & Insights',
      }],
      publishedTime: post.createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.title,
      images: post.imageUrl ? [post.imageUrl] : ['https://res.cloudinary.com/docdcivv7/image/upload/v1/newsee_blog/og-default'],
    },
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/ai/news" className="text-blue-600 hover:text-blue-700 font-semibold">
            Back to AI News
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white text-black">
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/ai/news"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <FiArrowLeft size={18} />
            Back to AI News
          </Link>
        </div>
      </div>

      {post.imageUrl && (
        <div className="relative rounded-lg shadow-lg w-full h-auto">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
            {post.createdAt && (
              <div className="flex items-center gap-2">
                <FiCalendar size={18} className="text-blue-600" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            )}
            
            {post.category && (
              <div className="flex items-center gap-2">
                <FiTag size={18} className="text-blue-600" />
                <span className="capitalize font-semibold text-blue-600">{post.category}</span>
              </div>
            )}

            {post.seoDescription && (
              <div className="text-gray-500 italic">
                {post.seoDescription}
              </div>
            )}
          </div>
        </div>

        <article className="prose prose-lg max-w-none">
  <style>{`
  .prose h1 { font-size: 2rem; font-weight: 800; color:#0f172a; margin-top:2rem; margin-bottom:1.5rem; line-height:1.08; }
  .prose h2 { font-size: 1.5rem; font-weight:700; color:#0f172a; margin-top:1.5rem; margin-bottom:1rem; }
  .prose h3 { font-size: 1.25rem; font-weight:700; color:#0f172a; margin-top:1.25rem; margin-bottom:0.75rem; }
  @media (min-width: 768px) {
    .prose h1 { font-size: 2.75rem; margin-top:3.5rem; margin-bottom:2rem; }
    .prose h2 { font-size: 2.25rem; margin-top:3rem; margin-bottom:1.5rem; }
    .prose h3 { font-size: 1.75rem; margin-top:2.5rem; margin-bottom:1rem; }
  }
  .prose p { font-size:1.125rem; color:#374151; line-height:1.7; margin-bottom:1.5rem; }
  .prose a { color:#2563eb; text-decoration:underline; }
  .prose ul, .prose ol { margin:1.5rem 0; padding-left:1.25rem; }
  .prose li { margin-bottom:0.5rem; color:#374151; }
  .prose img { display:block; max-width:100%; height:auto; border-radius:0.5rem; box-shadow:0 6px 18px rgba(15,23,42,0.08); margin:2.5rem auto; }
  @media (min-width: 758px) {
    .prose img { max-width:550px; }
  }
  .prose img.img-small { max-width:300px; margin-left:auto; margin-right:auto; }
  .prose img.img-medium { max-width:600px; margin-left:auto; margin-right:auto; }
  .prose img.img-large { width:100%; }
  .prose blockquote { border-left:4px solid #2563eb; background:#f0f9ff; padding:1rem; margin:2rem 0; border-radius:0.25rem; font-style:italic; color:#1f2937; }
  .prose code { background:#f3f4f6; color:#b91c1c; padding:0.125rem 0.5rem; border-radius:0.25rem; font-family:monospace; font-size:0.875rem; }
  .prose pre { background:#0f172a; color:#f3f4f6; padding:1rem; border-radius:0.5rem; overflow:auto; margin:2rem 0; }
`}</style>
  <div dangerouslySetInnerHTML={{ __html: post.content }} />
</article>

      <div className="mt-16 pt-8 border-t border-gray-200">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Post Information */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-2">Post Information</h3>
      <p className="text-gray-600 text-sm">
        Category: <span className="font-semibold capitalize text-blue-600">{post.category}</span>
      </p>
      {/* Removed Likes section as requested */}
    </div>

    {/* Share Buttons & AI Tools */}
    <div className="bg-blue-50 rounded-lg p-4 space-y-4">
      {/* Share Buttons Component */}
      <ShareButton />
      
      {/* More AI Tools Button */}
      <Link
        href="/ai-tools"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full text-center"
      >
        More AI Tools
      </Link>
    </div>
  </div>
</div>
      </div>
    </main>
  )
}