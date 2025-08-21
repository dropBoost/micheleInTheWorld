import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faSquarePhone, faGauge, faUsers, faAddressBook, faFolder, faFileContract, faCar, faCalendarDays, faCarOn, faMoneyCheckDollar, faCow, faDroplet, faLeaf, faBottleDroplet, faBoxesStacked, faUtensils, faPizzaSlice, faListCheck } from '@fortawesome/free-solid-svg-icons'

const ICONfacebook = <FontAwesomeIcon icon={faFacebook}/>
const ICONwhatsApp = <FontAwesomeIcon icon={faWhatsapp}/>
const ICONtikTok = <FontAwesomeIcon icon={faTiktok}/>
const ICONinstagram = <FontAwesomeIcon icon={faInstagram}/>
const ICONtel = <FontAwesomeIcon icon={faSquarePhone}/>
const ICONemail = <FontAwesomeIcon icon={faEnvelope}/>

const ICONcow = <FontAwesomeIcon icon={faCow}/>
const ICONmilk = <FontAwesomeIcon icon={faDroplet}/>
const ICONtomato = <FontAwesomeIcon icon={faLeaf}/>
const ICONoil = <FontAwesomeIcon icon={faBottleDroplet}/>
const ICONpizzabox = <FontAwesomeIcon icon={faBoxesStacked}/>
const ICONutensils = <FontAwesomeIcon icon={faUtensils}/>
const ICONpizza = <FontAwesomeIcon icon={faPizzaSlice}/>
const ICONorder = <FontAwesomeIcon icon={faListCheck}/>

// PERSONALIZZAZIONI

export const companyName = "BROCAR2"
export const logoDark = "/logoDark.png"
export const logoLight = "/logoWhite.png"
export const logoFullDark = "/logoDark.png"
export const logoFullLight = "/logoWhite.png"
export const logoExtendedDark = "/logoExtendedDark.png"
export const logoExtendedLight = "/logoExtendedWhite.png"
export const logoExtendedFullDark = "/logoExtendedFullDark.png"
export const logoExtendedFullLight = "/logoExtendedFullWhite.png"
export const colorBrand = "#004082"
export const colorDark = "#272726"
export const whatsAppContactLink = "#"
export const emailContact = "info@brocar2.it"

export const socialLink = [
    {name:'whatsApp',link:'https://www.whatsapp.com',icon: ICONwhatsApp, info:"+39 366 35 85 395",attivoWeb:"true"},
    {name:'facebook',link:'fasc',icon: ICONfacebook, info:"@facebbok",attivoWeb:"true"},
    {name:'instagram',link:'#',icon: ICONinstagram, info:"@instagram",attivoWeb:"true"},
    {name:'tiktok',link:'#',icon: ICONtikTok, info:"@tiktok",attivoWeb:"true"},
    {name:'email',link:'#',icon: ICONemail, info:"info@email.it",attivoWeb:"true"},
    {name:'tel',link:'dsda',icon: ICONtel, info:"+39 366 35 85 395",attivoWeb:"true"},
  ]

export const moduliGestionale = [
    {name:'dashboard', link:'/pizzeria/dashboard', linkActive:'dashboard', icon: ICONpizza, label:'dashboard', attivo:'true'},
    {name:'ordini', link:'/pizzeria/ordini', linkActive:'ordini', icon: ICONorder, label:'ordini', attivo:'true'},
    {name:'bufala', link:'/pizzeria/bufala', linkActive:'bufala', icon: ICONcow, label:'ordini bufala', attivo:'true'},
    {name:'latticini', link:'/pizzeria/latticini', linkActive:'latticini', icon:ICONmilk, label:'latticini', attivo:'true'},
    {name:'pomodoro', link:'/pizzeria/pomodoro', linkActive:'pomodoro', icon: ICONtomato, label:'pomodoro', attivo:'true'},
    {name:'olio', link:'/pizzeria/olio',  linkActive:'olio', icon:ICONoil, label:'olio', attivo:'true'},
    {name:'pizzabox', link:'/pizzeria/pizzabox', linkActive:'pizzabox', icon: ICONpizzabox, label:'pizza box', attivo:'true'},
    {name:'portaposate', link:'/pizzeria/portaposate', linkActive:'portaposate', icon: ICONutensils, label:'porta posate', attivo:'true'},
  ]