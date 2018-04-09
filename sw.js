---
layout: null
---
/*
# PWA: Service Worker
Adaptat de https://preview.pwabuilder.com/serviceworker (Cache-first network)
*******************************************************************************/
// var CACHE = "{{- site.pwa.manifest.name -}}-{{- site.time | date: '%Y-%m-%d-%H-%M' -}}";
var CACHE = "{{- site.pwa.manifest.name -}}-precache";
var precacheFiles = [
  {%- for urls in site.pwa.sw_cache -%}
    "{{- urls -}}",
  {%- endfor -%}
  {%- for post in site.posts limit: 6 -%}
    "{{- post.url -}}",
  {%- endfor -%}
];

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
    return self.skipWaiting();
  }));
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request) {
  return fetch(request).then(function(response){ return response})
}
