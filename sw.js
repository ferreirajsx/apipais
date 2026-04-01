const CACHE = 'meu-app-v5';
const ARQUIVOS = ['/', '/index.html', '/style.css', '/script.js'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});