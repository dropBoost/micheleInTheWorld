"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import MENUhomepage from "./componenti/menuhomepage"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [datiUtente, setDatiUtente] = useState(null)
  const router = useRouter()

  // 🔹 Controllo sessione
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/") // non loggato → login
      } else {
        setUser(session.user)
      }
    }

    getUser()
  }, [router])

  // 🔹 Recupera profilo utente dalla tabella profiles
  useEffect(() => {
    if (!user) return // aspetta che user sia settato

    const fetchProfile = async () => {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      if (profileError) {
        console.error("Errore fetch profile:", profileError)
        return
      }

      setDatiUtente(profile)
    }

    fetchProfile()
  }, [user])

  // 🔹 Redirect in base al ruolo
  useEffect(() => {
    if (!datiUtente) return // aspetta che il profilo sia caricato

    if (datiUtente.role === "admin") {
      router.push("/admin")
    } else if (datiUtente.role === "user") {
      router.push("/pizzeria")
    }
  }, [datiUtente, router])

  if (!user || !datiUtente) return <p>Caricamento...</p>

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="p-5 rounded-lg">
        <MENUhomepage/>
      </div>
    </div>
  )
}
