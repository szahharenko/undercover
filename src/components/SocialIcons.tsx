import { FaTelegramPlane, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const SocialIcons: React.FC = () => {
  return (<>
        <a href="https://www.instagram.com/undercovertallinn" className="hover:text-sage-green transition-colors" aria-label="Instagram">
            <FaInstagram size={28} />
        </a>
        <a href="https://t.me/acrashik" className="hover:text-sage-green transition-colors" aria-label="Telegram">
            <FaTelegramPlane size={28} />
        </a>
        <a href='https://wa.me/3725154369' className="hover:text-sage-green transition-colors" aria-label="WhatsApp">
            <FaWhatsapp size={28} />
        </a>
        <a href="https://www.facebook.com/undercovervibe" className="hover:text-sage-green transition-colors" aria-label="Facebook">
            <FaFacebook size={28} />
        </a>
    </>)
}