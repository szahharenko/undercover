# Performance & SEO — Round 1 Notes

Dated: 2026-04-23. Round 1 of the Perf + SEO bundle from DEV_PLAN.md.

## What shipped (code)

### Route-level code splitting
- `src/App.tsx` — converted every secondary page (`AboutUs`, `Pricing`, `BoardGames`, `Events`, `EventsAndTrainings`, `FacebookCampaign`) to `React.lazy()`. `Home` stays eager because it's the LCP target on first visit.
- Wrapped `<Routes>` in a `<Suspense fallback={...}>` with a small inline spinner so users see something while a route chunk fetches.

### Vendor chunk splitting (`vite.config.ts`)
- Added `manualChunks` so `react`, `react-router`, `react-i18next`, `framer-motion`, `react-icons`, and `@fullcalendar/*` ship as separate, cacheable vendor chunks. App-code changes will no longer bust the React bundle in users' browsers.

**Before / after gzip sizes for first-paint on `/`:**

| Chunk | Before | After |
|-------|--------|-------|
| `index.js` (app shell) | 163 kB | **23 kB** |
| `vendor-react` | — | 68 kB |
| `vendor-motion` | — | 38 kB |
| `vendor-i18n` | — | 25 kB |
| `vendor-router` | — | 13 kB |
| `vendor-icons` | — | 4 kB |
| **Total first paint** | **163 kB** | **~171 kB** |

Total bytes are roughly equal, but they're now cacheable per-vendor — the next deploy only invalidates `index.js` (~23 kB) instead of 500 kB of bundled code.

The big win: **FullCalendar (~76 kB gzip) no longer loads on the homepage.** It's now isolated to `/boardgames`, where it actually renders.

### LCP hints on hero images
- `HeroSection.tsx` (homepage), `HeroSectionAbout.tsx`, `HeroSectionPricing.tsx`, `HeroSectionBoardgames.tsx`, `HeroSectionEventsTrainings.tsx` — each hero `<img>` now has `fetchPriority="high"` + `decoding="async"` so the browser starts the LCP image fetch in parallel with JS parse.
- `Footer.tsx` — mascot images marked `loading="lazy"` and `decoding="async"` (they're below the fold on every page).
- `index.html` — added `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` so the font handshake starts earlier.

### Per-route SEO verified
- Static check across `public/locales/{en,et,ru}/translation.json`: every route has a unique, non-empty `seo.X.title` and `seo.X.description`. No duplicates in any locale.
- Every page calls `useSEO()` with the matching i18n keys.
- The `prerender.mjs` step uses `waitUntil: 'networkidle0'`, which means by the time Puppeteer captures HTML, i18n has loaded and `useSEO`'s `useEffect` has set the per-route `<title>` / `<meta description>` / canonical / hreflang. Each `dist/<route>/index.html` will have unique meta when re-prerendered.
- Footnote: `src/seoConfig.ts` exists with English fallback values but is not imported anywhere. It's harmless dead code today — consider deleting it or wiring it as a fallback in `useSEO` if you ever want non-i18n meta on the very first paint.

## What you still need to do (manual)

### 1. Re-export oversized images — biggest single perf win
There are **51 images over 500 KB in `src/assets/`, totalling ~102 MB on disk**. The worst offenders:

| Size | File | Notes |
|------|------|-------|
| 5.6 MB | `src/assets/coworking.png` | Should be JPG or WebP, not PNG |
| 3.4 MB | `src/assets/bgs-hero.png` | Hero image, should be < 300 KB WebP |
| 3.3 MB | `src/assets/pricing-hero.png` | Hero image, should be < 300 KB WebP |
| 3.0 MB | `src/assets/us-hero.png` | Hero image, should be < 300 KB WebP |
| 3.0 MB | `src/assets/office/of010.jpg` | Gallery, should be ~300 KB |
| 2.9 MB | `src/assets/office/of002.jpg` | Gallery, should be ~300 KB |
| 2.7 MB | `src/assets/main-hero-photo.jpg` | Hero, should be < 300 KB WebP |

Recommended targets:
- **Hero / above-the-fold images**: WebP, max ~250–400 KB, served at 1920×1080 max
- **Gallery / below-the-fold images**: WebP, max ~200–350 KB
- **Mascot / logo PNGs**: keep PNG but compress with `pngquant` or `oxipng`, target < 80 KB

Quickest path: open them in [Squoosh](https://squoosh.app), set output to WebP at quality ~75, save. Or run:

```bash
npx @squoosh/cli --webp '{"quality":75}' src/assets/office/*.jpg
```

A side-effect: the previous build flagged that on-disk sizes ballooned ~3× since git HEAD (e.g. `bg1.jpg` went from 645 KB to 1.9 MB). Worth checking whether your image source workflow accidentally re-exports at print resolution.

### 2. Run Lighthouse locally
This sandbox can't fetch Chrome to run Lighthouse, so you need to run it locally:

```bash
npm run build:seo          # builds + prerenders /dist
npx serve dist             # or `python -m http.server 8000 --directory dist`
# Then in Chrome DevTools → Lighthouse tab, audit http://localhost:5000 (or 8000)
```

What to expect once images are compressed:
- **Performance**: should rise from ~40s into ~85+ once heroes are < 400 KB WebP
- **Accessibility**: should already be 90+; check color contrast on cream/coffee text
- **Best Practices**: 95+; the Meta Pixel / GA scripts may flag CLS on console
- **SEO**: 100; meta is sound, sitemap is sound, hreflang is set

If anything below 80 after image fixes, share the report and I'll iterate.

### 3. Optional next polish (P3)
- Add `<link rel="preload" as="image" href="/assets/main-hero-2-...jpg">` to `index.html` for the homepage hero. (Tricky because the hashed filename changes each build — needs a Vite plugin or post-build script.)
- Add `vite-plugin-imagetools` so heroes get auto-resized + WebP-converted at build time. That way you don't have to remember to re-export.
- Move the Meta Pixel `<noscript><img>` out of the critical path — it's tiny but blocking until DOMContentLoaded.

## Verification
- `npx tsc -b` — clean
- `npx vite build` — clean, with the chunk sizes shown above
- Static SEO bundle check across en/et/ru — all titles/descriptions unique
