/* Smart Shop — cache-first for product images & static assets (weak networks). */
const CACHE = "smartshop-assets-v1";

const CACHEABLE_PATH =
  /^\/(products|categories|brand|videos|uploads|_next\/static|_next\/image)\//;

const CACHEABLE_EXT =
  /\.(webp|png|jpe?g|gif|avif|svg|ico|woff2?|ttf|otf|css|js|mjs|map)(\?.*)?$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (!CACHEABLE_PATH.test(url.pathname) && !CACHEABLE_EXT.test(url.pathname)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok) {
          cache.put(req, res.clone());
        }
        return res;
      } catch (err) {
        const fallback = await cache.match(req);
        if (fallback) return fallback;
        throw err;
      }
    })
  );
});
