# Undercover.ee — Dev Plan

> Status snapshot: 2026-04-23. The site is now indexable, the homepage leads with coworking, About is rewritten, pricing has full benefit lists, the registration form opens as a modal from any CTA, and the schema markup is solid. Remaining work is split between (a) small SEO/UX polish, (b) bigger pages/features, and (c) manual tasks on Sergei's side that no amount of code will replace.

---

## Status overview

| Area | Status |
|---|---|
| Pre-rendering (SSG) + indexable HTML | ✅ DONE |
| Meta tags / SEO per route (useSEO hook) | ✅ DONE |
| robots.txt + sitemap.xml + hreflang in sitemap | ✅ DONE |
| Schema.org: CoworkingSpace + LocalBusiness + aggregateRating + Product/Offer + BreadcrumbList | ✅ DONE |
| Mobile viewport fix | ✅ DONE |
| Critical UX bugs (phone link, expired discount, /en /ru redirects) | ✅ DONE |
| About page rewrite (workspace-with-love positioning) | ✅ DONE |
| Homepage coworking-first reframe + social proof above fold | ✅ DONE |
| Pricing cards with benefit lists in 3 locales | ✅ DONE |
| Registration form as reusable modal popup | ✅ DONE |
| Navbar persistent "Book Free Trial" CTA | ⬜ Pending |
| Google Map iframe on homepage | ⬜ Pending |
| Replace flag-image switcher with text labels (a11y) | ⬜ Pending |
| Per-page `<link rel="alternate" hreflang>` in `<head>` | ⬜ Pending |
| Review schema on testimonials | ⬜ Pending |
| Event schema with startDate/endDate | ⬜ Pending |
| Consolidate /events vs /events-and-trainings | ⬜ Needs Sergei's call |
| Dedicated /coworking landing page | ⬜ Pending |
| Locale-prefixed routes done properly (not just redirect) | ⬜ Pending |
| Calendly tour-booking embed | ⬜ Pending |
| Newsletter signup in footer | ⬜ Pending |
| GA4 conversion goals | ⬜ Pending |
| Image optimization (WebP, lazy-load, srcset) | 🟡 Code-side done · 👤 image re-export on Sergei (see PERF_NOTES.md) |
| Route-level code splitting | ✅ DONE |
| Vendor chunk splitting (caching wins) | ✅ DONE |
| Per-route SEO meta uniqueness verified | ✅ DONE |
| Lighthouse audit + remediation | 🟡 Code-side done · 👤 run Lighthouse locally per PERF_NOTES.md |
| Submit sitemap to Google Search Console + Bing | 👤 Sergei manual |
| List on coworker.com / coworkingspaces.me / visittallinn.ee / workin.space | 👤 Sergei manual |
| First three blog posts | 👤 Sergei manual |
| Guest post / local interview | 👤 Sergei manual |
| Member stories on About page | 👤 Sergei manual |

Legend: ✅ DONE — shipped · ⬜ Pending — coded work remaining · 👤 Sergei manual — needs you to do it (Anthropic can help draft, but submission/listing/blog publishing is on you)

---

## Что сделано (Phase 1 — критические фиксы)

- ✅ **DONE — 1.1 Pre-rendering (SSG).** Настроен `vite-plugin-prerender` со списком маршрутов. `vite build` теперь генерирует готовый HTML с контентом для каждой страницы, поисковые боты видят полноценный текст.
- ✅ **DONE — 1.2 Мета-теги на каждой странице.** `useSEO` hook + `react-helmet-async`, уникальный title/description на 3 языках для каждого маршрута.
- ✅ **DONE — 1.3 robots.txt + sitemap.xml.** Оба файла в `public/`. Sitemap дополнен `lastmod` и `hreflang` (см. Round 2 ниже).
- ✅ **DONE — 1.4 Фикс JSON-LD.** Запятая исправлена, валидный structured data.

## Что сделано (Phase 2 — SEO-инфраструктура)

- ✅ **DONE — 2.2 Schema.org разметка.** На главной — `WebSite` + `CoworkingSpace`/`LocalBusiness` с `aggregateRating` (5.0/12 отзывов) и `openingHoursSpecification`. На `/pricing` — `Product`+`Offer` для каждого тарифа. `BreadcrumbList` на всех внутренних страницах.
- ✅ **DONE — 2.3 Hreflang в sitemap.** Каждый URL содержит `xhtml:link` для en/et/ru/x-default. (Per-page `<head>` теги — отдельная задача в Backlog P1.)
- ✅ **DONE — 2.5 Viewport.** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- 👤 **Sergei manual — 2.1 Google Search Console + Bing Webmaster.** Подтвердить владение, отправить sitemap, запросить индексацию, мониторить ошибки. 5 минут работы, серьёзный эффект.
- ⬜ **Pending — 2.4 Alt-тексты для всех изображений.** Частично есть, но 150+ изображений требуют системного прохода.

## Что сделано (Round 2 critical bugs)

- ✅ **DONE — Phone link fix.** `tel:+3725154369` везде, плейсхолдер `+37255512345` удалён.
- ✅ **DONE — Expired March discount удалена.** Заменена на "Free first week" promo на 3 языках.
- ✅ **DONE — `/en/*` `/ru/*` `/et/*` redirects.** `LocaleRedirect` компонент, маршруты в `App.tsx` редиректят на base path и переключают i18next.

## Что сделано (Round 2 polish)

- ✅ **DONE — Telegram link casing.** Везде `t.me/acrashik` lowercase.
- ✅ **DONE — Opening hours в footer.** Mon–Fri 9:00–18:00, members 24/7. Новые i18n ключи во всех локалях.
- ✅ **DONE — Phone field optional.** Убран `required`, добавлен hint "(optional)".

## Что сделано (Round 2 P0 backlog)

- ✅ **DONE — About page rewrite.** Пять секций: story → craft → community → mission → boardgames note + invitation CTA. Фокус на "workspace built with love", доска игр упомянута как cultural texture.
- ✅ **DONE — Homepage coworking-first reframe.** Порядок секций: Hero → SocialProofBar → CoworkingExperience → RegistrationForm → Gallery → BoardGameClub → GoogleReviews. Доска игр сместилась ниже первого экрана.
- ✅ **DONE — Pricing benefits.** 9 преимуществ для Monthly Desk, 5 для Day Pass, 4 для Free Trial — на 3 языках. Monthly карточка выделена (border-2 + "Free first week" chip).
- ✅ **DONE — Social proof above fold.** `SocialProofBar` компонент: 5★ + 12 reviews + Google Maps link, рендерится сразу под Hero и при prerender (хардкод цифр).

## Что сделано (новое — не было в плане)

- ✅ **DONE — Reusable registration modal.** `RegistrationFormContent` (presentational) + `RegistrationModal` + `RegistrationModalProvider` + `useRegistrationModal` hook. Inline-секция на главной осталась, кнопки "Reserve" в Hero / Pricing free trial / About теперь открывают modal вместо cross-page jump. Modal содержит только форму (без contact panel) для скорости заполнения.
- ✅ **DONE — Route-level code splitting.** Все вторичные страницы через `React.lazy()`, `<Suspense>` fallback. `Home` остался eager (LCP target).
- ✅ **DONE — Vendor chunk splitting.** `manualChunks` в `vite.config.ts` для react / router / motion / i18n / icons / fullcalendar. Index chunk упал с 163 KB gzip → 23 KB. FullCalendar (~76 KB gzip) больше не грузится на главной — только на `/boardgames`.
- ✅ **DONE — LCP hints на hero images.** `fetchPriority="high"` + `decoding="async"` на all five hero `<img>`. Footer mascots — `loading="lazy"` + `decoding="async"`. Preconnect для `fonts.googleapis.com` / `fonts.gstatic.com` в `index.html`.
- ✅ **DONE — Per-route SEO uniqueness.** Static check across en/et/ru: каждый из 7 routes имеет уникальный non-empty title + description, prerender pipeline (через networkidle0) гарантированно их захватывает.
- 👤 **Sergei manual — re-export oversized images.** 51 файл > 500 KB, total 102 MB. Hero PNG'и по 3-5 MB. См. `PERF_NOTES.md` за списком offenders и Squoosh-командами.
- 👤 **Sergei manual — Lighthouse local run.** Сэндбокс не может скачать Chrome. Запусти `npm run build:seo && npx serve dist` локально, открой Lighthouse в DevTools, скинь report — итерируем дальше.

---

## Что осталось (Pending)

### 🟡 Polish — ship-in-an-hour-each

- ⬜ **Persistent "Book Free Trial" CTA в navbar.** Кнопка вызывает `openModal("navbar")`. Сейчас единственный конверсионный CTA — кнопка в Hero.
- ⬜ **Google Map iframe** на homepage в секции контактов рядом с фотографией Kivimurru. Trust signal + local SEO context.
- ⬜ **Заменить flag-image language switcher на текстовые лейблы** ("EN / ET / RU"). Флаги ≠ языки. Также a11y win.
- ⬜ **Add `Review` schema** на блок отзывов на главной — вытянет 5★ в Google rich results.
- ⬜ **Per-page `<link rel="alternate" hreflang>` теги в `<head>`.** Sitemap содержит hreflang, страницы — нет. Дополнить через `useSEO` hook.

### 🟢 Events overhaul — нужно решение Sergei

- ⬜ **Консолидация events страниц.** `/events`, `/events-and-trainings` и календарь на `/boardgames` пересекаются. План: оставить `/events-and-trainings` (B2B venue rental) и календарь на `/boardgames` — `/events` убить или мерджить. **Жду твоего решения.**
- ⬜ **`Event` schema со `startDate`/`endDate`** для реальных мероприятий на `/boardgames` (сейчас даты только в HTML, не в JSON-LD).

### 🔵 Bigger lifts (P1/P2)

- ⬜ **Build dedicated `/coworking` page** отдельно от homepage, таргетит "coworking Tallinn" search intent. Internal-link с homepage и `/pricing`.
- ⬜ **Locale-prefixed routes done properly.** Сейчас просто redirect — нужно полноценное URL-based i18n (`/en/pricing`, `/et/pricing`, `/ru/pricing`) с активной локалью из URL.
- ⬜ **Calendly (или аналог) tour-booking embed** в дополнение к контактной форме. Позволит букать слот самостоятельно.
- ⬜ **Newsletter signup в footer.** Хотя бы одно поле, ежемесячная рассылка.
- ⬜ **GA4 conversion goals.** Form submissions, Calendly bookings, newsletter signups, Telegram/WhatsApp clicks. События отстреливаются, но как conversion не размечены.
- ✅ **Verify `seoConfig.ts` уникальность** — DONE (см. PERF_NOTES.md). Note: сам `seoConfig.ts` не импортируется нигде, это dead code; либо удалить, либо подключить как fallback в `useSEO`.
- 🟡 **Lighthouse audit** (Mobile + Desktop) — code-side fixes shipped (LCP hints, code splitting, vendor caching). 👤 Sergei: запусти локально и скинь scores.
- 🟡 **Image optimization** — code-side: lazy/decoding hints добавлены на heroes + footer. 👤 Sergei: re-export 51 oversized image, см. PERF_NOTES.md.
- ✅ **Route-level code splitting** — DONE.

### 👤 Manual tasks на стороне Sergei

- 👤 **Submit sitemap to Google Search Console.** Подтвердить ownership, добавить sitemap.xml, request indexing для главной. **Это самая высокоприоритетная задача из всего что осталось** — без неё Google не узнает о фиксах.
- 👤 **Submit to Bing Webmaster Tools.** То же самое для Bing.
- 👤 **List Undercover на directory сайтах** (consistent NAP: `Kivimurru tn 34 - 6, 11411 Tallinn`, `+372 51 54 369`, `info@undercover.ee`):
  - coworker.com (Tallinn list)
  - coworkingspaces.me (Tallinn directory)
  - visittallinn.ee / visitestonia.com coworking guide
  - workin.space (Estonia/Harju)
  - instantoffices.com / easyoffices.com / office-hub.com

### 📝 P3 — content marketing (compound returns over months)

- 👤 **First three blog posts** (Estonian + English, Russian опционально):
  - "Best quiet coworking spaces in Tallinn"
  - "Working as an expat in Tallinn: a remote-work guide"
  - "Indie hacking from Tallinn"
- 👤 **One guest post или local interview** (Telliskivi blog, ERR Lifestyle, e-Estonia, локальное startup-издание). Borrowed authority — самый быстрый способ для маленького сайта подняться в выдаче.
- 👤 **3–4 short member stories** на About странице или в отдельной секции. Один абзац каждая, с именем, чем человек занимается, и что Undercover ему даёт.

---

## Открытые вопросы для Sergei

- **Events консолидация.** Что делаем с `/events`? Варианты: (a) удалить, (b) оставить как landing для общих событий + календарь импортировать, (c) переименовать.
- **Footer copyright "Õigused ei ole kaitstud" / "No rights reserved".** Charming joke, но кому-то читается как amateurish. Оставляем?
- **Lighthouse audit** — не делалось remotely (extension blocked DOM access). Запусти локально перед следующим раундом, скинь результаты.
- **Suggested next batch:** polish bundle — navbar CTA + flag→text switcher + Map embed + Review schema + per-page hreflang. Все мелкие, все в сумме ощутимо двигают SEO и conversion. Дай знать если запускать.

---

## Технические заметки

- **Не переходить на Next.js/Remix.** Pre-rendering через Vite решает SEO задачу для сайта на 7 страниц без переписывания.
- **i18n + SEO**: для лучшей индексации мультиязычного контента — переходить на URL-based routing (`/en/pricing` и т.д.) вместо `i18next-browser-languagedetector`. Сейчас только redirect.
- **Hosting**: убедиться что хостинг корректно раздаёт pre-rendered HTML и отдаёт правильные заголовки для `.xml` и `.txt`.
- **Windows mount caveat**: при работе с этим репозиторием через Cowork замечен sporadic NUL-padding / truncation bug при использовании Edit/Write на больших файлах. Workaround — запись через Python с byte-by-byte verification.
