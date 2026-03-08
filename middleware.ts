import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }

        if (pathname.startsWith('/owner')) {
          return token?.role === 'OWNER' || token?.role === 'ADMIN'
        }

        if (
          pathname.startsWith('/dashboard') ||
          pathname.startsWith('/booking') ||
          pathname.startsWith('/api/bookings') ||
          pathname.startsWith('/api/payments')
        ) {
          return !!token
        }

        return true
      }
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/owner/:path*', '/admin/:path*', '/booking/:path*', '/api/bookings/:path*', '/api/payments/:path*']
}
