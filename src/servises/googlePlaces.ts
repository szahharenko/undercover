import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

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

export interface PlaceDetails {
  reviews: Review[];
  rating: number | null;
  totalRatings: number | null;
  name?: string;
  url?: string;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

// Cache reviews in localStorage and refresh them every 4 hours.
// If the API fails, we fall back to whatever we previously cached, even if it's
// older than the TTL — better to show slightly stale reviews than nothing.
const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
const CACHE_VERSION = 1;
const CACHE_KEY_PREFIX = 'undercover.googlePlaces.v' + CACHE_VERSION + '.';

interface StoredEntry {
  timestamp: number;
  data: PlaceDetails;
}

function cacheKey(language: string): string {
  return `${CACHE_KEY_PREFIX}${PLACE_ID}.${language}`;
}

function readStoredCache(language: string): StoredEntry | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(cacheKey(language));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredEntry;
    if (!parsed || typeof parsed.timestamp !== 'number' || !parsed.data) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredCache(language: string, data: PlaceDetails): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const entry: StoredEntry = { timestamp: Date.now(), data };
    window.localStorage.setItem(cacheKey(language), JSON.stringify(entry));
  } catch {
    // Quota exceeded / private mode — ignore, in-memory cache still works.
  }
}

function isFresh(entry: StoredEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL_MS;
}

// Module-level singletons. The loader can only be configured once per page,
// and we want to share the resulting Place details between every consumer
// (SocialProofBar, GoogleReviews, ...).
let optionsSet = false;
let serviceContainer: HTMLDivElement | null = null;
const cache = new Map<string, Promise<PlaceDetails>>();

function ensureContainer(): HTMLDivElement {
  if (!serviceContainer) {
    serviceContainer = document.createElement('div');
    serviceContainer.style.display = 'none';
    serviceContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(serviceContainer);
  }
  return serviceContainer;
}

function fetchFromApi(language: string): Promise<PlaceDetails> {
  return (async () => {
    if (!optionsSet) {
      setOptions({
        key: GOOGLE_MAPS_API_KEY,
        v: 'weekly',
        language,
      });
      optionsSet = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const places: any = await importLibrary('places');
    const container = ensureContainer();
    const service = new places.PlacesService(container);

    return new Promise<PlaceDetails>((resolve, reject) => {
      service.getDetails(
        {
          placeId: PLACE_ID,
          fields: ['reviews', 'rating', 'user_ratings_total', 'name', 'url'],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (place: any, status: any) => {
          if (status === 'OK' && place) {
            resolve({
              reviews: (place.reviews ?? []) as Review[],
              rating: place.rating ?? null,
              totalRatings: place.user_ratings_total ?? null,
              name: place.name,
              url: place.url,
            });
          } else {
            reject(new Error(`Google Places Service Error: ${status}`));
          }
        }
      );
    });
  })();
}

/**
 * Load Google Places details for the configured PLACE_ID.
 *
 * Caching strategy:
 *  - In-memory promise cache per language for the lifetime of the page.
 *  - localStorage cache with a 4-hour TTL. Fresh entries skip the API entirely.
 *  - If the API fails, we fall back to the localStorage entry even if it's
 *    expired — stale reviews beat no reviews.
 *
 * The Google Maps JS SDK is initialized at most once per page.
 */
export function loadPlaceDetails(language: string): Promise<PlaceDetails> {
  const inMemory = cache.get(language);
  if (inMemory) return inMemory;

  const stored = readStoredCache(language);

  // Fresh localStorage hit — no need to touch the API at all.
  if (stored && isFresh(stored)) {
    const promise = Promise.resolve(stored.data);
    cache.set(language, promise);
    return promise;
  }

  // Stale or no localStorage — go to the API, fall back to stale on failure.
  const promise = fetchFromApi(language)
    .then((data) => {
      writeStoredCache(language, data);
      return data;
    })
    .catch((err: Error) => {
      if (stored) {
        console.warn('Google Places fetch failed, serving stale cache:', err);
        return stored.data;
      }
      throw err;
    });

  // If we end up rejecting (no fallback available), drop the entry so the next
  // mount can retry instead of being stuck on a failed promise.
  promise.catch(() => cache.delete(language));
  cache.set(language, promise);
  return promise;
}
