/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
// import { registerRoute } from 'workbox-routing'
// import { CacheFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)