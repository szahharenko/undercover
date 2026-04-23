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
          if (id.includes('react-router')) return 'vendor-router';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n';
          if (id.includes('@fullcalendar')) return 'vendor-calendar';
          if (id.includes('react-icons')) return 'vendor-icons';
          if (id.includes('react/') || id.includes('react-dom')) return 'vendor-react';
        },
      },
    },
  },
})
