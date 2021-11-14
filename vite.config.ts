import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    strategies: 'injectManifest',
    filename: 'workbox.ts',
    srcDir: 'src',
    includeAssets: [
      '**/*.js',
    ],
    manifest: {
      "background_color": "#00cc66",
      "description": "ترجمه قرآن کریم",
      "display": "standalone",
      "name": "قرآن کریم",
      "short_name": "قرآن",
      "start_url": "/",
      "theme_color": "#ffcc00",
      "icons": [
        {
            "src": "/favicon/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/favicon/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    },
  })]
})
