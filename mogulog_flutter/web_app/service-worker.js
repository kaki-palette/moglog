const CACHE_NAME = "mogulog-shell-v6";
const APP_ROOT_URL = new URL("./", self.location.href).toString();
const API_PATH = new URL("api/", APP_ROOT_URL).pathname;
const AUTH_PATH = new URL("auth", APP_ROOT_URL).pathname;
const APP_SHELL = [
  "./",
  "index.html",
  "config.js",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "assets/occhiali-oga-antipasto.jpg"
].map(path => new URL(path, APP_ROOT_URL).toString());

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.startsWith(API_PATH) || requestUrl.pathname.startsWith(AUTH_PATH)) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(APP_ROOT_URL, copy));
          return response;
        })
        .catch(() => caches.match(APP_ROOT_URL) || caches.match(new URL("index.html", APP_ROOT_URL).toString()))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        if (event.request.method === "GET" && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }))
  );
});
