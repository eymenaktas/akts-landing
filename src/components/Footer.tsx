/**
 * Alt bilgi. Düzen fikri 21st.dev'in "footer-section" bileşeninden;
 * içeriği ve animasyon tekniği değil.
 *
 * Orijinal bileşen bir SaaS pazarlama footer'ı: Product / Pricing /
 * Testimonials / Changelog / Brand sütunları ve dört sosyal ağ ikonu.
 * akts.tr'de bunların HİÇBİRİ yok — birebir kopyalansaydı sayfa on
 * küsur ölü bağlantıyla dolardı. İçerik `site.ts`'ten geliyor; yeni
 * servis eklendiğinde footer kendiliğinden güncellenir.
 *
 * BU FOOTER'DA GİRİŞ ANİMASYONU YOK — bilerek.
 *
 * Sayfanın geri kalanı `.anim` sınıfını kullanıyor (opacity 0'dan
 * açılan `rise` keyframe'i) ve 21st.dev'in orijinali de `motion` ile
 * aynı şeyi yapıyor. Her iki yaklaşım da içeriği "animasyon çalışana
 * kadar görünmez" yapıyor ve bu üç şekilde patlıyor — üçü de ölçüldü:
 *
 *  1. `whileInView`: sayfanın en altına anında atlandığında üst sütun
 *     görünüm alanının tamamen üstünde kalıyor, IntersectionObserver
 *     hiç tetiklenmiyor, sütun kalıcı olarak görünmez.
 *  2. `motion` + `animate`: sayfa ARKA PLAN SEKMESİNDE açıldığında
 *     motion animasyonu erteliyor. 19 saniye sonra ölçüldü: dört sütun
 *     da `opacity: 0`, inline style hâlâ `blur(4px); opacity: 0`.
 *  3. CSS `.anim`: aynı senaryoda animasyon hiç başlamıyor ve
 *     `animation-fill-mode: both` geriye doğru `from` durumunu
 *     (opacity 0) uyguluyor. Ölçüldü: dört sütun da `0`.
 *
 * Bu footer'da GİZLİLİK BAĞLANTISI var. Hukuki bir bağlantının
 * görünmesi ne kaydırma şansına, ne sekmenin önde olmasına, ne de
 * JS'in çalışmasına bağlanabilir. Footer zaten sayfanın en altında;
 * kullanıcı oraya vardığında animasyon çoktan bitmiş olurdu, yani
 * görsel olarak kaybedilen bir şey de yok.
 *
 * Sayfanın geri kalanındaki `.anim` kullanımına DOKUNULMADI — o
 * sitenin mevcut tasarım kararı ve içeriği hukuki değil.
 */
import { apps, people, services } from '@/data/site'

type FooterLink = { title: string; href: string; external?: boolean }
type FooterColumn = { label: string; links: FooterLink[] }

const columns: FooterColumn[] = [
  {
    label: 'Servisler',
    links: [...apps, ...services].map((s) => ({ title: s.name, href: s.href, external: true })),
  },
  {
    // Kişi bölümündeki bağlantılar — şu an tek kişi var, dizi
    // büyürse ilk kişinin bağlantıları gösterilir.
    label: 'Bağlantılar',
    links: (people[0]?.links ?? []).map((l) => ({
      title: l.name,
      href: l.href,
      external: true,
    })),
  },
  {
    label: 'Yasal',
    // Uzantılı adres bilerek. Sunucudaki kural şu an
    // `try_files $uri $uri/ /index.html` — yani `/gizlilik` diye
    // bağlarsak nginx dosyayı bulamayıp SESSİZCE ana sayfayı döndürür.
    // `.html` her iki yapılandırmada da doğru sayfayı açar.
    links: [{ title: 'Gizlilik', href: '/gizlilik.html' }],
  },
]

export function Footer() {
  return (
    <footer
      className="relative mt-16 border-t pt-12 pb-8"
      style={{ borderColor: 'hsl(var(--hairline))' }}
    >
      {/* Üst kenardaki ince ışık çizgisi — 21st.dev bileşeninden.
          Orijinali `bg-foreground/20`; burada hairline token'ı
          kullanıldı ki iki temada da aynı yoğunlukta kalsın. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px]"
        style={{ background: 'hsl(var(--hairline-hi))' }}
      />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--c-mailapp)' }}
              aria-hidden="true"
            />
            akts.tr
          </div>
          <p className="max-w-[28ch] text-[13px] leading-relaxed text-dim">
            Bu alan adı altındaki siteler ve servisler. Analitik yok, izleme yok.
          </p>
          <p className="pt-2 text-[13px] text-dim">© {new Date().getFullYear()} akts.tr</p>
        </div>

        {columns.map((column) => (
          <div key={column.label}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-dim">
              {column.label}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {column.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
