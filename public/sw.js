const CACHE_NAME = 'citybusbd-cache-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  'citybus.jpg'
];

// Create a broadcast channel
const broadcastChannel = new BroadcastChannel('bus-data-update');

self.addEventListener('install', (event) => {
  console.log('Installing service worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        await cache.addAll(urlsToCache);
      })
  );
});

// Listen for messages from the Next.js app
broadcastChannel.onmessage = (event) => {
  console.log('Received message:', event.data);
  if (event.data && event.data.type === 'NEW_BUS_DATA_AVAILABLE') {
    updateBusData();
  }
};

async function updateBusData() {
  console.log('Updating bus data');
  const cache = await caches.open(CACHE_NAME);
  try {
    const busDataResponse = await fetch('/api/bus');
    await cache.put('/api/bus', busDataResponse.clone());
    console.log('Bus data updated in cache');
  } catch (error) {
    console.error('Error updating bus data:', error);
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname === '/api/busUpdatedAt') {
    // Network-first strategy for '/api/busUpdatedAt'
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache-first strategy for other requests
    event.respondWith(
      caches.match(event.request, {ignoreSearch: true, nocache: true})
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then((networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response before using it to update the cache
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          }).catch(() => {
            // If fetch fails, return a custom offline page
            return caches.match('/offline.html');
          });
        })
    );
  }
});
