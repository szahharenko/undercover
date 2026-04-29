import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadPlaceDetails, type PlaceDetails } from '../servises/googlePlaces';

interface State {
  data: PlaceDetails | null;
  loading: boolean;
  error: string | null;
}

/**
 * Shared React hook that returns Google Place details for the configured
 * PLACE_ID. Backed by a module-level cache, so any number of components can
 * call it on the same page without re-initializing the SDK or re-fetching.
 */
export function useGooglePlaceDetails(): State {
  const { i18n } = useTranslation();
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => (s.data ? s : { ...s, loading: true, error: null }));

    loadPlaceDetails(i18n.language)
      .then((data) => {
        if (cancelled) return;
        setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        console.error('Google Places loader error:', err);
        setState({ data: null, loading: false, error: err.message || 'Failed to load reviews' });
      });

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  return state;
}
