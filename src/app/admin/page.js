
'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FiEdit2, FiTrash2, FiLogOut } from 'react-icons/fi'
import PostEditor from '../../components/PostEditor'

export default function Page() {   // ✅ name can be Page, AdminDashboard, etc.
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPostEditor, setShowPostEditor] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        if (data.success) {
          setPosts(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchPosts()
    }
  }, [status])

  const handleDeletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch('/api/posts', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: postId })
        })

        const data = await res.json()
        if (data.success) {
          setPosts(posts.filter((post) => post._id !== postId))
          alert('Post deleted successfully')
        } else {
          alert('Failed to delete post')
        }
      } catch (err) {
        console.error('Error deleting post:', err)
        alert('Error deleting post')
      }
    }
  }

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((p) => p._id === postId)
    setEditingPost(postToEdit)
    setShowPostEditor(true)
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  if (status === 'loading') {
    return <div className="p-8">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {session?.user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Editor Section */}
        <div className="mb-8">
          <button
            onClick={() => {
              setShowPostEditor(!showPostEditor)
              setEditingPost(null)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
          >
            {showPostEditor ? 'Cancel' : 'Create New Post'}
          </button>

          {showPostEditor && (
            <div className="mt-6 bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <PostEditor
                post={editingPost}
                onPostCreated={(newPost) => {
                  setPosts([...posts, newPost])
                  setShowPostEditor(false)
                }}
                onPostUpdated={(updatedPost) => {
                  setPosts(posts.map((p) => p._id === updatedPost._id ? updatedPost : p))
                  setShowPostEditor(false)
                  setEditingPost(null)
                }}
              />
            </div>
          )}
        </div>

        {/* Posts List Section */}
        <div className="bg-white rounded shadow">
          <h2 className="text-2xl font-bold p-6 border-b">Posts</h2>

          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No posts yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Slugs</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Comments</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.slug}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.comments?.length || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleEditPost(post._id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}