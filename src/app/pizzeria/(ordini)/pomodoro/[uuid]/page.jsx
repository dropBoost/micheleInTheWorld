"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../../../../lib/supabaseClient"

export default function PAGEordinibufala() {

  const { uuid } = useParams() // prende il parametro dinamico dalla route

  const [form, setForm] = useState({
    pomodoro: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Converte i valori numerici, mantiene UUID e nomeSede
    const payload = { ...form }
    Object.keys(payload).forEach((key) => {
      if (!["sedeUUID", "nomeSede"].includes(key)) {
        payload[key] = payload[key] === "" ? null : Number(payload[key])
      }
    })

    const { error } = await supabase.from("ordini2025").insert([payload])

    if (error) {
      alert("Errore: " + error.message)
    } else {
      alert("Ordine inserito con successo!")
      setForm(prev => ({
        ...prev,
        pomodoro: "",
      }))
    }

    setLoading(false)
  }

  function CampoOrdine({ name, label, type }) {
    return (
      <div key={name} className="flex flex-col">
        <label htmlFor={name} className="font-normal mb-1">{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder="0"
          min={0}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    )
  }

  return (
    <>
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-4 text-brand border border-brand rounded-lg py-2 px-4 w-fit">ORDINE POMODORO</h1>
        <p className="border border-brand rounded-lg py-2 px-4 text-neutral-700 w-fit uppercase text-xs">sede: <strong>{form.nomeSede}</strong></p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 p-6 max-w-xl  bg-white border border-brand/70 rounded-lg sha"
      >
        <CampoOrdine name="pomodoro" label="Pomodoro" type="number"/>

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-brand/50 text-white py-2 rounded hover:bg-brand"
        >
          {loading ? "Caricamento..." : "Inserisci Ordine"}
        </button>
      </form>
    </div>  
    </>
  )
}
