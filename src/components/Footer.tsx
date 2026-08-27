/**
 * Alt bilgi. Yapı ve giriş animasyonu 21st.dev'in "footer-section"
 * bileşeninden; içerik değil.
 *
 * Orijinal bileşen bir SaaS pazarlama footer'ı: Product / Pricing /
 * Testimonials / Changelog / Brand sütunları ve dört sosyal ağ ikonu.
 * akts.tr'de bunların HİÇBİRİ yok — birebir kopyalansaydı sayfa on
 * küsur ölü bağlantıyla dolardı. O yüzden korunanlar:
 *
 *   - `AnimatedContainer` deseni ve kademeli gecikme
 *   - `useReducedMotion` ile animasyonu tamamen atlama
 *   - ızgara düzeni ve üstteki ince ışık çizgisi
 *
 * BİR HATA DÜZELTİLDİ. Orijinal bileşen açılışı `whileInView` ile
 * yapıyor: eleman `opacity: 0` başlıyor ve IntersectionObserver
 * tetiklenince görünür oluyor. Sayfanın en altına anında atlandığında
 * (bağlantı çapası, tarayıcının konum geri yüklemesi, Cmd+↓) footer'ın
 * üst sütunu görünüm alanının TAMAMEN üstünde kalıyor, observer hiç
 * tetiklenmiyor ve sütun kalıcı olarak görünmez kalıyor. Ölçüldü:
 * `opacity: 0`, `filter: blur(4px)`, diğer üç sütun 1.
 *
 * Bu footer'da gizlilik bağlantısı var; hukuki bir bağlantının görünüp
 * görünmemesi kaydırma şansına bırakılamaz. O yüzden açılış
 * `whileInView` yerine `animate` ile — yani bileşen bağlanır bağlanmaz.
 * Footer zaten sayfanın en altında; kullanıcı oraya vardığında
 * animasyon çoktan bitmiş oluyor, görsel olarak kaybedilen bir şey yok.
 *
 * İçerik `site.ts`'ten geliyor. Yeni servis eklendiğinde footer
 * kendiliğinden güncellenir; burada değişiklik gerekmez.
 */
import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { people, services } from '@/data/site'

type FooterLink = { title: string; href: string; external?: boolean }
type FooterColumn = { label: string; links: FooterLink[] }

const columns: FooterColumn[] = [
  {
    label: 'Servisler',
    links: services.map((s) => ({ title: s.name, href: s.href, external: true })),
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
        <AnimatedContainer className="space-y-3">
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
        </AnimatedContainer>

        {columns.map((column, index) => (
          <AnimatedContainer key={column.label} delay={0.1 + index * 0.08}>
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
          </AnimatedContainer>
        ))}
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  // Orijinal bileşen burada çıplak `children` döndürüyor ve sarmalayıcı
  // div'i kaybediyor; className'i de birlikte kaybediyor, düzen bozuluyor.
  // Burada div korunuyor, yalnızca hareket atılıyor.
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      animate={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
