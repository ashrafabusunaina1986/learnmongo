import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = req => {
  const path = req.nextUrl.pathname
  const isPublicPath = path === '/auth/login' || path === '/auth/register'

  const token = req.cookies.get('token')?.value || ''
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl))
  }
  if (!isPublicPath && !token) {

    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/task',
    '/text',
    '/uploadfile',
    '/auth/login',
    '/auth/register'
  ]
}