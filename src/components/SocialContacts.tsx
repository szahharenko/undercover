import { FaPhone } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";


export const SocialContacts: React.FC = () => {
  return (<>
        <p><a href="https://maps.app.goo.gl/z4kknp2yiiwf39QJ8">Kivimurru tn 34 - 6, 11411 Tallinn</a></p>
        <p><MdMailOutline style={{display: 'inline'}} size={16}  /> <a href="mailto:info@undercover.ee">info@undercover.ee</a></p>
        <p><FaPhone style={{display: 'inline'}} size={16} /> <a href="tel:+3725154369">(+372) 51 54 369</a></p>
    </>)
}