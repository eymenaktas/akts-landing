import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/Logos'
import type { App } from '@/data/site'

/** Uygulama vitrini: üstte uygulamanın kendi renginde panel ve gerçek ekran, altta künye. */
export function AppShowcase({ app, delay }: { app: App; delay: number }) {
  return (
    <a
      href={app.href}
      className="anim group block overflow-hidden rounded-[.75rem] border bg-card shadow-[inset_0_1px_#ffffffe6,0_1px_2px_#0000000a] transition-[border-color,transform] duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-foreground/20"
      style={{ '--d': `${delay}s` } as CSSProperties}
    >
      <div className="relative h-72 overflow-hidden" style={{ background: app.tint }}>
        {/* Gerçekçi telefon: metal kasa, ince çerçeve, ön kamera. Alt kısmı panelin dışına taşıyor. */}
        <div className="absolute left-1/2 top-10 w-[188px] -translate-x-1/2 rounded-[32px] bg-[linear-gradient(90deg,#8d9591,#eef2ef_6%,#b9c1bd_12%,#6f7773_50%,#b9c1bd_88%,#eef2ef_94%,#8d9591)] p-[3px] shadow-[0_24px_48px_-16px_rgba(0,0,0,.5)] transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.32,.44,1)] group-hover:-translate-y-2">
          <div className="relative rounded-[29px] bg-[#050807] p-[6px]">
            <img
              src={app.shot}
              alt={`${app.name} ekranı`}
              loading="lazy"
              className="block w-full rounded-[23px]"
            />
            <span className="absolute left-1/2 top-[14px] h-2 w-2 -translate-x-1/2 rounded-full bg-black ring-2 ring-[#0d1110]" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-t p-5 sm:p-6">
        <Logo name={app.icon} className="h-12 w-12 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-[-0.02em]">{app.name}</span>
            <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <p className="text-sm text-muted-foreground">{app.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{app.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {app.tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}
