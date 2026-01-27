import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import of1 from '../assets/bg1.jpg';
import of2 from '../assets/bg2.jpg';
import of3 from '../assets/bg3.jpg';
import of4 from '../assets/bg4.jpg';
import of5 from '../assets/bg5.jpg';

const BgsGallery: React.FC = () => {
  const { t } = useTranslation();
  const images = [
    { src: of1, alt: t('atmosphere_gallery.images.boardGames1') },
    { src: of2, alt: t('atmosphere_gallery.images.boardGames1') },
    { src: of3, alt: t('atmosphere_gallery.images.boardGames1') },
    { src: of4, alt: t('atmosphere_gallery.images.boardGames1') },
    { src: of5, alt: t('atmosphere_gallery.images.boardGames1') }
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
          {t('bgs_gallery.title')}
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-xl text-charcoal/80 max-w-3xl mx-auto mb-16"
        >
          {t('bgs_gallery.description')}
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

export default BgsGallery;
