"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DashboardUuidPage() {
  const { uuid } = useParams() // prende il parametro dinamico dalla route

  const router = useRouter()
  
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        // non loggato → redirect a login (/)
        router.push("/")
      } else {
        // loggato → salva l'utente nello stato
        console.log("ciao", data.session.user)
      }
    }

    getUser()
  }, [router])

  const [form, setForm] = useState({
    fiorDiLatte: "",
    pecorino: "",
    ricotta: "",
    mozzarellaDiBufala: "",
    provoloneDelMonaco: "",
    provola: "",
    pomodoro: "",
    olio: "",
    pizzaBox: "",
    portaPosate: "",
    sedeUUID: "",
    nomeSede: "",
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
        fiorDiLatte: "",
        pecorino: "",
        ricotta: "",
        mozzarellaDiBufala: "",
        provoloneDelMonaco: "",
        provola: "",
        pomodoro: "",
        olio: "",
        pizzaBox: "",
        portaPosate: "",
      }))
    }

    setLoading(false)
  }

  function CampoOrdine({ name, label, type }) {
    return (
      <div key={name} className="flex flex-col">
        <label htmlFor={name} className="font-medium mb-1">{label}</label>
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
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Pagina dinamica Dashboard</h1>
        <p>
          L'UUID passato nella route è:{" "}
          <span className="font-mono text-blue-600">{uuid}</span>
        </p>
        <p>Nome sede: <strong>{form.nomeSede}</strong></p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-w-3xl mx-auto bg-white"
      >
        <CampoOrdine name="fiorDiLatte" label="Fior di Latte" type="number"/>
        <CampoOrdine name="pecorino" label="Pecorino" type="number"/>
        <CampoOrdine name="ricotta" label="Ricotta" type="number"/>
        <CampoOrdine name="mozzarellaDiBufala" label="Mozzarella di Bufala" type="number"/>
        <CampoOrdine name="provoloneDelMonaco" label="Provolone del Monaco" type="number"/>
        <CampoOrdine name="provola" label="Provola" type="number"/>
        <CampoOrdine name="pomodoro" label="Pomodoro" type="number"/>
        <CampoOrdine name="olio" label="Olio" type="number"/>
        <CampoOrdine name="pizzaBox" label="Pizza Box" type="number"/>
        <CampoOrdine name="portaPosate" label="Porta Posate" type="number"/>
        <CampoOrdine name="dataOrdine" label="Data Ordine" type="date"/>

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Caricamento..." : "Invia Ordine"}
        </button>
      </form>
    </>
  )
}
