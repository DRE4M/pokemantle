import { defineNuxtConfig } from 'nuxt/config'
import fluentPlugin from "rollup-plugin-fluent-vue"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@pinia/nuxt"],
  typescript: {
    shim: false,
  },
  routeRules: {
    '/languages': { proxy: 'http://129.225.197.60:8000/languages' },
    '/pokemons': { proxy: 'http://129.225.197.60:8000/pokemons' },
    '/pokemon_name_map/**': { proxy: 'http://129.225.197.60:8000/pokemon_name_map/**' },
    '/rank/**': { proxy: 'http://129.225.197.60:8000/rank/**' },
    '/guess/**': { proxy: 'http://129.225.197.60:8000/guess/**' },
  },
  runtimeConfig: {
    apiServerBase: process.env.POKEMANTLE_API_SERVER_BASE || "http://129.225.197.60:8000",
    public: {
      frontendBase: process.env.POKEMANTLE_FRONTEND_BASE || "http://localhost:3000",
      apiClientBase: process.env.POKEMANTLE_API_CLIENT_BASE || "",
      spriteBase: process.env.POKEMANTLE_SPRITE_BASE || "http://129.225.197.60:8001",
      gtagId: "GA_MEASUREMENT_ID",
    },
  },
  colorMode: {
    classSuffix: "",
  },
  vite: {
    plugins: [fluentPlugin()],
    server: {
      hmr: {
        protocol: "ws", // TODO: parse from env var
        port: 50443,
        clientPort: 50443,
      },
    },
  },
})
