import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Life Manager',
        short_name: 'Life Mgr',
        description: 'Holistic Life Manager — Body · Mind · Recovery',
        theme_color: '#1a1915',
        background_color: '#1a1915',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/lifeManager/',
        start_url: '/lifeManager/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.firebaseio\.com\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'firebase-cache' },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  base: '/lifeManager/',
})
