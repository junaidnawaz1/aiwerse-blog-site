
// import { NextResponse } from 'next/server'
// import { Post } from '@/models/postModel'
// import { connectToDatabase } from '@/lib/db'

// // helper function to create slug
// function createSlug(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')   // replace spaces/special chars with -
//     .replace(/^-+|-+$/g, '')       // trim - from start/end
// }

// // GET: return all posts, with optional category & search
// export async function GET(request) {
//   try {
//     await connectToDatabase()

//     const { searchParams } = new URL(request.url)
//     const category = searchParams.get('category')
//     const keyword = searchParams.get('search')

//     let query = {}

//     if (category) {
//       query.category = category
//     }

//     if (keyword) {
//       query.title = { $regex: keyword, $options: 'i' }
//     }

//     const posts = await Post.find(query).sort({ createdAt: -1 }).limit(keyword ? 5 : 0)

//     return NextResponse.json({ success: true, data: posts })
//   } catch (err) {
//     console.error('GET posts error:', err)
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch posts' },
//       { status: 500 }
//     )
//   }
// }

// // POST: create a new post
// export async function POST(request) {
//   try {
//     await connectToDatabase()
//     const body = await request.json()

//     const { title, content, category, imageUrl, seoTitle, seoDescription } = body

//     if (!title || !content || !category) {
//       return NextResponse.json(
//         { success: false, error: 'Title, content, and category are required' },
//         { status: 400 }
//       )
//     }

//     const slug = createSlug(title)   // ✅ generate slug

//     const post = new Post({
//       title,
//       slug,                          // ✅ include slug
//       content,
//       category,
//       imageUrl: imageUrl || undefined,
//       seoTitle: seoTitle || undefined,
//       seoDescription: seoDescription || undefined
//     })

//     const newPost = await post.save()

//     return NextResponse.json(
//       { success: true, data: newPost, message: 'Post created successfully' },
//       { status: 201 }
//     )
//   } catch (err) {
//     console.error('POST post error:', err)
//     return NextResponse.json(
//       { success: false, error: 'Failed to create post' },
//       { status: 500 }
//     )
//   }
// }

// // PUT: update a post by ID
// export async function PUT(request) {
//   try {
//     await connectToDatabase()
//     const body = await request.json()

//     const { id, title, ...updateData } = body

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: 'Post ID is required' },
//         { status: 400 }
//       )
//     }

//     if (title) {
//       updateData.slug = createSlug(title)
//     }

//     const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true })

//     if (!updatedPost) {
//       return NextResponse.json(
//         { success: false, error: 'Post not found' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(
//       { success: true, data: updatedPost, message: 'Post updated successfully' }
//     )
//   } catch (err) {
//     console.error('PUT post error:', err)
//     return NextResponse.json(
//       { success: false, error: 'Failed to update post' },
//       { status: 500 }
//     )
//   }
// }

// // DELETE: delete a post by ID
// export async function DELETE(request) {
//   try {
//     await connectToDatabase()
//     const body = await request.json()

//     const { id } = body

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: 'Post ID is required' },
//         { status: 400 }
//       )
//     }

//     const deletedPost = await Post.findByIdAndDelete(id)

//     if (!deletedPost) {
//       return NextResponse.json(
//         { success: false, error: 'Post not found' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(
//       { success: true, message: 'Post deleted successfully' }
//     )
//   } catch (err) {
//     console.error('DELETE post error:', err)
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete post' },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'  // ← ADD THIS LINE
import { Post } from '@/models/postModel'
import { connectToDatabase } from '@/lib/db'

// helper function to create slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// GET: return all posts
export async function GET(request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const keyword = searchParams.get('search')

    let query = {}

    if (category) {
      query.category = category
    }

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' }
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).limit(keyword ? 5 : 0)

    return NextResponse.json({ success: true, data: posts })
  } catch (err) {
    console.error('GET posts error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST: create a new post
export async function POST(request) {
  try {
    await connectToDatabase()
    const body = await request.json()

    const { title, content, category, imageUrl, seoTitle, seoDescription } = body

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and category are required' },
        { status: 400 }
      )
    }

    const slug = createSlug(title)

    const post = new Post({
      title,
      slug,
      content,
      category,
      imageUrl: imageUrl || undefined,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined
    })

    const newPost = await post.save()

    // ← ADD THIS: Clear cache for all affected pages
    revalidatePath('/')                          // home page
    revalidatePath('/ai-tools')                  // ai-tools page
    revalidatePath('/ai/guides')                 // guides page
    revalidatePath('/ai/comparisions')           // comparisons page
    revalidatePath('/ai/business-use-cases')     // business page
    revalidatePath('/ai/news')                   // news page

    return NextResponse.json(
      { success: true, data: newPost, message: 'Post created successfully' },
      { status: 201 }
    )
  } catch (err) {
    console.error('POST post error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// PUT: update a post by ID
export async function PUT(request) {
  try {
    await connectToDatabase()
    const body = await request.json()

    const { id, title, category, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    if (title) {
      updateData.slug = createSlug(title)
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { title, category, ...updateData }, { new: true })

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // ← ADD THIS: Clear cache for all affected pages
    revalidatePath('/')
    revalidatePath('/ai-tools')
    revalidatePath('/ai/guides')
    revalidatePath('/ai/comparisions')
    revalidatePath('/ai/business-use-cases')
    revalidatePath('/ai/news')

    return NextResponse.json(
      { success: true, data: updatedPost, message: 'Post updated successfully' }
    )
  } catch (err) {
    console.error('PUT post error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE: delete a post by ID
export async function DELETE(request) {
  try {
    await connectToDatabase()
    const body = await request.json()

    const { id } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const deletedPost = await Post.findByIdAndDelete(id)

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // ← ADD THIS: Clear cache for all affected pages
    revalidatePath('/')
    revalidatePath('/ai-tools')
    revalidatePath('/ai/guides')
    revalidatePath('/ai/comparisions')
    revalidatePath('/ai/business-use-cases')
    revalidatePath('/ai/news')

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' }
    )
  } catch (err) {
    console.error('DELETE post error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}