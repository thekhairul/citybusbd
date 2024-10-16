const CACHE_NAME = 'citybusbd-cache-v1';
const urlsToCache = [
  '/',
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
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Update cache with fresh data
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }).catch(() => {
          // If fetch fails, return cached response or a custom offline page
          return cachedResponse || caches.match('/offline.html');
        });

        // Immediately return cached response if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
  );
});
