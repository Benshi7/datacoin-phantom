/* import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Paths that don't require authentication
  const publicPaths = ["/", "/signin", "/signup"]
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname === path)

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware (request: NextRequest) {
  const publicPaths = ['/', '/signin', '/signup']
  const isPublicPath = publicPaths.some(
    path => request.nextUrl.pathname === path
  )

  // For now, we'll skip auth checks since we're using client-side wallet auth
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
