export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registration successful with scope: ', registration.scope);
    } catch (err) {
      console.error('Service Worker registration failed: ', err);
    }
  } else {
    console.warn('Service workers are not supported in this browser');
  }
}
