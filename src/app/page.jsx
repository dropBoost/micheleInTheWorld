"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const [utente, setUtente] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 🔹 Redirect automatico se già loggato
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace("/pizzeria")
      }
    }
    checkSession()
  }, [router])

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email")
      .eq("utente", utente)
      .maybeSingle()

    if (profileError || !profile) {
      alert("Utente non trovato")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    // redirect dopo login
    router.push("/pizzeria")
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-brand">
      <Image src="/logo-pizzeria-michele-foo.png" width={150} height={100} className="mb-5"/>
      <form onSubmit={handleLogin} className="grid gap-2 w-64">
        <input
          type="text"
          placeholder="Utente"
          value={utente}
          onChange={e => setUtente(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Caricamento..." : "Entra"}
        </button>
      </form>
    </div>
  )
}
