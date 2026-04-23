import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import heroBg from '../assets/coworking.jpg'; // Using coworking image for trainings/events

const HeroSectionEventsTrainings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="main-hero relative bg-cream min-h-[60vh] flex items-center justify-center text-center p-8 overflow-hidden hero-section"
    >
      <div className="absolute w-full h-full z-1">
        <img src={heroBg} alt="Events and Trainings" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute w-full h-full z-2 opacity-50 bg-charcoal"/>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-4xl font-extrabold text-white mb-4"
        >
          {t('events_trainings_page.title')}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
        >
          {t('events_trainings_page.subtitle')}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroSectionEventsTrainings;
