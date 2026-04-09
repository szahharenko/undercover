import React from 'react';
import { motion } from 'framer-motion';
import RegistrationForm from '../components/RegistrationForm';
import logo from '../assets/logo-undercover.png';
import heroImg from '../assets/main-hero-2.jpg';
import GalleryByFolder from '../components/GalleryByFolder';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';

const perks = [
  { icon: '🖥️', label: 'Full workspace access' },
  { icon: '☕', label: 'Free specialty coffee' },
  { icon: '⚡', label: 'Blazing fast Wi-Fi' },
  { icon: '🎲', label: '1,000+ board games in the evening' },
];

const FacebookCampaign: React.FC = () => {
  const mainImagesGlob = import.meta.glob(`../assets/office/*.{jpg,jpeg,png,webp}`, { eager: true, import: 'default' });
  const thumbsGlob = import.meta.glob(`../assets/office/thumbs/*.{jpg,jpeg,png,webp}`, { eager: true, import: 'default' });
  const { t } = useTranslation();
  useSEO({ title: t('seo.freeTrial.title'), description: t('seo.freeTrial.description'), path: '/free-trial' });

  return <div className="min-h-screen bg-cream font-sans">

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
      <img src={heroImg} alt="Undercover Vibe" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <motion.img
          src={logo} alt="Undercover Vibe"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-14 mx-auto mb-7 drop-shadow-lg"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4"
        >
          Work in Peace.<br />
          <span className="text-[#d4af37]">Play Like a Pro.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-lg text-white/80 mb-8"
        >
          Tallinn's coziest coworking + board game club. Try it <strong className="text-white">completely free</strong>.
        </motion.p>

        {/* Perks strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {perks.map(p => (
            <span key={p.label} className="bg-white/15 backdrop-blur text-white text-sm px-4 py-1.5 rounded-full">
              {p.icon} {p.label}
            </span>
          ))}
        </motion.div>

        <motion.a
          href="#register"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="inline-block px-10 py-4 bg-coffee text-cream rounded-2xl text-xl font-bold shadow-2xl hover:bg-opacity-90 transition-all"
        >
          Tule proovima!
        </motion.a>

      </div>
    </section>
    <GalleryByFolder mainImagesGlob={mainImagesGlob} thumbsGlob={thumbsGlob} title={t('atmosphere_gallery.title')} description={t('atmosphere_gallery.description')} />
    {/* REGISTRATION FORM */}
    <div id="register" className="bg-white">
      <RegistrationForm />
    </div>

    {/* MINIMAL FOOTER */}
    <footer className="bg-charcoal py-8 px-6 text-center">
      <img src={logo} alt="Undercover Vibe" className="h-9 mx-auto mb-3 opacity-70" />
      <p className="text-cream/40 text-sm">Kivimurru 34 – 6, Tallinn, Estonia</p>
      <p className="text-cream/25 text-xs mt-4">© {new Date().getFullYear()} Undercover Vibe</p>
    </footer>
  </div>
};

export default FacebookCampaign;
