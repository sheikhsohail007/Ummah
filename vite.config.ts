import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Relative base ensures all paths work correctly
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
