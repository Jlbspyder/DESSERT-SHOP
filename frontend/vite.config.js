import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [
    react(),
    envCompatible(),
    nodePolyfills()
  ],
  server: {
    port: 3000,
    proxy:  {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})
