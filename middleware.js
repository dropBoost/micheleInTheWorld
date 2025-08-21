import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    cookies: {
      get(name) { return req.cookies.get(name)?.value },
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

  // Non loggato → redirect alla home
  if (!session) return NextResponse.redirect(new URL("/", req.url))

  // Recupera ruolo dall’altra tabella
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .maybeSingle()

  const role = profile?.role || "user"

  const path = req.nextUrl.pathname

  // 🔹 Utente "user" può accedere solo a /pizzeria
  if (role === "user" && !path.startsWith("/pizzeria")) {
    return NextResponse.redirect(new URL("/pizzeria", req.url))
  }

  // 🔹 Utente "admin" può accedere solo a /admin (opzionale)
  if (role === "admin" && !path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return res
}

// 🔹 Attiva il middleware su tutte le route
export const config = {
  matcher: ["/:path*"],
}
