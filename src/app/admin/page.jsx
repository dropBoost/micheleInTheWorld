"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabaseClient"

export default function PAGEAdmin() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/")
        return
      }

      const userId = session.user.id

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle()

      const userRole = data?.role || "user"
      setRole(userRole)

      if (userRole === "user") {
        router.push("/pizzeria") // redirect per utenti non admin
        return
      }

      setLoading(false)
    }

    checkRole()
  }, [router])

    //LOGOUT
    async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    }  

  if (loading) return <p>Caricamento...</p>

  return (
    <>
      <h1>Benvenuto Admin!</h1>
      <p>Ruolo utente: {role}</p>
                  <button
                onClick={handleLogout}
                className="py-1 px-2 w-fit text-xs bg-red-600 text-white rounded hover:bg-red-800"
            >
                {ICONoff} ESCI
            </button>
    </>
  )
}
