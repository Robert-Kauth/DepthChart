import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Flask serves the production build from app/static at /static/
  base: command === 'build' ? '/static/' : '/',
  server: {
    // Replaces the CRA "proxy" setting: forward API and socket.io traffic to Flask
    proxy: {
      '/api': 'http://localhost:5000',
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
      },
    },
  },
}))
