'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from '../../../../lib/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome  } from '@fortawesome/free-solid-svg-icons';
import { moduliGestionale } from '@/app/cosetting';

const iconaHome = <FontAwesomeIcon icon={faHome} className='max-h-[15px]'  />

export default function MenuSidebar () {

    const [user, setUser] = useState(null)
    const [userID, setUserID] = useState ("")
    const router = useRouter()

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

    const pathname = usePathname();

    // Modifica qui: isActive controlla se pathname inizia con 'path'
    const isActive = (path) => pathname?.startsWith(path);
    const isActiveHome = (path) => pathname == path;

    return (
        <ul className="flex flex-row md:flex-col gap-2">
        <li>
            <Link
            href={`/pizzeria`}
            title={`DSAHBOARD`}
            className={`flex items-center justify-center rounded-full p-2 md:h-[40px] md:w-[40px] h-[30px] w-[30px] transition duration-700 ${
                isActiveHome(`/pizzeria`) ? 'bg-brand text-neutral-100' : 'bg-neutral-100 text-brand hover:bg-brand hover:text-neutral-200'
            }`}
            >
            {iconaHome}
            </Link>
        </li>
        {moduliGestionale
            .filter(moduli => moduli.attivo === "true")
            .map(modulo => (
            <li key={modulo.name}>
                <Link
                href={`${modulo.link}/${userID}`}
                title={modulo.linkActive}
                className={`flex items-center justify-center rounded-full p-2 md:h-[40px] md:w-[40px] h-[30px] w-[30px] transition duration-700 ${
                    isActive(`/pizzeria/${modulo.linkActive}`) ? 'bg-brand text-neutral-100' : 'bg-neutral-100 text-brand hover:bg-brand hover:text-neutral-200'
                }`}
                >
                {modulo.icon}
                </Link>
            </li>
            ))
        }
        </ul>
    );
}
