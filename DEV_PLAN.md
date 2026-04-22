# Undercover.ee - Dev Plan: SEO & Technical Visibility Fix

## Диагноз

Сайт undercover.ee - это чистый **Vite + React SPA** (Single Page Application). Сервер отдаёт пустой HTML с единственным `<div id="root"></div>`, а весь контент рендерится на клиенте через JavaScript. Поисковые боты (Google, Bing) видят пустую страницу → сайт не индексируется → органический трафик = 0.

**Текущий стек:** React 19 + Vite 7 + React Router 7 + Tailwind 4 + i18next (EN/ET/RU)

---

## Фаза 1 - Критические фиксы (1–2 дня)

> Цель: сделать так, чтобы поисковики увидели контент на каждой странице.

### 1.1 Добавить Pre-rendering (SSG) через vite-plugin-ssr или vite-ssg

**Почему не полный SSR:** Переход на Next.js или Remix - это переписывание проекта. Для сайта-визитки с 7 страницами **pre-rendering (SSG)** - оптимальное решение: минимум изменений, максимум эффекта.

**Что делать:**
- Установить `vite-ssg` (или альтернативу `vite-plugin-prerender`)
- Сконфигурировать список маршрутов для пре-рендеринга: `/`, `/about`, `/pricing`, `/boardgames`, `/events`, `/events-and-trainings`, `/free-trial`
- На выходе `vite build` будет генерировать **готовый HTML с контентом** для каждого маршрута
- Поисковые боты получат полноценный HTML без выполнения JavaScript

**Файлы:** `vite.config.ts`, `main.tsx`, `package.json`

### 1.2 Добавить мета-теги на каждую страницу (react-helmet-async)

**Сейчас:** единственный `<title>Undercover Vibe</title>` на все страницы, нет description, нет OG-тегов.

**Что делать:**
- Установить `react-helmet-async`
- Обернуть `<App>` в `<HelmetProvider>`
- На каждой странице добавить `<Helmet>` с:
  - `<title>` - уникальный для каждой страницы
  - `<meta name="description">` - 150-160 символов
  - `<meta property="og:title">`, `og:description`, `og:image`, `og:url`
  - `<link rel="canonical">`
- Мета-теги нужно на 3 языках (через i18next)

**Примеры title/description:**

| Страница | Title (EN) | Description (EN) |
|---|---|---|
| `/` | Undercover Vibe - Coworking & Board Game Club in Tallinn | Cozy coworking by day, VIP board game club by night. Ergonomic workspace, fast WiFi, and 200+ board games in Tallinn. |
| `/pricing` | Pricing - Undercover Vibe Coworking Tallinn | Flexible coworking plans starting from €X/day. Day passes, monthly memberships, and private meeting rooms. |
| `/boardgames` | Board Games - Undercover Vibe Game Club Tallinn | 200+ board games, VIP gaming lounge, themed game nights. Book your table in Tallinn's coziest game club. |
| `/about` | About Us - Undercover Vibe | Our story: how a coworking space became Tallinn's favorite board game club. Meet the team behind Undercover Vibe. |
| `/events` | Events - Undercover Vibe Tallinn | Upcoming game nights, workshops, and community events. Check the calendar and join us! |

### 1.3 Создать robots.txt и sitemap.xml

**robots.txt** → `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://undercover.ee/sitemap.xml
```

**sitemap.xml** → `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://undercover.ee/</loc><priority>1.0</priority></url>
  <url><loc>https://undercover.ee/about</loc><priority>0.8</priority></url>
  <url><loc>https://undercover.ee/pricing</loc><priority>0.9</priority></url>
  <url><loc>https://undercover.ee/boardgames</loc><priority>0.8</priority></url>
  <url><loc>https://undercover.ee/events</loc><priority>0.7</priority></url>
  <url><loc>https://undercover.ee/events-and-trainings</loc><priority>0.7</priority></url>
</urlset>
```

### 1.4 Починить JSON-LD (есть синтаксическая ошибка)

В текущем `index.html` пропущена запятая перед `"sameAs"` в блоке structured data. Невалидный JSON-LD = Google игнорирует всю разметку.

**Строка 57-58:**
```json
// СЕЙЧАС (ошибка):
"amenityFeature": [...]
"sameAs": [...]

// НУЖНО:
"amenityFeature": [...],
"sameAs": [...]
```

---

## Фаза 2 - SEO-инфраструктура (3–5 дней)

> Цель: дать Google полную картину сайта и начать индексацию.

### 2.1 Google Search Console + Bing Webmaster Tools

- Подтвердить владение сайтом (HTML-тег или DNS)
- Отправить sitemap.xml
- Запросить индексацию главной страницы
- Мониторить ошибки краулинга

### 2.2 Schema.org разметка для каждой страницы

Текущая разметка - только `LocalBusiness` в index.html. Нужно добавить:

| Страница | Schema Type |
|---|---|
| `/` | `LocalBusiness` + `WebSite` + `SearchAction` |
| `/pricing` | `Product` / `Offer` для каждого тарифа |
| `/boardgames` | `ItemList` с играми |
| `/events` | `Event` для каждого мероприятия |

### 2.3 Hreflang-теги для мультиязычности

Сайт поддерживает EN/ET/RU. Нужно сообщить Google, что существуют языковые версии:

```html
<link rel="alternate" hreflang="en" href="https://undercover.ee/?lng=en" />
<link rel="alternate" hreflang="et" href="https://undercover.ee/?lng=et" />
<link rel="alternate" hreflang="ru" href="https://undercover.ee/?lng=ru" />
<link rel="alternate" hreflang="x-default" href="https://undercover.ee/" />
```

> Идеально - перейти на URL-based языки (`/en/`, `/et/`, `/ru/`) вместо query-параметров. Это отдельная задача.

### 2.4 Alt-тексты для всех изображений

В папке `/src/assets` - 150+ изображений. Каждый `<img>` должен иметь описательный `alt`. Особенно важно для:
- Фотографий интерьера (помогает в Google Images)
- Карточек настольных игр
- Логотипов

### 2.5 Исправить viewport

**Сейчас:** `<meta name="viewport" content="width=480">`
**Нужно:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Текущий viewport фиксирован на 480px - Google считает сайт "не mobile-friendly", что понижает ранжирование.

---

## Фаза 3 - Производительность и контент (1–2 недели)

> Цель: улучшить Core Web Vitals и добавить контент для SEO.

### 3.1 Оптимизация изображений

- Конвертировать все PNG/JPG в **WebP** (или AVIF)
- Добавить `loading="lazy"` для изображений ниже first fold
- Использовать `<picture>` с srcset для разных размеров
- Рассмотреть CDN для статики (Cloudflare, imgix)

### 3.2 Code splitting

React Router 7 поддерживает lazy loading:
```tsx
const BoardGames = lazy(() => import('./pages/BoardGames'));
```
Это уменьшит размер начального бандла и ускорит LCP.

### 3.3 Контентные страницы

- Страница "О нас" (`/about`) - расширить текст (history, values, team)
- Блог / раздел статей - для органического трафика по ключевым словам:
  - "coworking Tallinn", "board games Tallinn", "настольные игры Таллинн"
  - "coworking space Estonia", "game cafe Tallinn"

### 3.4 Canonical URLs и редиректы

- Добавить `<link rel="canonical">` на каждую страницу
- Настроить 301 редирект с `www.undercover.ee` → `undercover.ee`
- Обработка trailing slashes (консистентно)

---

## Порядок выполнения (Timeline)

```
День 1:  [1.4] Починить JSON-LD ошибку
         [1.3] Создать robots.txt + sitemap.xml
         [2.5] Исправить viewport meta-тег

День 2:  [1.2] Установить react-helmet-async, добавить мета-теги на все страницы

День 3-4: [1.1] Настроить pre-rendering (vite-ssg)
          Протестировать: curl -s https://undercover.ee/ | head -50 → видим контент?

День 5:  [2.1] Google Search Console + Bing → отправить sitemap
         [2.3] Hreflang-теги

Неделя 2: [2.2] Schema.org расширенная разметка
          [2.4] Alt-тексты
          [3.1] Оптимизация изображений
          [3.2] Code splitting

Неделя 3+: [3.3] Контент
            [3.4] Canonicals и редиректы
```

---

## Быстрые победы (можно сделать прямо сейчас за 30 минут)

1. ✅ Починить запятую в JSON-LD (`index.html`, строка 57)
2. ✅ Добавить `robots.txt` в `/public`
3. ✅ Добавить `sitemap.xml` в `/public`
4. ✅ Исправить viewport на `width=device-width, initial-scale=1.0`
5. ✅ Добавить `<meta name="description">` в `index.html`

---

## Технические заметки

- **Не переходить на Next.js/Remix** - для сайта из 7 страниц pre-rendering через Vite решает задачу SEO без переписывания
- **i18n + SEO** - для лучшей индексации мультиязычного контента в будущем стоит перейти на URL-based routing (`/en/pricing`, `/et/pricing`, `/ru/pricing`) вместо `i18next-browser-languagedetector`
- **Hosting** - убедиться, что хостинг корректно раздаёт pre-rendered HTML и отдаёт правильные заголовки для `.xml` и `.txt` файлов

---

# Round 2 - Fix Plan (April 2026, English)

> Update from April 22, 2026. The original plan above shipped most of its Phase 1: pre-rendering works, robots.txt and sitemap.xml are live, JSON-LD is on every page, mobile viewport is correct, multiple Schema types are present (`WebSite`, `BreadcrumbList`, `Product`, `Service`, `ItemList`, `Event`). Pages are now indexable. This round addresses what a fresh audit (April 22) found *after* those fixes shipped - both real bugs and remaining SEO/UX gaps.

## Quick wins - do these this week

These are isolated, low-risk, ship-in-an-hour-each fixes. Each one has a real cost today.

### 🔴 Critical bugs

- [ ] **Fix broken phone link.** `src/components/RegistrationForm.tsx` line 202 has `tel:+37255512345` (a placeholder) but displays the real number `+372 5154369`. Mobile users tapping the contact-form phone dial a wrong number.
  - **Change:** `tel:+37255512345` → `tel:+3725154369` (matches `Footer.tsx` / `SocialContacts.tsx`).
  - **Acceptance:** `grep -r "37255512345" src/` returns nothing.

- [ ] **Remove the expired March discount on Pricing.** `monthly_desk.subtitle` in all three locales still says "discount till end of march" / "Soodustus kuni märtsi lõpuni" / "скидка до конца марта". It is now late April.
  - Files: `public/locales/{en,et,ru}/translation.json` (each line ~121–128).
  - **Decision needed from Sergei:** (a) make the €250 the new normal price (just delete the subtitle), (b) extend the promo with a new end date, or (c) replace with a different current promo (e.g. "Free first week of trial").
  - **Acceptance:** the pricing page no longer mentions any past month.

- [ ] **Empty `/en/` and `/ru/` URL paths.** `src/App.tsx` has no React Router routes for locale-prefixed paths, so any link shared as `https://undercover.ee/en/` lands on a blank shell. Translations exist in `public/locales/`; the routing layer just doesn't use them.
  - **Smallest fix (do first):** add a catch-all route or a route that redirects `/en/*` and `/ru/*` (and `/et/*`) to the equivalent path without the prefix. Keeps the inline flag switcher as the only language UI for now.
  - **Right long-term fix (later - see Backlog):** locale-prefixed routes with proper hreflang.

### 🟡 Polish (5–30 min each)

- [ ] **Normalize Telegram link casing.** `RegistrationForm.tsx` line 210 uses `t.me/Acrashik` (capital A); `SocialIcons.tsx` line 8 uses `t.me/acrashik` (lowercase). Both work because Telegram is case-insensitive, but pick one (lowercase, matches the BGG URL and footer) and use everywhere.

- [ ] **Add opening hours to footer.** Add a small "Hours" block to `Footer.tsx` next to Location:
  - Day pass: Mon–Fri 9:00–18:00
  - Members: 24/7
  - New i18n keys: `footer.hours_title`, `footer.hours_value` (in et/en/ru).

- [ ] **Make the contact-form phone field optional.** In `RegistrationForm.tsx`, drop the `required` attribute from the phone input. Reduces form abandonment.

- [ ] **Embed a Google Map iframe** on the homepage contact section (next to the Kivimurru address image), using your existing Maps URL. Builds trust and helps local-SEO context.

- [ ] **Add a persistent "Book Free Trial Day" CTA in the navbar.** Currently the only conversion CTA is the form 5 sections deep on the homepage.

### 🟢 SEO foundations to wire up while you're in there

- [ ] **Add `LocalBusiness` (or `CoworkingSpace`) JSON-LD on every page** with `name`, `address`, `geo`, `telephone`, `openingHoursSpecification`, `priceRange`, `image`, and `aggregateRating` (you have 12 reviews, 5.0 avg - this gets you stars in Google's search results). The current `LocalBusiness` block is on the homepage only and lacks `aggregateRating`.

- [ ] **Submit sitemap to Google Search Console + Bing Webmaster Tools** (if not already done). This is a 5-minute task that determines how fast Google notices the fixes you're about to ship.

- [ ] **List Undercover on the directories that already rank for "coworking Tallinn":**
  - [ ] coworker.com (Tallinn list)
  - [ ] coworkingspaces.me (Tallinn directory)
  - [ ] visittallinn.ee / visitestonia.com coworking guide
  - [ ] workin.space (Estonia/Harju)
  - [ ] instantoffices.com / easyoffices.com / office-hub.com
  - **NAP rule:** use the *exact* same name, address, and phone in every listing as on the site (`Kivimurru tn 34 - 6, 11411 Tallinn`, `+372 51 54 369`, `info@undercover.ee`). Google uses NAP consistency as a local-SEO trust signal.

---

## Backlog (prioritized)

### P0 - content & positioning (biggest expected lift on monthly memberships)

- [ ] **Rewrite the About page.** It is currently ~50 words ("welcome to our board game cafe"). Target 300–500 words. Include:
  - Founder story (who started Undercover and why)
  - Photos of the space and people (not just product shots)
  - "Who works here" - explicitly call out the actual community: artists, language learners, programmers, freelancers, expats. This is the angle the project description mentions but the site never says.
  - The cat. Make it a feature.
  - Files: `src/pages/AboutUs.tsx`, all 3 translation files.

- [ ] **Reframe the homepage so coworking leads.** Today the title says "Coworking & Board Game Club" and three of the homepage's main sections are about board games vs. one about coworking. For someone Googling "coworking Tallinn", the first 1.5 screens should be unambiguously about coworking, with board games as cultural texture lower down. Keep `/boardgames` as the dedicated page for that audience.

- [ ] **Expand pricing cards to actually list "community benefits."** The Pricing page mentions them but never enumerates them. Pull from the existing FAQ content: 24/7 access, fiber WiFi, IKEA Markus chair, unlimited specialty coffee/tea, mailing/legal address, free guests, all events included, etc.

- [ ] **Move social proof above the fold.** Today the 5★ / 12-reviews badge and the testimonials sit below five other sections. At minimum: a one-line "5.0 ★ on Google · 12 reviews" badge under the hero, plus one short quote.

- [ ] **Build a dedicated `/coworking` page** (separate from the homepage) that targets the "coworking Tallinn" search intent specifically. Internal-link to it from the homepage and from `/pricing`.

### P1 - locale & SEO

- [ ] **Locale-prefixed routes done properly.** Wire `/en/*`, `/ru/*`, `/et/*` to the same React Router tree, set the active i18next language from the URL, and persist it. Files: `src/App.tsx`, `src/i18n.ts`, every page component.

- [ ] **Add `hreflang` link tags** in `<head>` on every page (after locale routing exists):
  ```html
  <link rel="alternate" hreflang="et" href="https://undercover.ee/{path}" />
  <link rel="alternate" hreflang="en" href="https://undercover.ee/en/{path}" />
  <link rel="alternate" hreflang="ru" href="https://undercover.ee/ru/{path}" />
  <link rel="alternate" hreflang="x-default" href="https://undercover.ee/{path}" />
  ```

- [ ] **Update `public/sitemap.xml`** to include `<lastmod>` dates and `<xhtml:link rel="alternate" hreflang="…">` entries for each locale of each URL.

- [ ] **Consolidate the events pages.** Today `/events`, `/events-and-trainings`, and the calendar on `/boardgames` overlap. `/events` is even orphaned from navigation but listed in sitemap. Decide: keep `/events-and-trainings` (B2B venue rental) and `/boardgames` (calendar of game weekends) - kill or merge `/events`.

- [ ] **Add `Event` schema with `startDate`/`endDate`** to the actual scheduled events on `/boardgames` (currently dates are only in visible HTML, not JSON-LD).

- [ ] **Add `Review` schema** to the homepage testimonials block - pulls those reviews into Google rich results.

- [ ] **Replace the flag-image language switcher with text labels** ("EN / ET / RU") or a labeled dropdown. Flags are not languages; this is also an a11y win.

### P2 - conversion & growth

- [ ] **Calendly (or similar) tour-booking embed** in addition to the contact form. Lets prospects book themselves into a tour slot.

- [ ] **Newsletter signup** in the footer. Even one field, sent monthly.

- [ ] **Set up GA4 conversion goals:** form submissions, Calendly bookings, newsletter signups, Telegram/WhatsApp clicks. The Pixel and gtag are firing, but events likely aren't tagged.

- [ ] **Verify `seoConfig.ts` is producing unique titles/descriptions/OG-image per route** at prerender time. Spot-check the built HTML for each page in `dist/`.

- [ ] **Run a Lighthouse audit** (Mobile + Desktop) and address anything below 80 in Performance / Accessibility / SEO.

### P3 - content marketing (compound returns)

- [ ] **First three blog posts** (Estonian + English, Russian optional):
  - "Best quiet coworking spaces in Tallinn"
  - "Working as an expat in Tallinn: a remote-work guide"
  - "Indie hacking from Tallinn"

  Each one targets a search query your audience uses, and internally links to membership/free-trial CTAs.

- [ ] **One guest post or local interview** (Telliskivi blog, ERR Lifestyle, e-Estonia, a local startup publication). Borrowed authority is the fastest way for a small site to rank.

- [ ] **3–4 short member stories** on the About page or in a dedicated section. One paragraph each, with name, what they do, and what Undercover gives them.

---

## Notes & open questions for Sergei

- The pricing card decision (delete the discount line vs. extend vs. swap promo) needs your call. Defaulting to "delete the subtitle" if no answer.
- The footer copyright line "Õigused ei ole kaitstud" / "No rights reserved" is a charming joke but reads as amateurish to some visitors. Worth keeping if you like it; flag in case you want to revisit.
- Lighthouse and meta-tag verification could not be done remotely during the audit (extension conflict blocked DOM access). Worth running locally before the next round.
