import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 5173 is often taken by other local projects.
  server: { port: 5199 },
  preview: { port: 4199 },
});
