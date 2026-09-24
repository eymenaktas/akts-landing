# Durum — akts-landing

Güncelleme: 2026-09-24 | Son araç: claude

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

- [x] **Ezan karosundaki hilâl düzeltildi** (cd7833e): eski yol iki dairenin
      evenOdd farkıydı, iç daire dışarı taştığı için sağda ince bir şerit
      çıkıyordu. Artık kesişim noktalarından geçen gerçek yay yolu. Aynı
      düzeltme ezan-vaktim deposundaki altı dosyada da yapıldı. Canlıda.

- [x] **akts.tr/maske/** (2026-09-24): Maske CPvP paket kurucusu bu alanda
      yayında ama kaynağı bu depoda değil: `~/Desktop/projects/maske-pack`.
      Landing derlemesini çıkarırken `maske/` klasörüne dokunma.

- [x] **Paylaşım görselleri** (2026-09-24): `scripts/og-image.mjs` (harness Playwright
      ile 1200x630). akts.tr `public/og.png`; aynı üreticiyle maske, eymen (websitesi),
      mail (aktas-mail) ve oyun (web2) görselleri. `theme-color` Discord şeridinin rengi.
      Canlıya çıktı; yedek `/root/akts.tr-yedek-2026-09-24.tgz`.
- [x] **cpvp.io ve Kâhya kapatıldı** (2026-09-24): nginx bağlantıları kaldırıldı,
      `kahya.akts.tr` bloğu `akts.tr` ayarından çıkarıldı, `cpvp-discord` pm2'de durduruldu.
      Geri açmak için yedek: `/root/kapatilan-2026-09-24/`.

- [x] **OyunHub gizlilik metni** (61f95fc): oyun sayaçları eklendi, Internet Archive
      çıkarıldı. Canlıda; yedek `/root/akts.tr-yedek-2026-09-24b.tgz`.

## Sıradaki adım

Landing'de iş yok. Yeni bir "yakında" işi olursa `upcoming` dizisine eklemek
yeter, bölüm kendiliğinden görünür.

## Bilinen tuzaklar

- **Commit kimliği `eymen@akts.tr`.** 2026-09-23'te bu depo dahil 9 depoda
  `gizliman2345@gmail.com` (GitHub'da `nemyontop`) geçmişten silindi ve
  force-push edildi; eski SHA'lar (ör. 5039d04) artık yok.

- `.claude/launch.json` önizleme girdileri (oyunhub, maske-site, portfolyo…) yerel;
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
  (**`--delete` kullanma**: `ezan/`, `studytrack/` ve `maske/` dizinleri orada).
- `.claude/launch.json`'daki `maske-site` girdisi maske-pack önizlemesi içindir;
  landing commit'ine girmesin.
