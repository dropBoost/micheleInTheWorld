"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import MENUhomepage from "./componenti/menuhomepage"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()
 
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        // non loggato → redirect a login (/)
        router.push("/")
      } else {
        // loggato → salva l'utente nello stato
        setUser(data.session.user)
      }
    }

    getUser()
  }, [router])





  function caricaOrdineBufala() {
    if (user) {
      router.push(`/pizzeria/bufala/${user.id}`)
    }
  }

  function caricaOrdineLatticini() {
    if (user) {
      router.push(`/pizzeria/latticini/${user.id}`)
    }
  }



  if (!user) return <p>Caricamento...</p>


  return (
  <>
  <div className="flex flex-col gap-3 w-full h-full">

    {/* CARICAMENTO ORDINI */}
    <div className="p-5 rounded-lg">
        <MENUhomepage/>
    </div>

    {/* BR PER SPAZIO */}

  </div>
  </>  
  )
}





function ButtonOrdini ({nome, evento}) {
  return(
    <>
    <button className="py-1 px-2 w-fit text-xs bg-brand-700 text-white rounded hover:bg-neutral-100 hover:text-brand" onClick={evento}>
        {nome}
    </button>
    </>
  )
}


          