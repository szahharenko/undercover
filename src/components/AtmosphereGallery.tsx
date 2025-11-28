import React from 'react';
import { motion } from 'framer-motion';

const AtmosphereGallery: React.FC = () => {
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
          An Ambiance Crafted for You
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-xl text-charcoal/80 max-w-3xl mx-auto mb-16"
        >
          Step into a space where thoughtful design meets ultimate comfort. Our interiors blend warm wood tones,
          soft ambient lighting, and plush furnishings to create an inviting atmosphere that feels both productive and deeply relaxing.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
              className="bg-beige h-64 rounded-2xl shadow-md flex items-center justify-center text-charcoal/50 text-xl font-semibold"
            >
              Image Placeholder {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtmosphereGallery;
