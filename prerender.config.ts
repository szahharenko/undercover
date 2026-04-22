/**
 * Pre-rendering configuration for Vite.
 *
 * This file configures vite-plugin-prerender to generate static HTML
 * for each route at build time. This is critical for SEO - without it,
 * search engine bots see an empty <div id="root"></div>.
 *
 * SETUP:
 *   npm install vite-plugin-prerender --save-dev
 *
 * Then update vite.config.ts to use this config (already done).
 */

export const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/pricing',
  '/boardgames',
  '/events',
  '/events-and-trainings',
  '/free-trial',
];
