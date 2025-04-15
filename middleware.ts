import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define all routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/services',
  '/category',
  '/landing',
  '/blog',
  '/testimonials',
  '/booking',
  '/usersetting',
  '/logout',
]

export function middleware(request: NextRequest) {
  console.log("Middleware triggered"); // Debugging
  const token = request.cookies.get('token')?.value // Read token from browser cookies
  console.log("Token in middleware:", token); // Debugging token value
  const { pathname } = request.nextUrl

  // Check if the current path matches any protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // If the route is protected and no token, redirect to login
  if (isProtected && !token) {
    console.log("Redirecting to login"); // Debugging
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Apply middleware only to relevant routes
export const config = {
  matcher: [
    '/dashboard',
    '/services',
    '/category',
    '/landing',
    '/blog',
    '/testimonials',
    '/booking',
    '/usersetting',
    '/logout',
  ],
}
