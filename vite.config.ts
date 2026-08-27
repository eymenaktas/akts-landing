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
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    // Üç ayrı sayfa. Router eklenmedi: site tek sayfalık bir hub ve
    // nginx zaten statik dosya servis ediyor — react-router koymak
    // hem paketi büyütür hem de 404'ü sunucu değil JS'in üretmesi
    // demek olurdu (gerçek 404 durum kodu dönmez, SEO'ya zarar).
    rollupOptions: {
      input: {
        index: new URL('./index.html', import.meta.url).pathname,
        gizlilik: new URL('./gizlilik.html', import.meta.url).pathname,
        404: new URL('./404.html', import.meta.url).pathname,
      },
    },
  },
})
