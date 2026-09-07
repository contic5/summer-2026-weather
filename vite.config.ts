import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/summer-2026-weather/', // match your repo name exactly
  plugins: [react()],
  build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },
})
