# akts.tr — landing

`akts.tr` kök alan adının karşılama sayfası. Alan adı altındaki tüm
siteleri ve servisleri tek yerde listeler.

## Yapı

Vite + React + TypeScript + Tailwind, shadcn/ui kurulumu hazır.
(2026-08-26'ya kadar tek dosya, gömülü CSS'li düz HTML'di; eski hâli
`git show 815516a:index.html` ile açılır.)

```
index.html          Vite girişi — tema, FOUC'u önlemek için burada yazılıyor
src/
  App.tsx           sayfa düzeni
  index.css         tasarım token'ları (shadcn biçiminde) + özel sınıflar
  data/site.ts      SAYFANIN TÜM İÇERİĞİ — servisler ve kişiler
  components/
    Aurora.tsx      üstteki renk sisi (blur'lu gradient, WebGL yok)
    GlowCard.tsx    imleci takip eden kenar parıltısı
    Logos.tsx       SVG logo tanımları (<defs> + <use>)
    ServiceCard.tsx servis kartı — normal ve "öne çıkan" geniş biçim
    LinkRow.tsx     kişi bölümlerindeki bağlantı satırı
    PersonSection.tsx
    ThemeToggle.tsx
    ui/             shadcn/ui bileşenleri
```

## Geliştirme

```bash
npm install
npm run dev
```

## Yeni kişi / servis ekleme

`src/index.html` kopyalanacak blok yok — **`src/data/site.ts`** içindeki
`people` ya da `services` dizisine bir nesne ekle. Animasyon gecikmeleri
ve düzen kendiliğinden hesaplanıyor.

Yeni bir logo gerekiyorsa `src/components/Logos.tsx` içindeki `<defs>`
bloğuna bir `<g id="i-...">` ekle ve adını `LogoName` tipine yaz.

## Bileşen kaynağı: 21st.dev

Proje shadcn/ui kurallarına göre kuruldu, `components.json` yerinde.
[21st.dev](https://21st.dev) bileşenleri doğrudan kurulabilir:

```bash
npx shadcn@latest add "https://21st.dev/r/<kullanıcı>/<bileşen>"
```

> 21st.dev kayıt defteri **hesap istiyor** — giriş yapılmadan kod
> indirilemiyor (`{"error":"Authentication required"}`). Ücretsiz hesap
> açıp giriş yaptıktan sonra komut çalışıyor.

## Tasarım kararları

- Taban monokrom; renk yalnızca servis kartlarının/satırlarının
  accent'inde. Bu accent CSS'te **`--brand`** adını taşıyor, `--accent`
  değil — `--accent` shadcn/ui'nin kendi token'ı, çakışsaydı içine
  konan her shadcn bileşeni sessizce yanlış renk alırdı.
- Koyu/açık tema; `prefers-color-scheme` + elle geçiş (localStorage).
  **Tema geçişinde animasyon yok** — gövde rengi yumuşak geçerken kart
  zeminleri anında değiştiği için yazılar yarım saniye kayboluyordu.
- Aktaş Mail "öne çıkan": satırın tamamını kaplayan geniş kart,
  etrafında yavaş nefes alan bir hâle (7 sn).
- `--dim` rengi ölçülerek seçildi: açık temada 4.5:1, koyuda 4.9:1.
  Önceki değerler 2.7:1 ve 3.1:1'di.
- `prefers-reduced-motion` tüm animasyonları kapatıyor.

## Yayın

Sunucuda `/var/www/akts.tr/`, nginx doğrudan diskten servis ediyor.
Süreç yok, pm2 gerekmiyor.

```bash
npm run build && rsync -av dist/ akts:/var/www/akts.tr/
```

> **`--delete` KULLANMA.** `/var/www/akts.tr/` altında bu depoya ait
> olmayan iki klasör var — `media/` ve `tiktok/callback/` (n8n'in
> Reddit/TikTok kolu, sahibi `www-data`). `--delete` ikisini de siler.
>
> Vite çıktısı `dist/static/` altına yazılıyor, `dist/assets/` altına
> **değil**: sunucudaki `/var/www/akts.tr/assets/` elle konmuş
> dosyalar için, `assets` adı kullanılsaydı her yayında üstüne yazardı.
>
> Eski `static/` dosyaları `--delete` olmadığı için birikir; ara sıra
> elle temizlemek gerekebilir (`ssh akts 'ls /var/www/akts.tr/static'`).
