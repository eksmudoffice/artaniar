import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(),
    react({
      jsxImportSource: "react",
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        // Cache semua static assets (JS, CSS, images) permanently
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff2}",
        ],
        // Runtime caching: Airtable API responses
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.airtable\.com\/v0\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "artaniar-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
              networkTimeoutSeconds: 5, // kalau API > 5 detik, pakai cache
            },
          },
          {
            // Airtable attachment CDN
            urlPattern: /^https:\/\/v5\.airtableusercontent\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "artaniar-images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Google Fonts
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "artaniar-fonts-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
            },
          },
        ],
        // Skip waiting supaya SW update aktif secepatnya
        skipWaiting: true,
        clientsClaim: true,
      },
      // PWA manifest (untuk installable app - opsional)
      manifest: {
        name: "Artaniar Property",
        short_name: "Artaniar",
        description: "Cari properti Bali dengan filter cepat dan detail lengkap",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "48x48",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
