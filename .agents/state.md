# Durum — akts-landing

Güncelleme: 2026-09-10 | Son araç: claude

## Hedef

`gizlilik-footer-404` dalındaki işi tamamlamak: gizlilik metni, footer ve
404 sayfası eklendikten sonra kalan ince ayarlar.

## Yapıldı

- [x] Gizlilik metni, footer, 404 sayfası (6f2571c)
- [x] Aurora WebGL'e taşındı, footer giriş animasyonu kaldırıldı (81ff62f)
- [x] Harness kuruldu: `AGENTS.md`, `CLAUDE.md`, `.agents/` bu projede
- [x] Kâhya kişi olarak eklendi (2026-09-10): `kahya.svg`, `site.ts`,
      `Logos.tsx` (`i-kahya`), `index.css` (`--c-kahya`). Tip kontrolü
      ve üç viewport görsel sensör temiz, **commit edilmedi**.

## Sıradaki adım

Commit edilmemiş değişiklikler duruyor, gözden geçirilip commit edilecek:

- `src/App.tsx` (değişmiş)
- `src/components/ClickSpark.tsx`, `src/components/CountUp.tsx` (yeni,
  React Bits deseni — `prefers-reduced-motion` guard'ı var mı kontrol et)
- `components.json` değişmiş, yanında `components.json.bak` duruyor —
  yedek silinmeli veya `.gitignore`'a girmeli
- `skillui/` izlenmiyor — depoya mı girecek, `.gitignore`'a mı?
- Kâhya işi de aynı commit'siz yığında.

## Bilinen tuzaklar

- Lint yapılandırması yok; `npm run lint` diye bir script arama.
- Claude Code Browser pane gizliyken boş beyaz kare döndürüyor —
  "görünmüyor" demeden önce `getBoundingClientRect()` ile ölç.
- Playwright **MCP'si** bu makinede çalışmıyor (Chrome yok, Brave var).
  Bunun yerine `harness visual` kullan; paketlenmiş Chromium ile çalışır.
- Kâhya'nın taç+anahtar silueti `currentColor` glif olarak 20 pikselde
  okunmuyor; satır ikonu karo (`i-kahya`) olarak duruyor. Tek renge
  çevirmeyi tekrar deneme.
- Ölçekli SVG'de degradeler `objectBoundingBox` (varsayılan) kalmalı;
  maske ise `userSpaceOnUse` olmalı. İkisi ters kurulursa arma kayıyor.
- `ssh akts` bu makinede auto mode sınıflandırıcısı tarafından
  engelleniyor — sunucudaki kahya-bot kodunu okumak için elle izin gerek.
- `scroll-behavior: smooth` yüzünden `window.scrollTo(y)` erken dönüyor;
  `behavior: 'instant'` kullan.
