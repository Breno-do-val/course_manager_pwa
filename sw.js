const cacheName = 'course-pwa-v2';

const assetsToCache = [
    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs',
    'assets/styles/styles.css',
    'assets/js/material.min.js',
    'assets/js/app.js',
    'form.html',
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