import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { FaStar, FaGoogle } from 'react-icons/fa';

/**
 * Compact social-proof bar that sits directly under the hero on the homepage.
 *
 * The numbers are hardcoded (5.0 / 12 reviews) on purpose: this needs to render
 * server-side at prerender time so search engines see the social proof without
 * waiting on a client-side Google Places API call. Update these when the
 * underlying Google review count materially changes.
 *
 * The full review carousel (with live data) still loads further down via
 * GoogleReviews — this is just the above-the-fold trust badge.
 */
const SocialProofBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.aside
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-cream border-b border-coffee/10 py-4"
      aria-label={t('social_proof.aria_label')}
    >
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-charcoal text-sm md:text-base">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">5.0</span>
          <span className="flex" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <FaStar key={i} className="text-yellow-500" size={16} />
            ))}
          </span>
        </div>
        <span className="text-charcoal/70">
          <Trans
            i18nKey="social_proof.summary"
            components={{ b: <strong className="text-charcoal" /> }}
          />
        </span>
        <a
          href="https://maps.app.goo.gl/siNDMNinPGBeVEV28"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-coffee hover:underline font-medium"
        >
          <FaGoogle size={14} />
          {t('social_proof.see_on_google')}
        </a>
      </div>
    </motion.aside>
  );
};

export default SocialProofBar;
