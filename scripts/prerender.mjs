#!/usr/bin/env node
/**
 * Post-build pre-rendering script.
 *
 * After `vite build` produces the SPA in /dist, this script:
 * 1. Spins up a local static server serving /dist
 * 2. Visits each route with Puppeteer
 * 3. Captures the fully-rendered HTML (with all meta tags, content, etc.)
 * 4. Saves it as /dist/<route>/index.html
 *
 * This means Google/Bing bots will see real content instead of an empty div.
 *
 * SETUP:
 *   npm install puppeteer --save-dev
 *
 * USAGE:
 *   node scripts/prerender.mjs
 *   (or add to package.json: "build": "tsc -b && vite build && node scripts/prerender.mjs")
 */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

const ROUTES = [
  '/',
  '/about',
  '/pricing',
  '/boardgames',
  '/events',
  '/events-and-trainings',
  '/free-trial',
];

// Simple static file server
function startServer() {
  const mime = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
  };

  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

    // SPA fallback: if file doesn't exist, serve index.html
    if (!existsSync(filePath)) {
      filePath = join(DIST_DIR, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = '.' + filePath.split('.').pop();
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('Starting pre-rendering...\n');

  const server = await startServer();
  const browser = await launch({ headless: true, args: ['--no-sandbox'] });

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`  Rendering: ${route}`);

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait a bit for React to hydrate and useSEO to set meta tags
    await page.waitForSelector('h1, h2, [class*="hero"]', { timeout: 10000 }).catch(() => {});

    const html = await page.content();
    await page.close();

    // Write the rendered HTML
    const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route);
    const outputFile = join(outputDir, 'index.html');

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputFile, html, 'utf-8');
    console.log(`  ✓ Saved: ${outputFile}\n`);
  }

  await browser.close();
  server.close();

  console.log(`\nPre-rendering complete! ${ROUTES.length} pages rendered.`);
  console.log('Search engines will now see real content on each page.');
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
