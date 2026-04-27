# TODO — Undercover.ee

> Snapshot: 2026-04-27. Только то, что осталось сделать.
> История завершённых задач — в `DEV_PLAN.md`. Технические заметки и
> performance-долги — в `PERF_NOTES.md`.

---

## ✅ Что уже сделано (коротко, чтоб не возвращаться)

Сайт стал индексируемым (pre-rendering через `vite-plugin-prerender`),
у каждой страницы уникальные meta + hreflang в sitemap, schema.org
размечена (`CoworkingSpace` + `LocalBusiness` + `aggregateRating` +
`Product`/`Offer` на pricing + `BreadcrumbList`), homepage
переориентирован на coworking, About переписан, pricing с benefit-
списками на 3 языках, registration form работает как переиспользуемый
modal, route-level + vendor chunk splitting, LCP-хинты на hero. Meta
Pixel установлен. Social proof bar с живым `totalRatings` из Google
Places. Instagram-фид через Behold подключён на главную. Critical
bugs (телефон, истёкшая скидка, /en /et /ru redirects) починены.

---

## ⬜ Pending — кодовая работа

### SEO polish (мелкие, но дают rich-results)

- ⬜ **Per-page `<link rel="alternate" hreflang>` в `<head>`.**
  В sitemap hreflang есть, на самих страницах — нет. Добавить через
  `useSEO` hook.
- ⬜ **`Review` schema** на блок Google Reviews на главной — вытянет
  5★ snippet в Google search results.
- ⬜ **`Event` schema** со `startDate`/`endDate` на `/boardgames`
  (сейчас даты живут только в HTML, не в JSON-LD).
- ⬜ **Locale-prefixed routes** (`/en/pricing`, `/et/pricing`,
  `/ru/pricing`) вместо текущего redirect-only подхода. Серьёзный лифт
  для multilingual SEO.
- ⬜ **Dedicated `/coworking` landing page** для запроса "coworking
  Tallinn". Internal-linked с homepage и `/pricing`.
- ⬜ **Alt-тексты** — системный проход по 150+ изображениям. Сейчас
  частично.

### Конверсия / UX

- ⬜ **Persistent "Book Free Trial" CTA в Navbar.** Сейчас единственная
  конверсионная кнопка — в Hero. Должна вызывать `openModal("navbar")`.
- ⬜ **Google Map iframe** в секции контактов на главной (рядом с фото
  Kivimurru). Trust signal + local SEO.
- ⬜ **Заменить flag-switcher на текстовые лейблы** EN / ET / RU.
  Флаги ≠ языки + a11y win.
- ⬜ **Newsletter signup в footer** — одно поле email + предложение
  ("первая неделя бесплатно" или "анонсы board game nights").
- ⬜ **Calendly tour-booking embed** в дополнение к контактной форме
  (самостоятельный slot booking).

### Аналитика

- ⬜ **GA4 conversion goals** — events стреляют, но не размечены как
  conversions: form submissions, Calendly bookings, newsletter
  signups, Telegram/WhatsApp clicks.
- ⬜ **Meta Pixel custom events.** Сейчас только `PageView`. Полезные
  для коворкинга:
  - `Lead` — отправили форму или newsletter
  - `ScheduleTour` — клик по Calendly / "book a tour"
  - `ViewContent` на `/pricing` — для retargeting "посетили цены, не
    купили"
  - `Contact` — клик по Telegram / WhatsApp / phone
  Без этих событий нельзя строить Lookalike-аудитории и нельзя мерить
  ROI рекламы в Meta.

### Events overhaul (нужно решение Sergei)

- ⬜ **Консолидация events-страниц.** `/events`, `/events-and-trainings`
  и календарь на `/boardgames` пересекаются. Варианты:
  (a) удалить `/events`,
  (b) оставить как landing для общих событий + импортировать туда
      календарь,
  (c) переименовать одну из двух.
  **Жду решения.**

---

## 👤 Manual — на стороне Sergei

### Самое важное — без этого код-фиксы работают вхолостую

- 👤 **Google Search Console.** Подтвердить ownership (DNS или HTML-
  файл), добавить `sitemap.xml`, request indexing для главной.
  ~5 минут, но именно эта задача "включает" всё, что мы сделали.
- 👤 **Bing Webmaster Tools** — то же самое для Bing. Импорт из GSC
  работает в один клик.

### Directory listings (NAP консистентно)

`Kivimurru tn 34-6, 11411 Tallinn` · `+372 51 54 369` ·
`info@undercover.ee`

- 👤 coworker.com — Tallinn list
- 👤 coworkingspaces.me — Tallinn directory
- 👤 visittallinn.ee / visitestonia.com — coworking guide
- 👤 workin.space — Estonia / Harju
- 👤 instantoffices.com / easyoffices.com (опционально)

### Контент-маркетинг

- 👤 **Первые 3 поста в блог** (et + en, ru опционально):
  - "Best quiet coworking spaces in Tallinn"
  - "Working as an expat in Tallinn: a remote-work guide"
  - "Indie hacking from Tallinn"
- 👤 **Один guest-post или local interview** — Telliskivi blog, ERR
  Lifestyle, e-Estonia, какое-нибудь startup-издание. Borrowed
  authority — самый быстрый способ для маленького сайта подняться.
- 👤 **3–4 коротких member story** на About-странице. Один абзац
  каждая: имя, чем человек занимается, что Undercover ему даёт.

### Социальные каналы

- 👤 **Регулярные посты в Instagram.** Фид теперь подтягивается на
  главную через Behold — чем активнее instagram, тем живее главная.
  Game nights, утренние моменты, новые игры, гости, кофе — fashion
  не нужен.
- 👤 **UGC**: попросить резидентов постить с хэштегом / тегом
  `@undercover.vibe`, делать репосты в stories.
- 👤 **Микро-инфлюенсеры** (1K-10K followers) в нишах: remote work,
  expats в Таллине, indie hackers, local creatives, board game
  community. Дешевле и эффективнее, чем blanket-реклама.

### Платная реклама (когда будет бюджет)

- 👤 **Meta Ads** (Instagram/Facebook): трафик-кампании на холодную
  аудиторию по интересам ("coworking", "remote work", "freelance",
  "digital nomad Tallinn"). Ретаргетинг через установленный Pixel —
  но только после того, как добавим custom events (см. выше).
- 👤 **Google Ads**: брендовая кампания + запросы "coworking Tallinn",
  "rent desk Tallinn", "тихий офис Таллин".

### Performance / images

- 👤 **Re-export 51 oversized image** (51 файл > 500 KB, всего 102 MB).
  Hero PNG'и по 3-5 MB. Список offenders и Squoosh-команды — в
  `PERF_NOTES.md`.
- 👤 **Lighthouse audit** локально (sandbox не может скачать Chrome):
  ```
  npm run build:seo && npx serve dist
  ```
  → открыть Lighthouse в DevTools, скинуть report, итерируем дальше.

---

## ❓ Открытые вопросы для Sergei

- **Events консолидация** (см. выше).
- **Footer copyright** "Õigused ei ole kaitstud / No rights reserved" —
  charming, но кому-то читается как amateurish. Оставляем?
- **Suggested next batch** — polish bundle: navbar CTA + flag→text
  switcher + Map iframe + Review schema + per-page hreflang. Все
  мелкие, в сумме ощутимо двигают SEO и conversion. Запускать?
