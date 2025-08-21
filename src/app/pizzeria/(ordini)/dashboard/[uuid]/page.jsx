"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../../../../lib/supabaseClient"

export default function PAGEDashboard() {

  const { uuid } = useParams() // prende il parametro dinamico dalla route

  //GESTIONE DATA
  const dataOggi = new Date()
  const dataFormattata = dataOggi.toLocaleDateString("it-IT")
  const meseCorrente = dataOggi.getMonth()+1

  console.log("mese",meseCorrente)

  const [form, setForm] = useState({
    fiorDiLatte: "",
    pecorino:"",
    ricotta:"",
    provoloneDelMonaco:"",
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchNomeSede() {
      const { data, error } = await supabase
        .from("profiles")
        .select("utente")       // seleziona utente, non solo id
        .eq("id", uuid)
        .maybeSingle()

      if (error) {
        console.error("Errore fetch:", error)
      } else if (data) {
        setForm(prev => ({
          ...prev,
          sedeUUID: uuid,
          nomeSede: data.utente
        }))
      }
    }

    fetchNomeSede()
  }, [uuid])


  return (
    <>
    <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-bold mb-4 text-brand border border-brand rounded-lg py-2 px-4 w-fit">DASHBOARD</h1>
            <p className="border border-brand rounded-lg py-2 px-4 text-neutral-700 w-fit uppercase text-xs">sede: <strong>{form.nomeSede}</strong></p>
        </div>
        {/* DASHBOARD RIEPILOGO DEL MESE */}
        <div className="p-5 border bg-brand rounded-xl shadow-xl">
        <h3 className="mb-2">DASHBOARD {dataFormattata}</h3>
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
            <DASHboardElement nome="Fior di Latte" dato="5kg"/>
            <DASHboardElement nome="Pecorino" dato="5kg"/>
            <DASHboardElement nome="Ricotta" dato="5kg"/>
            <DASHboardElement nome="Provolone del Monaco" dato="5kg"/>
            <DASHboardElement nome="Provola" dato="5kg"/>


            <DASHboardElement nome="Mozzarella di Bufala" dato="5kg"/>
            <DASHboardElement nome="Stracciata di Bufala" dato="5kg"/>
            <DASHboardElement nome="Burrata di Bufala" dato="5kg"/>
            
            <DASHboardElement nome="Pomodoro" dato="20"/>

            <DASHboardElement nome="Olio" dato="1"/>

            <DASHboardElement nome="Pizza Box" dato="38"/>

            <DASHboardElement nome="Porta Posate" dato="1200"/>
        </div>
        </div>
    </div>
    </>
  )
}

function DASHboardElement ({nome, dato}) {
  return(
    <>
    <div className="border p-2 h-fit rounded-xl bg-neutral-100">
      <h4 className="text-brand-dark text-sm">
        {nome}
      </h4>
      <span>
        {dato}
      </span>
    </div>
    </>
  )
}