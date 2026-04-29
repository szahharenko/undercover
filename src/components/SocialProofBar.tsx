import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { FaStar, FaGoogle } from 'react-icons/fa';
import { useGooglePlaceDetails } from '../hooks/useGooglePlaceDetails';

const SocialProofBar: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useGooglePlaceDetails();

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
            size={16}
          />
        ))}
      </div>
    );
  };

  if (loading || error || !data || data.reviews.length === 0) {
    return null;
  }

  const { rating: overallRating, totalRatings } = data;

  return (
    <motion.aside
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-cream border-b border-coffee/10 py-4"
      aria-label={t('social_proof.aria_label')}
    >
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-charcoal text-sm md:text-base">
        { overallRating && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{overallRating?.toFixed(1)}</span>
            <span className="flex" aria-hidden="true">
              {renderStars(overallRating)}
            </span>
          </div>
        )}
        <span className="text-charcoal/70">
          <Trans
            i18nKey="social_proof.summary"
            count={totalRatings ?? 0}
            values={{ count: totalRatings ?? 0 }}
            components={{ b: <strong className="text-charcoal" /> }}
          />
        </span>
        <a
          href="https://maps.app.goo.gl/siNDMNinPGBeVEV28"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-coffee hover:underline font-medium p-2"
        >
            <span className='inline px-2'><FaGoogle size={14} /></span>
            {t('social_proof.see_on_google')}
        </a>
      </div>
    </motion.aside>
  );
};

export default SocialProofBar;
