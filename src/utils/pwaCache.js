const CACHE_NAME = 'citybusbd-cache-v2';
const LAST_UPDATED_KEY = 'lastBusUpdatedAt';

export const syncBusCache = async (newBusUpdatedAt) => {
    if (!newBusUpdatedAt) {
        console.error('syncBusCache: newBusUpdatedAt is required');
        return;
    }

    try {
        const cache = await caches.open(CACHE_NAME);
        const lastUpdatedResponse = await cache.match(LAST_UPDATED_KEY);
        const lastBusUpdatedAt = lastUpdatedResponse ? await lastUpdatedResponse.text() : null;
        if (Number(lastBusUpdatedAt) !== newBusUpdatedAt) {
            await cache.put(LAST_UPDATED_KEY, new Response(newBusUpdatedAt));
            const busDataResponse = await fetch('/api/bus');
            console.log('updating bus data');
            await cache.put('/api/bus', busDataResponse.clone());
        } else {
            console.log('Bus data is already up to date');
        }
    } catch (error) {
        console.error('Error syncing bus cache:', error);
    }
};
