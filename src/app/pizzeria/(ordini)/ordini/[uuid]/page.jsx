"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../../../../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function PAGEOrdini() {

    const [ordiniSede, setOrdiniSede] = useState([])
    const [ordiniPuliti, setOrdiniPuliti] = useState([])
    const [user, setUser] = useState(null)
    const { uuid } = useParams() // prende il parametro dinamico dalla route
    const router = useRouter()

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

    useEffect(() => {
        if (!user) return
        console.log("ciao",user)
        async function fetchOrdiniSede() {
        const { data, error } = await supabase
            .from("ordini2025")
            .select("*")
            .eq("sedeUUID", user.id)

        if (error) {
            console.error("Errore fetch:", error)
        } else if (data) {
            setOrdiniSede(data)
        }
        }

        fetchOrdiniSede()
    }, [user])

    useEffect(() => {
        const puliti = ordiniSede.map(ordine =>
        Object.fromEntries(
            Object.entries(ordine).filter(([_, value]) => value !== null)
        )
        )
        setOrdiniPuliti(puliti)
    }, [ordiniSede])

    return (
        <>
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col justify-start">
                <h1 className="text-2xl font-bold mb-4 text-brand border border-brand rounded-lg py-2 px-4 w-fit">DASHBOARD</h1>
                <p className="border border-brand rounded-lg py-2 px-4 text-neutral-700 w-fit uppercase text-xs">sede: <strong>{form.nomeSede}</strong></p>
            </div>
            {/* ELENCO ORDINI ORDINI */}
            <div className="flex flex-col gap-3 p-5 rounded-lg shadow-xl bg-brand/20">
            <div className="bg-brand w-full p-2 rounded-lg">
                <h3 className="text-neutral-100">ULTIMI 30 ORDINI</h3>
            </div>
            
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
            {[...ordiniPuliti]  // cloniamo l'array per non modificare lo stato originale
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 30)
                .map((ordine) => (
                <div key={ordine.uuid}>
                    <OrderCard 
                    codiceordine={ordine.uuid}
                    dataordine={ordine.created_at} 
                    tracking={ordine.tracking} 
                    fiordilatte={ordine.fiorDiLatte}
                    ricotta={ordine.ricotta}
                    provolonedelmonaco={ordine.provoloneDelMonaco}
                    pecorino={ordine.pecorino}
                    mozzarelladibufala={ordine.mozzarellaDiBufala}
                    stracciatadibufala={ordine.stracciataDiBufala}
                    burratadibufala={ordine.burrataDiBufala}
                    pizzabox={ordine.pizzaBox}
                    />
                </div>
            ))}
            </div>
            </div>
        </div>
        </>
    )
    }

function OrderCard ({codiceordine,dataordine,tracking,fiordilatte,pecorino,provolonedelmonaco, ricotta, stracciatadibufala, burratadibufala, mozzarelladibufala, olio, pizzabox, portaposate, pomodoro }) {
  return(
    <>
    <div className="border p-5 h-full rounded-xl bg-neutral-100">
      <div className="flex flex-col mb-2 gap-2">
        <h5 className="border border-brand rounded-xl w-fit px-2 py-1 text-brand text-xs">ORDINE: {codiceordine}</h5>
        <h5 className="border border-red-800 rounded-xl w-fit px-2 py-1 text-neutral-900 text-xs">DATA ORDINE: {new Date(dataordine).toLocaleDateString("it-IT")}</h5>
      </div>
      
      <ul className="border border-brand p-5 rounded-xl shadow-xl">
        {pomodoro ? <li className="text-sm"><font className="font-light">POMODORO:</font> {pomodoro}kg <hr className="my-1"/></li> : null}
        {mozzarelladibufala ? <li className="text-sm"><font className="font-light">MOZZARELLA DI BUFALA:</font> {mozzarelladibufala}kg <hr className="my-1"/></li> : null}
        {stracciatadibufala ? <li className="text-sm"><font className="font-light">STRACCIATA DI BUFALA:</font> {stracciatadibufala}kg <hr className="my-1"/></li> : null}
        {burratadibufala ? <li className="text-sm"><font className="font-light">BURRATA DI BUFALA:</font> {burratadibufala}kg <hr className="my-1"/></li> : null}
        {fiordilatte ? <li className="text-sm"><font className="font-light">FIOR DI LATTE:</font> {fiordilatte}kg <hr className="my-1"/></li> : null}
        {pecorino ? <li className="text-sm"><font className="font-light">PECORINO:</font> {pecorino}kg <hr className="my-1"/></li> : null}
        {provolonedelmonaco ? <li className="text-sm"><font className="font-light">PROVOLONE DEL MONACO:</font> {provolonedelmonaco}kg <hr className="my-1"/></li> : null}
        {ricotta ? <li className="text-sm"><font className="font-light">RICOTTA:</font> {provolonedelmonaco}kg <hr className="my-1"/></li> : null}
        {olio ? <li className="text-sm"><font className="font-light">OLIO:</font> {olio}kg <hr className="my-1"/></li> : null}
        {pizzabox ? <li className="text-sm"><font className="font-light">PIZZA BOX:</font> {pizzabox}kg <hr className="my-1"/></li> : null}
        {portaposate ? <li className="text-sm"><font className="font-light">PORTA POSATE:</font> {portaposate}kg <hr className="my-1"/></li> : null}
      </ul>
      <div className="flex justify-center items-center bg-brand mt-2 rounded-xl ">
        {tracking ? <span className="text-neutral-100 py-2 text-xs"><Link href={`https://www.poste.it/cerca/#/risultati-spedizioni/${tracking}`}>EVASO: {tracking}</Link></span> : null}
      </div>
    </div>
    </>
  )
}