'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from '../../../../lib/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome  } from '@fortawesome/free-solid-svg-icons';
import { moduliGestionale } from '@/app/cosetting';

export default function MENUhomepage () {

    const [userID, setUserID] = useState ("")
    const router = useRouter()
    const pathname = usePathname();
    const isActive = (path) => pathname?.startsWith(path);

    //VERIFICA UTENTE LOGGATO
    useEffect(() => {
    async function getUser() {
        const { data } = await supabase.auth.getSession()

        if (!data.session) {
        // non loggato → redirect a login (/)
        router.push("/")
        } else {
        // loggato → salva l'utente nello stato
        setUser(data.session.user)
        setUserID(data.session.user.id)
        }
    }

    getUser()
    }, [router])


    return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-5 overflow-auto h-full auto-rows-[200px]">
    {moduliGestionale
        .filter(moduli => moduli.attivo === "true")
        .map((modulo, index) => (
        <Link
            key={index}
            href={`${modulo.link}/${userID}`}
            className={`flex flex-col items-center justify-center rounded-[1.5rem] p-4 w-full aspect-square h-full transition duration-700 ${
            isActive(`/pizzeria/${modulo.linkActive}`)
                ? 'bg-brand'
                : 'bg-white text-brand hover:bg-brand hover:text-neutral-200 shadow-lg'
            }`}
        >
            <span className='text-[60px]'>{modulo.icon}</span>
            <span className='mt-3 text-sm uppercase text-center break-words'>{modulo.label}</span>
        </Link>
    ))}
    </div>
    );
}