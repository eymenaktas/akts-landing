import { useEffect, useState } from 'react'

/**
 * Bölüm başlığındaki sayıyı 0'dan hedefe sayarak getirir.
 * Kaydırmaya bağlı bir gözlemci yok — sayılar sayfanın üst yarısında,
 * hepsi ilk ekranda görünüyor; tek gereken girişteki `anim` sırasına
 * uyacak kadar beklemek, o yüzden gecikme `delay` ile dışarıdan geliyor.
 */
export function CountUp({
  to,
  delay = 0,
  duration = 0.8,
  className,
}: {
  to: number
  /** saniye — çağıran, satırın `--d` gecikmesini veriyor */
  delay?: number
  duration?: number
  className?: string
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }

    let raf = 0
    const start = performance.now() + delay * 1000
    const ease = (t: number) => 1 - Math.pow(1 - t, 4)

    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / (duration * 1000), 0), 1)
      setValue(Math.round(ease(t) * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, delay, duration])

  return <span className={className}>{value}</span>
}
