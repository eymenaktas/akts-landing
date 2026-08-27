import type { CSSProperties } from 'react'
import { Aurora } from '@/components/Aurora'
import { Footer } from '@/components/Footer'
import { LogoDefs } from '@/components/Logos'
import { PersonSection } from '@/components/PersonSection'
import { ServiceCard } from '@/components/ServiceCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { people, services } from '@/data/site'

function SectionTitle({
  children,
  count,
  delay,
}: {
  children: string
  count: number
  delay: number
}) {
  return (
    <div
      className="anim mb-5 flex items-center gap-3"
      style={{ '--d': `${delay}s` } as CSSProperties}
    >
      <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-dim">{children}</h2>
      <span className="text-xs tabular-nums text-dim">{count}</span>
      <span className="h-px flex-1" style={{ background: 'hsl(var(--hairline))' }} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Aurora />
      {/* İnce nokta dokusu — düz zemine derinlik veriyor, okunurluğa
          dokunmayacak kadar soluk (%. birkaç). */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35] [background-size:22px_22px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--hairline)) 1px, transparent 0)',
        }}
      />
      <LogoDefs />

      <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-6 sm:px-8">
        <header className="flex items-center justify-between py-6">
          <a
            href="/"
            className="group flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <span
              className="h-1.5 w-1.5 rounded-full motion-safe:animate-breathe"
              style={{ background: 'var(--c-mailapp)', animationDuration: '7s' }}
              aria-hidden="true"
            />
            akts.tr
          </a>
          <ThemeToggle />
        </header>

        <main className="my-auto flex-1 pb-10 pt-10 sm:pt-16">
          <h1
            className="anim max-w-[16ch] text-[clamp(2.25rem,7.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.045em]"
            style={{ '--d': '.02s' } as CSSProperties}
          >
            akts.tr'ye{' '}
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              hoş geldiniz
            </span>
          </h1>
          <p
            className="anim mt-5 max-w-[48ch] text-[clamp(1rem,2vw,1.15rem)] leading-relaxed text-muted-foreground"
            style={{ '--d': '.09s' } as CSSProperties}
          >
            Bu alan adı altındaki tüm siteler ve servisler aşağıda.
          </p>

          <section className="mt-14">
            <SectionTitle count={services.length} delay={0.17}>
              Genel
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((item, i) => (
                <ServiceCard key={item.href} item={item} delay={0.23 + i * 0.06} />
              ))}
            </div>
          </section>

          {/* Yeni kişi eklemek için src/data/site.ts içindeki `people`
              dizisine bir nesne ekle — burada değişiklik gerekmiyor. */}
          <section className="mt-14">
            <SectionTitle count={people.length} delay={0.41}>
              Kişiler
            </SectionTitle>
            <div className="grid gap-4">
              {people.map((person, i) => (
                <PersonSection key={person.name} person={person} delay={0.47 + i * 0.08} />
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
