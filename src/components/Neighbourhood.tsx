import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { FaMapMarkedAlt } from 'react-icons/fa';

const MAP_URL = 'https://maps.app.goo.gl/siNDMNinPGBeVEV28';

const Neighbourhood: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-cream" aria-label={t('neighbourhood.aria_label')}>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-10"
        >
          {t('neighbourhood.title')}
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-lg leading-relaxed text-charcoal/85"
        >
          <p>
            <Trans
              i18nKey="neighbourhood.paragraph_one"
              components={{ b: <strong className="text-charcoal" /> }}
            />
          </p>
          <p>
            <Trans
              i18nKey="neighbourhood.paragraph_two"
              components={{ b: <strong className="text-charcoal" /> }}
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-coffee text-coffee font-medium hover:bg-coffee hover:text-cream transition-colors"
          >
            <FaMapMarkedAlt size={18} />
            {t('neighbourhood.view_on_map')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Neighbourhood;
