import type { CSSProperties } from 'react'
import { Logo } from '@/components/Logos'
import type { Link } from '@/data/site'

/**
 * Kişi bölümlerindeki satır. Kart değil bilerek: bir kişinin iki üç
 * bağlantısı kart olsaydı üstteki servis kartlarıyla aynı ağırlıkta
 * görünürdü, oysa hiyerarşide altındalar.
 * Hover davranışı .link-row içinde (index.css) — üç öge birden
 * accent rengine geçiyor, kararı tek yerde tutmak için.
 */
export function LinkRow({ item, delay }: { item: Link; delay: number }) {
  return (
    <li className="anim" style={{ '--d': `${delay}s` } as CSSProperties}>
      <a href={item.href} className="link-row" style={{ '--brand': item.accent } as CSSProperties}>
        <Logo name={item.icon} className="row-ico h-5 w-5 shrink-0" />
        <span className="whitespace-nowrap font-medium tracking-[-0.018em]">{item.name}</span>
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{item.desc}</span>
        <span className="row-arw" aria-hidden="true">
          →
        </span>
      </a>
    </li>
  )
}
