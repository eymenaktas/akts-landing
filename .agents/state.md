# Durum — akts-landing

Güncelleme: 2026-09-19 | Son araç: claude

## Hedef

`gizlilik-footer-404` dalı tamamlandı ve push edildi. Landing tarafında
açık iş kalmadı; sıradaki iş Ezan Vaktim uygulamasında
(`~/Desktop/projects/ezan-vaktim`).

## Yapıldı

- [x] Gizlilik metni, footer, 404 sayfası (6f2571c)
- [x] Aurora WebGL'e taşındı, footer giriş animasyonu kaldırıldı (81ff62f)
- [x] Harness kuruldu: `AGENTS.md`, `CLAUDE.md`, `.agents/`
- [x] ClickSpark + CountUp efektleri, `components.json` React Bits kaydı,
      `skillui/` ve `yedek/` gitignore'a alındı (5f2892d)
- [x] **Kâhya landing'den kaldırıldı** (d65d152): `people` girdisi,
      `i-kahya` karosu, `--c-kahya`, `public/assets/kahya.svg` silindi.
      `kahya.akts.tr` sunucuda açık kalmaya devam ediyor.
- [x] **"Yakında" bölümü + Ezan Vaktim kartı** (d65d152): `UpcomingCard`
      bileşeni, `upcoming` dizisi, `i-ezan` hilâl glifi, `--c-ezan`.
      Kart bilerek bağlantı değil (site yok, yalnız bilgi).
- [x] Tip kontrolü, secret taraması ve üç viewport görsel sensör temiz
- [x] Dal push edildi: `origin/gizlilik-footer-404`

- [x] **StudyTrack kartı** (6105b9f): `services`'te, `https://studytrack.tr`'ye
      gidiyor. Glif eski StudyTrack logosunun (kitap + onay) tek renk hâli,
      renk `#4cb572` doğrudan glifte (diğer glifler gibi; currentColor
      kartta siyah kalıyordu).
- [x] **Canlıya çıktı** (2026-09-19): `dist/` → `/var/www/akts.tr/`
      (`ezan/`, `studytrack/` dizinlerine dokunulmadan). Önceki canlı
      2 Eylül derlemesiydi; Kâhya kaldırma ve Ezan kartı da ilk kez
      canlıya çıktı. Yedek: `/root/akts.tr-yedek-2026-09-19.tgz`.

- [x] **Ezan Vaktim `services`'e taşındı** → `https://ezan.akts.tr`,
      **BlankReel eklendi** → `https://blankreel.com` (sitenin kendi işareti,
      koyu karo). `upcoming` boş; "Yakında" bölümü boşken gizleniyor
      (72d4486). Canlıda. Yedek: `/root/akts.tr-yedek-2026-09-19b.tgz`.

## Sıradaki adım

Landing'de iş yok. Yeni bir "yakında" işi olursa `upcoming` dizisine eklemek
yeter, bölüm kendiliğinden görünür.

## Bilinen tuzaklar

- **Başka bir oturum da bu depoda çalışıyor** (OyunHub: `src/data/legal.ts`,
  `.claude/launch.json`'da `oyunhub*` girdileri, commit'lenmemiş). Onları
  commit'leme; canlıya çıkarken çalışma ağacından değil, commit'ten
  `git worktree add --detach` ile derle (node_modules'u symlink'le).

- Lint yapılandırması yok; `npm run lint` diye bir script arama.
- Dev sunucusu `.claude/launch.json`'da **4180** portunda, 5173'te değil.
  Görsel sensörü `HARNESS_URL=http://localhost:4180` ile çalıştır.
- Browser pane'de `computer{action:"zoom"}` bölge kırpmayı desteklemiyor,
  tam ekran görüntüsü döndürüyor. Küçük glifi büyütüp bakmak için öğeyi
  JS ile geçici klonlayıp büyütmek gerekiyor.
- Browser pane ekran görüntüsü DOM değişikliğinin bir tur gerisinde
  kalabiliyor; JS ile öğe ekledikten sonra ilk screenshot boş çıktı,
  ikincisinde göründü. Bir kare daha al, "olmadı" deme.
- `scroll-behavior: smooth` yüzünden `window.scrollTo(y)` erken dönüyor;
  `behavior: 'instant'` kullan. `scrollIntoView` da aynı sebeple ilk
  görüntüde yansımayabiliyor.
- Playwright MCP'si bu makinede çalışmıyor (Chrome yok, Brave var).
  Bunun yerine `harness visual` — paketlenmiş Chromium ile çalışıyor.
- Ölçekli SVG'de degradeler `objectBoundingBox` (varsayılan) kalmalı;
  maske ise `userSpaceOnUse` olmalı.
- Canlıya çıkış elle: `npm run build` sonra `rsync -a dist/ akts:/var/www/akts.tr/`
  (**`--delete` kullanma**: `ezan/` ve `studytrack/` APK dizinleri orada).
