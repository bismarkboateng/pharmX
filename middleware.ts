import { NextResponse, NextRequest } from "next/server"
import axios from "axios"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const cookie = cookies().get("userId")
  const userId = cookie && cookie.value
  
  const { pathname } = url
  
  const { data } = await axios.get(`http://localhost:3000/api?userId=${userId}`)

  const user = data
  // user =  { role: role, id: id }

  const protectedRoutes = [
    /^\/pharmacy\/dashboard\/[^/]+$/,
    /^\/pharmacy\/dashboard\/[^/]+\/drugs$/,
    /^\/pharmacy\/dashboard\/[^/]+\/orders$/,
    /^\/pharmacy\/dashboard\/[^/]+\/settings$/,
    /^\/pharmacies\/[^/]+$/,
    /^\/pharmacies\/drug\/[^/]+$/,
    "/pharmacies",
    "/my-orders"
  ]

  const authRoutes = [
    "/",
    "/accounts/sign-in",
    "/accounts/sign-up",
    "/accounts/reset-password",
  ]

  const isAuthRoute = authRoutes.includes(pathname)
  const isProtected = protectedRoutes.some((route) => {
    if (typeof route === "string") {
      return pathname === route
    } else if (route instanceof RegExp) {
      return route.test(pathname)
    }
    return false
  })

  if (user.role) {
    if (isAuthRoute) {
      if (user.role === "customer") {
        return NextResponse.redirect(new URL("/pharmacies", request.url))
      } else if (user.role === "pharmacist") {
        return NextResponse.redirect(new URL(`/pharmacy/dashboard/${user.id}`, request.url))
      }
    }
  } else {
    if (isProtected) {
      return NextResponse.redirect(new URL(`/accounts/sign-in`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/accounts/sign-in",
    "/accounts/sign-up",
    "/accounts/reset-password",

    // pharmacies dashboard
    "/pharmacies",
    "/pharmacies/:path*",
    "/pharmacies/drug/:path*",
    "/my-orders",

    // pharmacy dashboard
    "/pharmacy/dashboard/:path*",

    // other routes
    "/join-us/register-your-pharmacy"
    
  ]
}