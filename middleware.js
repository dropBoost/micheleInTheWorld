// middleware.js
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req) {
  const res = NextResponse.next()

  // Crea il client Supabase lato server
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // service role per leggere sessioni sicure
    cookies: {
      get(name) {
        return req.cookies.get(name)?.value
      },
      set(name, value, options) {
        req.cookies.set({ name, value, ...options })
        res.cookies.set({ name, value, ...options })
      },
      remove(name, options) {
        req.cookies.delete(name)
        res.cookies.delete(name, options)
      },
    },
  })

  const { data: { session } } = await supabase.auth.getSession()

  // Se non loggato e prova ad accedere a /pizzeria → redirect a /
  if (!session && req.nextUrl.pathname.startsWith("/pizzeria")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return res
}

// Matcher per proteggere tutte le route sotto /pizzeria
export const config = {
  matcher: ["/pizzeria/:path*"],
}
