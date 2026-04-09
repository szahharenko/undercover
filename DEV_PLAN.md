# Undercover.ee — Dev Plan: SEO & Technical Visibility Fix

## Диагноз

Сайт undercover.ee — это чистый **Vite + React SPA** (Single Page Application). Сервер отдаёт пустой HTML с единственным `<div id="root"></div>`, а весь контент рендерится на клиенте через JavaScript. Поисковые боты (Google, Bing) видят пустую страницу → сайт не индексируется → органический трафик = 0.

**Текущий стек:** React 19 + Vite 7 + React Router 7 + Tailwind 4 + i18next (EN/ET/RU)

---

## Фаза 1 — Критические фиксы (1–2 дня)

> Цель: сделать так, чтобы поисковики увидели контент на каждой странице.

### 1.1 Добавить Pre-rendering (SSG) через vite-plugin-ssr или vite-ssg

**Почему не полный SSR:** Переход на Next.js или Remix — это переписывание проекта. Для сайта-визитки с 7 страницами **pre-rendering (SSG)** — оптимальное решение: минимум изменений, максимум эффекта.

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
  - `<title>` — уникальный для каждой страницы
  - `<meta name="description">` — 150-160 символов
  - `<meta property="og:title">`, `og:description`, `og:image`, `og:url`
  - `<link rel="canonical">`
- Мета-теги нужно на 3 языках (через i18next)

**Примеры title/description:**

| Страница | Title (EN) | Description (EN) |
|---|---|---|
| `/` | Undercover Vibe — Coworking & Board Game Club in Tallinn | Cozy coworking by day, VIP board game club by night. Ergonomic workspace, fast WiFi, and 200+ board games in Tallinn. |
| `/pricing` | Pricing — Undercover Vibe Coworking Tallinn | Flexible coworking plans starting from €X/day. Day passes, monthly memberships, and private meeting rooms. |
| `/boardgames` | Board Games — Undercover Vibe Game Club Tallinn | 200+ board games, VIP gaming lounge, themed game nights. Book your table in Tallinn's coziest game club. |
| `/about` | About Us — Undercover Vibe | Our story: how a coworking space became Tallinn's favorite board game club. Meet the team behind Undercover Vibe. |
| `/events` | Events — Undercover Vibe Tallinn | Upcoming game nights, workshops, and community events. Check the calendar and join us! |

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

## Фаза 2 — SEO-инфраструктура (3–5 дней)

> Цель: дать Google полную картину сайта и начать индексацию.

### 2.1 Google Search Console + Bing Webmaster Tools

- Подтвердить владение сайтом (HTML-тег или DNS)
- Отправить sitemap.xml
- Запросить индексацию главной страницы
- Мониторить ошибки краулинга

### 2.2 Schema.org разметка для каждой страницы

Текущая разметка — только `LocalBusiness` в index.html. Нужно добавить:

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

> Идеально — перейти на URL-based языки (`/en/`, `/et/`, `/ru/`) вместо query-параметров. Это отдельная задача.

### 2.4 Alt-тексты для всех изображений

В папке `/src/assets` — 150+ изображений. Каждый `<img>` должен иметь описательный `alt`. Особенно важно для:
- Фотографий интерьера (помогает в Google Images)
- Карточек настольных игр
- Логотипов

### 2.5 Исправить viewport

**Сейчас:** `<meta name="viewport" content="width=480">`
**Нужно:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Текущий viewport фиксирован на 480px — Google считает сайт "не mobile-friendly", что понижает ранжирование.

---

## Фаза 3 — Производительность и контент (1–2 недели)

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

- Страница "О нас" (`/about`) — расширить текст (history, values, team)
- Блог / раздел статей — для органического трафика по ключевым словам:
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

- **Не переходить на Next.js/Remix** — для сайта из 7 страниц pre-rendering через Vite решает задачу SEO без переписывания
- **i18n + SEO** — для лучшей индексации мультиязычного контента в будущем стоит перейти на URL-based routing (`/en/pricing`, `/et/pricing`, `/ru/pricing`) вместо `i18next-browser-languagedetector`
- **Hosting** — убедиться, что хостинг корректно раздаёт pre-rendered HTML и отдаёт правильные заголовки для `.xml` и `.txt` файлов
