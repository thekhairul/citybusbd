import { server } from "~/config";

const CACHE_NAME = 'citybusbd-cache-v1';
const BUS_CACHE_KEY = '/api/bus';

async function getCachedBuses() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(BUS_CACHE_KEY);
    if (cachedResponse) {
      return await cachedResponse.json();
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
}

async function fetchAndCacheBuses() {
  try {
    const response = await fetch(`${server}/api/bus`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'referer': server
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const buses = await response.json();
    
    const cache = await caches.open(CACHE_NAME);
    await cache.put(BUS_CACHE_KEY, new Response(JSON.stringify(buses)));
    
    return buses;
  } catch (error) {
    console.error('Error fetching buses:', error);
    throw error;
  }
}

export const findBus = async (fromValue, toValue) => {
  try {
    let buses = await getCachedBuses();
    
    if (!buses) {
      buses = await fetchAndCacheBuses();
    }
    
    return buses.filter(bus => {
      const fromIndex = bus.stopages.findIndex(stop => stop.id === fromValue.id);
      const toIndex = bus.stopages.findIndex(stop => stop.id === toValue.id);
      if (fromIndex === -1 || toIndex === -1) return false;
      return true;
    });
  } catch (error) {
    console.error('Error in findBus:', error);
    throw error;
  }
}
