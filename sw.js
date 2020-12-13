const cacheName = 'course-pwa-v1';

const assetsToCache = [
    'index.html',
    '/'
];

const removeOldCache = key => {
    if(key !== cacheName) {
        return caches.delete(key);
    }
};

const cacheCleanUp = async () => {
    const keyList = await caches.keys();
    return Promise.all(keyList.map(removeOldCache));
};

self.addEventListener('install', event => {
    console.log(`Installing service worker ${event}`);
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(cacheCleanUp());
    return self.clients.claim();
});

const cacheFirst = async (request) => {
    try {
        const cache = await caches.open(cacheName);
        const response = await cache.match(request);
        return response || fetch(request);
    } catch (err) {
        console.log(err);
    }
};

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});