import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BASE_URL = 'https://undercover.ee';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Lightweight SEO hook — sets document title and meta tags per page.
 * Works with pre-rendering (vite-ssg) since tags are set during SSG build.
 */
export function useSEO({ title, description, path, ogImage }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes('Undercover') ? title : `${title} — Undercover Vibe`;
    const canonicalUrl = `${BASE_URL}${path}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    // Title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', description);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Undercover Vibe');

    // Twitter Card
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [title, description, path, ogImage]);
}
