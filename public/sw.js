const CACHE_NAME = 'citybusbd-cache-v3';
const urlsToCache = [
  '/',
  '/offline.html',
  'citybus.jpg'
];
// create the cache
self.addEventListener('install', (event) => {
  console.log('Installing service worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        await cache.addAll(urlsToCache);
      })
  );
});
// delete old caches
self.addEventListener('activate', (event) => {
  console.log('Activating new service worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all([
        // Delete old caches
        ...cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        }),
        // Take control of all clients
        self.clients.claim()
      ]);
    })
  );
});
// network first caching strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Clone the response before using it to update the cache
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      })
      .catch(() => {
        // If fetch fails, try to return from cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, return the offline page
            return caches.match('/offline.html');
          });
      })
  );
});
