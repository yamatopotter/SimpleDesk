import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "SimpleDesk",
        description: "The simplest helpdesk ticket solution",
        short_name: "SimpleDesk",
        start_url: "/",
        scope: ".",
        background_color: "#fff",
        theme_color: "#8B5CF6",
        icons: [
          {
            src: "/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any maskable",
          },
          ,
          {
            src: "/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          ,
          {
            src: "/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          ,
          {
            src: "/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname == import.meta.env.VITE_BACKEND_URL;
            },
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
