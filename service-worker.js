self.addEventListener('install', function (e) {
  console.log('Service Worker instalado')
  e.waitUntil(
    caches.open('despesas-cache-v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        '/src/icon/icon-192.png',
        '/src/icon/icon-512.png'
      ])
    })
  )
})

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request)
    })
  )
})
