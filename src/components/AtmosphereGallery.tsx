import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import g6 from '../assets/g6.jpg';

const AtmosphereGallery: React.FC = () => {
  const { t } = useTranslation();
  const images = [
    { src: g1, alt: t('atmosphere_gallery.images.coworking1') },
    { src: g2, alt: t('atmosphere_gallery.images.boardGames1') },
    { src: g3, alt: t('atmosphere_gallery.images.coffeeShop1') },
    { src: g4, alt: t('atmosphere_gallery.images.coworking2') },
    { src: g5, alt: t('atmosphere_gallery.images.boardGames2') },
    { src: g6, alt: t('atmosphere_gallery.images.generic') },
  ];

  return (
    <section className="p-20 bg-cream">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal mb-12"
        >
          {t('atmosphere_gallery.title')}
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-xl text-charcoal/80 max-w-3xl mx-auto mb-16"
        >
          {t('atmosphere_gallery.description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-80 rounded-2xl shadow-md overflow-hidden"
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtmosphereGallery;
