# akts.tr — landing

`akts.tr` kök alan adının karşılama sayfası. Alan adı altındaki tüm
siteleri ve servisleri tek yerde listeler.

## Yapı

Tek `index.html` — CSS ve JS gömülü, build adımı yok. Logolar sayfanın
sonundaki `<defs>` bloğunda SVG olarak duruyor.

- **Genel** — kişiye bağlı olmayan servisler (Aktaş Mail, OyunHub, n8n)
- **Kişi bölümleri** — her kişi için portfolyo + iletişim satırları

## Yeni kişi ekleme

`index.html` içinde `══ KİŞİ BÖLÜMÜ ══` yorumundaki şablon bloğu
kopyalanır. Üç şeye dikkat:

1. `.mono` içine baş harfler (fotoğraf varsa `<img>`)
2. `--d` gecikmeleri bir öncekinden ~.06s büyük olsun (animasyon sırayla aksın)
3. Her satıra `style="--accent:var(--c-...)"` ile rengini ver

> HTML yorumları iç içe geçemez — şablon bloğunun içine ikinci bir
> `<!-- -->` koyma, ilk `-->` dış yorumu erken kapatır ve şablon canlı
> HTML olarak render olur.

## Tasarım

Taban monokrom; renk yalnızca satır logolarında ve accent'lerde.
Koyu/açık tema, `prefers-color-scheme` + elle geçiş (localStorage).
Aktaş Mail satırının etrafında yumuşak bir hâle var.

## Yayın

Sunucuda `/var/www/akts.tr/`, nginx doğrudan diskten servis ediyor.
Süreç yok, pm2 gerekmiyor.

```bash
scp index.html favicon.svg akts:/var/www/akts.tr/
```
