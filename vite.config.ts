import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  // assetsDir bilerek 'assets' DEĞİL: sunucuda /var/www/akts.tr/assets/
  // altında profile.jpg gibi elle konmuş dosyalar duruyor, dist/ oraya
  // kopyalanınca Vite'ın kendi assets/ klasörü onları ezerdi.
  build: { outDir: 'dist', assetsDir: 'static' },
})
