# PWA Sample Application

This project is a simple Progressive Web App built with [Vite](https://vitejs.dev/). It demonstrates multiple pages, offline support and a basic service worker for caching assets and navigation routes.

## Development

Install dependencies and run a local dev server:

```bash
npm install
npm run dev
```

The site will be available at the URL printed in the console.

## Building and Previewing

Create a production build:

```bash
npm run build
```

To serve the built files locally use Vite's preview command:

```bash
npm run serve
```

This serves the contents of the `dist` folder so you can test the production build locally.

## Service Worker

The service worker lives in `public/sw.js`. It caches the app shell and pages for offline support. Whenever you change what should be cached, update the `CACHE_NAME` constant so users get the new assets. After modifying `sw.js`, rebuild the project so the updated file is copied to `dist`.

## Contributing Notes

- Keep HTML files and assets at project root so they are included in the Vite build.
- The service worker expects the offline fallback page at `offline.html`.
- Feel free to open issues or PRs for improvements.

