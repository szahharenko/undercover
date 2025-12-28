import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import coworking1 from '../assets/coworking-1.jpg';
import coworking2 from '../assets/coworking-2.jpg';
import boardGames1 from '../assets/board-games-1.jpg';
import boardGames2 from '../assets/board-games-2.jpg';
import coffeeShop1 from '../assets/coffee-shop-1.jpg';
import generic from '../assets/logo-undercover.jpg';

const AtmosphereGallery: React.FC = () => {
  const { t } = useTranslation();
  const images = [
    { src: coworking1, alt: t('atmosphere_gallery.images.coworking1') },
    { src: boardGames1, alt: t('atmosphere_gallery.images.boardGames1') },
    { src: coffeeShop1, alt: t('atmosphere_gallery.images.coffeeShop1') },
    { src: coworking2, alt: t('atmosphere_gallery.images.coworking2') },
    { src: boardGames2, alt: t('atmosphere_gallery.images.boardGames2') },
    { src: generic, alt: t('atmosphere_gallery.images.generic') },
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
