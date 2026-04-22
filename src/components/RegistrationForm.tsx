import React from 'react';
import RegistrationFormContent from './RegistrationFormContent';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import kivimurru from '../assets/kivimurru-house.jpg';
import { FaTelegramPlane, FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaLocationArrow } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

/**
 * Inline registration section for the homepage. Renders the same form/contact
 * content as the modal, wrapped in a section with the #registration-form anchor
 * for legacy in-page links and scroll behavior.
 */
const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="p-20 md:flex" id="registration-form">
      <RegistrationFormContent variant="inline" source="inline_section" />
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-12"
        >
          {t('form.contact_us')}
        </motion.h2>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-charcoal text-center"
        >
          <div>
            <a href="mailto:info@undercover.ee" className="text-coffee hover:underline ml-2">
               <MdMailOutline size={16} style={{display: 'inline'}} /> info@undercover.ee
            </a><br/>
            <a href="tel:+3725154369" className="text-coffee hover:underline ml-2">
              <FaPhone size={16} style={{display: 'inline'}} />+372 5154369
            </a>

          </div>
          <div className="mt-2">
          </div>
          <div>
            <a href="https://t.me/acrashik" className="text-coffee hover:underline ml-2"><FaTelegramPlane style={{display: 'inline'}} size={16} /> Telegram</a> |
            <a href="https://wa.me/3725154369" className="text-coffee hover:underline ml-2"><FaWhatsapp style={{display: 'inline'}} size={16} /> WhatsApp</a> |
            <a href="https://www.facebook.com/undercovervibe" className="text-coffee hover:underline ml-2"><FaFacebook style={{display: 'inline'}} size={16} /> Facebook</a>
            <a href="https://www.instagram.com/undercovertallinn" className="text-coffee hover:underline ml-2"><FaInstagram style={{display: 'inline'}} size={16} /> Instagram</a>
          </div>
          <br/>
          <div>
            <span className="ml-2"><FaLocationArrow style={{display: 'inline'}} size={16} /> Kivimurru 34 - 6, Tallinn, Estonia</span>
          </div>
          <img src={kivimurru} alt="Kivimurru Address" className="mx-auto my-4 rounded-lg" />

        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
