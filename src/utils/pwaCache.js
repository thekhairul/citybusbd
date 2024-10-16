const CACHE_NAME = 'citybusbd-cache-v1';
const LAST_UPDATED_KEY = 'lastBusUpdatedAt';
const BROADCAST_CHANNEL_NAME = 'bus-data-update';

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
            notifyDataUpdate();
        } else {
            console.log('Bus data is already up to date');
        }
    } catch (error) {
        console.error('Error syncing bus cache:', error);
    }
};

const notifyDataUpdate = () => {
    try {
        console.log('Broadcasting update');
        const broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        broadcastChannel.postMessage({ type: 'NEW_BUS_DATA_AVAILABLE' });
        broadcastChannel.close();
    } catch (error) {
        console.error('Error broadcasting update:', error);
    }
};
