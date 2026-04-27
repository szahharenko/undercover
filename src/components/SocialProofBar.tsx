import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { FaStar, FaGoogle } from 'react-icons/fa';
import type { Review } from './Review';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';

const SocialProofBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number | null>(null);

  const mapDiv = document.createElement('div');
  document.body.appendChild(mapDiv);
  const mapRef = useRef<HTMLDivElement>(mapDiv);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

  useEffect(() => {
    setOptions({
      key: GOOGLE_MAPS_API_KEY,
      v: 'weekly',
      language: i18n.language,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importLibrary('places').then(async (places: any) => {
      if (!mapRef.current) return;

      const service = new places.PlacesService(mapRef.current);
      await service.getDetails(
        {
          placeId: PLACE_ID,
          fields: ['reviews', 'rating', 'user_ratings_total', 'name', 'url'],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (place: any, status: any) => {
          // Access PlacesServiceStatus from the places library or global google.maps if available
          // Since we use the library, we can check status string
          if (status === 'OK' && place) {
            if (place.reviews) {
              setReviews(place.reviews as Review[]);
            }
            if (place.rating) setOverallRating(place.rating);
            if (place.user_ratings_total) setTotalRatings(place.user_ratings_total);
            setLoading(false);
          } else {
            console.error('Google Places Service Error:', status);
            setError('Failed to load reviews');
            setLoading(false);
          }
        }
      );
    }).catch((err: Error) => {
      console.error('Loader Error:', err);
      setError('Failed to load Google Maps SDK');
      setLoading(false);
    });
  }, [i18n.language]);

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

  if (loading || error || reviews.length === 0) {
    return null;
  }

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
