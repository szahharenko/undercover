import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Dynamically import all images from the games folder
const imagesGlob = import.meta.glob('../assets/games/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const imageList = Object.values(imagesGlob) as string[];

const BgsGallery: React.FC = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % imageList.length));
  }, []);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + imageList.length) % imageList.length));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal mb-4"
        >
          {t('bgs_gallery.title')}
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-xl text-charcoal/80 max-w-3xl mx-auto mb-12"
        >
          {t('bgs_gallery.description')}
        </motion.p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageList.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="cursor-pointer overflow-hidden rounded-lg shadow-md aspect-square relative group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`Board game ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-120"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
              onClick={closeLightbox}
            >
              <X size={40} />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={40} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={40} />
            </button>

            {/* Main Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-[90vh] overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <img
                src={imageList[selectedIndex]}
                alt={`Board game ${selectedIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              />
            </motion.div>

            {/* Image Counter */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {imageList.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BgsGallery;
