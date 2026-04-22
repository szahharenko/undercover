# Tech Stack - Undercover Vibe

## Core
| Layer | Choice | Version |
|---|---|---|
| Language | **TypeScript** | ~5.9 (strict mode) |
| UI Library | **React** | 19 |
| Build Tool | **Vite** | 7 |
| Module format | ESM (`"type": "module"`) | - |

## Styling
- **Tailwind CSS v4** (JIT, PostCSS plugin) with custom design tokens:
  - `cream` `#F5F5DC`, `coffee` `#6F4E37`, `sage-green` `#8A9A5B`, `charcoal` `#36454F`
  - Font: `Inter` (sans-serif)
  - Border radius: `xl` = 1rem, `2xl` = 1.5rem

## Routing & State
- **React Router DOM v7** - client-side routing

## Animation
- **Framer Motion v12** - page/component animations

## Internationalisation
- **i18next + react-i18next** - translations
- `i18next-browser-languagedetector` - auto-detect language
- `i18next-http-backend` - lazy-load translation JSON files

## Icons
- **Lucide React** + **React Icons** (dual icon libraries)

## Forms & Data
- **React Datepicker** - date selection in forms

## Calendar
- **FullCalendar** (React adapter) - `daygrid`, `timegrid`, `list`, `rrule` views

## Maps
- **@googlemaps/js-api-loader** - Google Maps integration

## Analytics
- **react-ga4** - Google Analytics 4

## Compiler Optimisation
- **babel-plugin-react-compiler** - React compiler (auto-memoisation, enabled via Vite's Babel plugin)

## Linting
- ESLint v9 (flat config) + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

## TypeScript Config highlights
- Target: `ES2022`, `moduleResolution: bundler`
- `strict: true`, `noUnusedLocals/Parameters`, `noEmit` (Vite handles emit)

---

## Scaffold command for a new project with the same stack

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install react-router-dom framer-motion i18next react-i18next i18next-browser-languagedetector i18next-http-backend lucide-react react-icons
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer typescript-eslint eslint-plugin-react-hooks babel-plugin-react-compiler
```

Then copy over `tailwind.config.js` (custom colors/fonts) and `vite.config.ts` (babel-plugin-react-compiler) from this project.
