import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaTelegramPlane, FaFacebook, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";


import cat from '../assets/cat-left.png';
import dog from '../assets/dog-right.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-charcoal text-cream p-20"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="">
          <div className='flex items-center w-full justify-between max-w-[700px] mx-auto'>
            <img src={cat} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
            <div className='flex flex-col md:flex-row w-full items-center'>
              <div className='flex text-center flex-col p-2 w-full md:w-[50%]'>
                <h3 className="text-xl font-bold mb-4">{t('footer.social_title')}</h3>
                <div className="flex justify-center space-x-6">
                  <a href="https://www.facebook.com/undercovervibe" className="hover:text-sage-green transition-colors" aria-label="Facebook">
                    <FaFacebook size={28} />
                  </a>
                  <a href="https://www.instagram.com/undercovertallinn" className="hover:text-sage-green transition-colors" aria-label="Instagram">
                    <FaInstagram size={28} />
                  </a>
                  <a href="https://t.me/acrashik" className="hover:text-sage-green transition-colors" aria-label="Telegram">
                    <FaTelegramPlane size={28} />
                  </a>
                  <a href='https://wa.me/3725154369' className="hover:text-sage-green transition-colors" aria-label="WhatsApp">
                    <FaWhatsapp size={28} />
                  </a>
                  <a href="tel:+3725154369" className="hover:text-sage-green transition-colors" aria-label="Phone">
                    <FaPhone size={28} />
                  </a>
                  <a href="mailto:info@undercover.ee" className="hover:text-sage-green transition-colors" aria-label="Email">
                    <MdMailOutline size={28} />
                  </a>
                </div>
              </div>
              <div className='flex flex-col w-full md:w-[50%]'>
                <h3 className="text-xl font-bold mb-4">{t('footer.location_title')}</h3>
                <p><a href="https://maps.app.goo.gl/z4kknp2yiiwf39QJ8">Kivimurru tn 34 - 6, 11411 Tallinn</a></p>
                <p>Email: <a href="mailto:info@undercover.ee">info@undercover.ee</a></p>
                <p>Phone: <a href="tel:+3725154369">(+372) 51 54 369</a></p>
              </div>
            </div>
            <img src={dog} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
          </div>
        </div>

        <div className="pt-8 text-sm">
          &copy; {new Date().getFullYear()} Undercover Vibe. {t('footer.rights_reserved')}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
