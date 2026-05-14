import { connectToDatabase } from '@/lib/db'
import { Post } from '@/models/postModel'

export default async function sitemap() {
  try {
    await connectToDatabase()

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .lean()

    const staticPages = [
      {
        url: 'https://www.aiwerse.blog',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/ai-tools',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/ai/guides',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/ai/comparisions',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/ai/business-use-cases',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/ai/news',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/about',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/contact',
        lastModified: new Date(),
      },
      {
        url: 'https://www.aiwerse.blog/terms',
        lastModified: new Date(),
      },
    ]

    const blogPages = posts.map((post) => {
      const categoryPathMap = {
        'ai-tools': 'ai-tools',
        'guides': 'ai/guides',
        'comparisions': 'ai/comparisions',
        'business-use-cases': 'ai/business-use-cases',
        'news': 'ai/news',
      }

      const categoryPath =
        categoryPathMap[post.category] || post.category

      return {
        url: `https://www.aiwerse.blog/${categoryPath}/${post.slug}`,
        lastModified: new Date(post.createdAt),
      }
    })

    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Sitemap Error:', error)

    return [
      {
        url: 'https://www.aiwerse.blog',
        lastModified: new Date(),
      },
    ]
  }
}