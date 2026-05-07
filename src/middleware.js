import { withAuth } from 'next-auth/middleware'

export const middleware = withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Allow /admin and /api/posts routes only if authenticated
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return !!token
      }
      if (req.nextUrl.pathname.startsWith('/api/posts')) {
        return !!token
      }
      return true
    }
  }
})

export const config = {
  matcher: ['/admin/:path*', '/api/posts/:path*']
}
