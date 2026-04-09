import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BASE_URL = 'https://undercover.ee';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/** Supported languages for hreflang tags */
const LANGUAGES = ['en', 'et', 'ru'] as const;

/**
 * Lightweight SEO hook — sets document title, meta tags, canonical, and hreflang per page.
 * Works with pre-rendering since tags are set during SSG build.
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

    // Helper to set/create link tags
    const setLink = (rel: string, _key: string, href: string, extraAttrs?: Record<string, string>) => {
      const selector = extraAttrs
        ? `link[rel="${rel}"][${Object.entries(extraAttrs).map(([k, v]) => `${k}="${v}"`).join('][')}]`
        : `link[rel="${rel}"]`;
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (extraAttrs) {
          Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
        }
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
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
    setLink('canonical', 'canonical', canonicalUrl);

    // Hreflang tags — tell search engines about language versions
    for (const lang of LANGUAGES) {
      const langUrl = `${canonicalUrl}${path === '/' ? '' : ''}?lng=${lang}`;
      setLink('alternate', `hreflang-${lang}`, langUrl, { hreflang: lang });
    }
    // x-default hreflang (points to the base URL without language param)
    setLink('alternate', 'hreflang-x-default', canonicalUrl, { hreflang: 'x-default' });

  }, [title, description, path, ogImage]);
}
