import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { FaStar, FaMapMarkedAlt } from 'react-icons/fa';

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

const GoogleReviews: React.FC = () => {
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

  if (loading) {
    return (
      <section className="p-20 bg-neutral-100">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return null; // Or show a fallback message
  }

  return (
    <section className="p-20 bg-neutral-100">
      <div id="map" ref={mapRef} style={{ display: 'none' }}></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-charcoal mb-4"
          >
            {t('reviews.title', 'What Our Community Says')}
          </motion.h2>
          {overallRating && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">{overallRating}</span>
                {renderStars(overallRating)}
              </div>
              <div className="text-charcoal/60 text-sm">
                {t('reviews.based_on', 'Based on {{count}} Google reviews', { count: totalRatings || 0 })}
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center mb-6">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-charcoal truncate">{review.author_name}</h4>
                  <div className="text-charcoal/40 text-xs">{review.relative_time_description}</div>
                </div>
                <a
                  href={review.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-xs"
                >
                    <FaMapMarkedAlt size={28} />
                </a>
              </div>
              <div className="mb-4">
                {renderStars(review.rating)}
              </div>
              <div className="text-charcoal/80 text-sm italic line-clamp-6 flex-grow">
                "{review.text}"
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col md:flex-row justify-center gap-4">
          <a
            href={`https://maps.app.goo.gl/siNDMNinPGBeVEV28`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-charcoal text-cream rounded-full font-bold hover:bg-charcoal/90 transition-colors"
          >
            {t('reviews.view_all', 'Read More Reviews on Google')}
          </a>
          <a
            href={`https://search.google.com/local/writereview?placeid=${PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-charcoal text-charcoal rounded-full font-bold hover:bg-charcoal hover:text-cream transition-colors"
          >
            {t('reviews.leave_review', 'Leave a Review')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
