import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    // This ensures that the environment variables are available at build time
    // The actual value will be read from the .env file
    'process.env.VITE_WEBVIS_URL': JSON.stringify(process.env.VITE_WEBVIS_URL),
  },
})