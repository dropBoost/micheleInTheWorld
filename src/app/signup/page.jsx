"use client"

import { useState } from "react"
import { supabase } from "../../../lib/supabaseClient"

export default function SignUpPage() {
  const [utente, setUtente] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignUp(e) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) return alert(error.message)

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        utente,
        password,
        email,
      })
    }

    alert("Registrazione completata! Controlla la tua email.")
  }

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-3 max-w-sm mx-auto mt-10">
      <input type="text" placeholder="Nome utente" value={utente} onChange={e => setUtente(e.target.value)} className="border p-2 rounded"/>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 rounded"/>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Registrati</button>
    </form>
  )
}
