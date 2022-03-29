import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from "vite-plugin-pages";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
      react(),
      Pages({
        pagesDir: "src/pages",
        exclude: ["**/components/*.jsx"],
      }),
  ]
})
