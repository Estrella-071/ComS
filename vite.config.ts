import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: 'remove-tailwind-cdn',
      transformIndexHtml(html) {
        if (command === 'build') {
          return html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/, '');
        }
        return html;
      },
    }
  ],
  // This ensures assets are linked correctly on GitHub Pages (relative paths)
  base: './',
}))