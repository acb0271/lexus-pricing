self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...');
  event.waitUntil(
      caches.open('static').then(cache => {
          console.log('[Service Worker] Precaching App Shell...');
          return cache.addAll([
              '/index.html',
              '/manifest.json',
              '/images/icon-192x192.png',
              '/images/icon-512x512.png',
              '/libs/html2pdf.bundle.min.js'
          ]);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetching resource...', event.request.url);
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching resource...', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        console.error('[Service Worker] Failed to fetch:', event.request.url);
      });
    })
  );
});
