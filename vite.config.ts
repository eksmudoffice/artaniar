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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries — heavy deps yang jarang berubah
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select", "@radix-ui/react-tabs", "@radix-ui/react-accordion", "@radix-ui/react-slider", "@radix-ui/react-popover", "@radix-ui/react-tooltip", "@radix-ui/react-scroll-area", "@radix-ui/react-separator", "@radix-ui/react-checkbox", "@radix-ui/react-slot", "@radix-ui/react-label", "@radix-ui/react-radio-group"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-charts": ["recharts"],
          "vendor-utils": ["cmdk", "vaul", "sonner"],
        },
      },
    },
    // Split chunks lebih kecil untuk better caching
    chunkSizeWarningLimit: 500,
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
