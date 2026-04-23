import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import undercover from '../assets/main-hero-2.jpg';
import { useRegistrationModal } from './registrationModalContext';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { openModal } = useRegistrationModal();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="main-hero relative bg-cream min-h-[70vh] flex items-center justify-center text-center p-8 overflow-hidden"
    >
      {/* Background elements for warm lighting and armchairs - implied via styling/color */}
      <div className="absolute w-full h-full z-1">
        <img
          src={undercover}
          alt="Undercover workspace"
          className="w-full h-full object-cover"
          // LCP element on the homepage — hint browsers to fetch ASAP
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="absolute w-full h-full z-2 opacity-50 bg-charcoal"/>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-4xl font-extrabold text-white mb-4"
        >
          {t('hero.title')}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.button
          onClick={() => openModal('hero')}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="px-8 py-3 bg-coffee text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300"
        >
          {t('book_a_visit')}
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HeroSection;