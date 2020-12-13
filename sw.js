const cacheName = 'course-pwa-v1';

const assetsToCache = [
    'index.html',
    '/'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
    );
    self.skipWaiting();
})
