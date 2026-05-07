// import Link from 'next/link'

// function stripHtml(html = '') {
//   return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
// }

// export default function PostCard({ post }) {
//   if (!post) return null

//   const title = post.title || 'Untitled Post'
//   const imageUrl = post.imageUrl || 'https://placehold.co/800x500?text=SmartBizAI'
//   const rawText = stripHtml(post.content || '')
//   const excerpt = rawText.length > 100 ? `${rawText.slice(0, 100)}...` : rawText

//   const slug = post.slug
//   const category = post.category

//   const href = `/${category}/${slug}`

//   return (
//     <Link
//       href={href}
//       className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//     >
//       <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
//         <img
//           src={imageUrl}
//           alt={title}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           loading="lazy"
//         />
//       </div>

//       <div className="space-y-3 p-5 sm:p-6">
//         <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-xl">
//           {title}
//         </h3>

//         <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-base">
//           {excerpt || 'Read this story to discover more details.'}
//         </p>
//       </div>
//     </Link>
//   )
// }

import Link from 'next/link'

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// Helper function to get correct path for each category
function getCategoryPath(category) {
  const pathMap = {
    'ai-tools': '/ai-tools',
    'guides': '/ai/guides',
    'comparisions': '/ai/comparisions',
    'business-use-cases': '/ai/business-use-cases',
    'news': '/ai/news',
  }
  return pathMap[category] || `/${category}/${slug}`
}

export default function PostCard({ post }) {
  if (!post) return null

  const title = post.title || 'Untitled Post'
  const imageUrl = post.imageUrl || 'https://placehold.co/800x500?text=SmartBizAI'
  const rawText = stripHtml(post.content || '')
  const excerpt = rawText.length > 100 ? `${rawText.slice(0, 100)}...` : rawText

  const slug = post.slug
  const category = post.category

  // Generate correct path based on category
  const href = `${getCategoryPath(category)}/${slug}`

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-xl">
          {title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {excerpt || 'Read this story to discover more details.'}
        </p>
      </div>
    </Link>
  )
}