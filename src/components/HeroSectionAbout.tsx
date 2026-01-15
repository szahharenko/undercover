import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import founders from '../assets/founders.jpg';

const HeroSectionAbout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-cream min-h-[70vh] flex items-center justify-center text-center p-8 overflow-hidden"
    >
      {/* Background elements for warm lighting and armchairs - implied via styling/color */}
      <div className="absolute w-full h-full z-1">
        <img src={founders} alt="Undercover workspace" className="w-full h-full object-cover" />
      </div>
      <div className="absolute w-full h-full z-2 opacity-50 bg-charcoal"/>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          {t('about_us_page.title')}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
        >
          {t('about_us_page.subtitle')}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroSectionAbout;