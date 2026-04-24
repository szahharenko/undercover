import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    // The BoardGames route legitimately bundles FullCalendar (~290 KB
    // with rrule + multi-view plugins); raise the warn threshold so it
    // doesn't drown out real regressions.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Group heavy third-party deps into stable vendor chunks so they
        // can be cached independently of app code between deploys.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          // FullCalendar is route-scoped and heavy — keep isolated so
          // the home page doesn't have to download it.
          if (id.includes('@fullcalendar')) return 'vendor-calendar';
          // Pure-ESM libs that depend on react but don't trigger
          // Rollup's CJS interop helper are safe to split out.
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('react-icons')) return 'vendor-icons';
          // Bundle react/react-dom together with every CJS dep that
          // calls into React at module top-level (i18next family,
          // react-router). Splitting react and i18next into separate
          // chunks makes Rollup hoist a shared CJS→ESM interop helper
          // into one chunk and import it from the other, creating a
          // circular import. At runtime that cycle causes
          // `React.createContext` to be read before React's exports
          // are initialized → "Cannot read properties of undefined
          // (reading 'createContext')" in the vendor-i18n chunk.
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/') ||
            id.includes('react-router') ||
            id.includes('i18next')
          ) return 'vendor-react';
        },
      },
    },
  },
})
