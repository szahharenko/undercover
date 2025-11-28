import React from 'react';
import { motion } from 'framer-motion';
import undercover from '../assets/coworking.png';

const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-cream min-h-[70vh] flex items-center justify-center text-center p-8 overflow-hidden"
    >
      {/* Background elements for warm lighting and armchairs - implied via styling/color */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream to-beige opacity-40">
        <img src={undercover} alt="Undercover workspace" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 pattern-dots opacity-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto" >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-charcoal leading-tight mb-4"
        >
          Where Focus Meets Comfort.
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-charcoal mb-8 max-w-2xl mx-auto"
        >
          A cozy workspace by day. A VIP board game club by night.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="px-8 py-3 bg-coffee text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Reserve Workspace
          </motion.button>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="px-8 py-3 border-2 border-coffee text-coffee rounded-2xl text-lg font-semibold hover:bg-coffee hover:text-cream transition-all duration-300"
          >
            Join the Club
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;