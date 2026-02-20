const CACHE = 'ruffle-me-v1';

const PRECACHE = [
    './',
    './index.html',
    './manifest.json',
    './icons/apple-touch-icon.png',
    './icons/icon-192.png',
    './icons/icon-512.png',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(c => c.addAll(PRECACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;

    e.respondWith(
        caches.match(e.request).then(hit => {
            if (hit) return hit;

            return fetch(e.request).then(res => {
                // Cache successful same-origin responses
                if (res.ok && e.request.url.startsWith(self.location.origin)) {
                    caches.open(CACHE).then(c => c.put(e.request, res.clone()));
                }
                return res;
            }).catch(() => {
                // Offline fallback: return cached index for navigation
                if (e.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
