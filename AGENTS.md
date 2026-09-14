# akts-landing

Global kurallar `~/harness/AGENTS.md` içinde ve zaten yüklü. Burada yalnız
bu projeye özgü olanlar var.

## Ne bu proje

akts.tr'nin landing sayfası. Eymen'in kişisel portfolyo sitesi; kasadaki
`eymen-akts-tr` sayfası bu projenin kaynağı. Depo private.

## Yığın

React 19 + TypeScript + Vite 8 + Tailwind 3 + shadcn/ui (Radix Slot, CVA).
WebGL efektleri için `ogl`. İkonlar `lucide-react`.

Sayfanın React dışında kalan parçaları: `gizlilik.html`, `404.html`,
`logolar/` (logo jeneratörü).

## Komutlar

| İş | Komut |
|---|---|
| Geliştirme sunucusu | `npm run dev` (Vite, 5173) |
| Derleme | `npm run build` |
| Önizleme | `npm run preview` |
| Tip kontrolü | `npx tsc --noEmit` |

Lint yapılandırması yok — sensörlerde `lint` atlanıyor, tip kontrolü koşuyor.

## Bu projede dikkat

- **Tasarım dili bağlayıcı:** `akts-design` skill'i bu proje için
  yazıldı, diğer tasarım skill'lerini ezer. Renk, tipografi, boşluk
  gridi ve bileşen desenleri oradan alınır.
- **Logo işi:** yeni logo/karo gerekince kasadaki `akts-gorsel-dili`
  sayfasını oku — tek üreteç betiği var, `userSpaceOnUse` tuzağı ve
  "20 pikselde bak" kuralı orada.
- **Arayüz doğrulama:** CSS/düzen değişikliğinden sonra
  `HARNESS_URL=http://localhost:5173 harness visual` çalıştır. Kasadaki
  `arayuz-dogrulama` sayfası bu projede bir günde dört kez tekrarlanan
  hataları kaydediyor.
- **Aurora WebGL'e taşındı** (81ff62f). Efekt eklerken
  `prefers-reduced-motion` guard'ı elle yazılmalı — React Bits
  desenlerinde yok.

## Devir

Oturum başında `.agents/state.md` oku, durmadan önce güncelle.
