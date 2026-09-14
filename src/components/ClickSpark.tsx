import { useEffect, useRef } from 'react'

/**
 * Tıklamada imleçten dışa fırlayan kısa kıvılcımlar.
 * Fikir React Bits'in "Click Spark"ından; burada tek bir tam ekran
 * canvas'a indirildi — her bileşeni sarmalayan wrapper yerine sayfada
 * bir tane var, çünkü efektin bir düzen sorumluluğu yok.
 *
 * Renk tıklanan öğenin --brand'inden geliyor: Aktaş Mail kartı mavi,
 * OyunHub moru saçıyor. Boş bir yere tıklanınca metin rengine düşüyor.
 */

type Spark = { x: number; y: number; angle: number; born: number; color: string }

const COUNT = 8
const DURATION = 420
const REACH = 24
const LENGTH = 11

/** Tıklanan öğenin devraldığı --brand. Custom property'lerin
 *  hesaplanmış değerinde var() zaten çözülmüş olduğu için ("#4d90ff",
 *  "var(--c-mailapp)" değil) canvas'a doğrudan verilebiliyor; kartın
 *  en derindeki <path>'i bile miras yoluyla aynı değeri döndürüyor. */
function resolveBrand(el: Element | null, fallback: string): string {
  if (!el) return fallback
  return getComputedStyle(el).getPropertyValue('--brand').trim() || fallback
}

export function ClickSpark() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let sparks: Spark[] = []
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // dışa doğru hızlı çıkıp yavaşlayan hareket
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparks = sparks.filter((s) => now - s.born < DURATION)

      for (const s of sparks) {
        const t = ease((now - s.born) / DURATION)
        const dist = REACH * t
        const len = LENGTH * (1 - t)
        const cos = Math.cos(s.angle)
        const sin = Math.sin(s.angle)

        ctx.strokeStyle = s.color
        ctx.globalAlpha = 1 - t
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(s.x + cos * dist, s.y + sin * dist)
        ctx.lineTo(s.x + cos * (dist + len), s.y + sin * (dist + len))
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      raf = sparks.length ? requestAnimationFrame(draw) : 0
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null
      const color = resolveBrand(target, getComputedStyle(document.body).color)
      const now = performance.now()
      // hafif rastgele döndürme — her tıklama aynı yıldıza benzemesin
      const offset = Math.random() * Math.PI
      for (let i = 0; i < COUNT; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: offset + (i * 2 * Math.PI) / COUNT,
          born: now,
          color,
        })
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-dvh w-screen"
    />
  )
}
