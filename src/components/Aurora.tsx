/**
 * Sayfanın üst tarafındaki renk sisi. Eskiden body::before'daki iki
 * radial-gradient'ti; burada üç katmana çıkıp yavaşça kayıyor.
 *
 * WebGL yok, canvas yok — sadece blur'lu gradient. Sebep: sunucu
 * statik dosya servis ediyor ve sayfa telefonda da ilk saniyede
 * açılmalı. `prefers-reduced-motion` altında animasyon duruyor
 * (index.css'teki genel kural), sis kalıyor.
 *
 * İki tuzak, ikisi de yaşandı:
 *  1. `overflow-hidden` blob'ları kutunun alt kenarında KESİYOR ve
 *     ortada yatay bir çizgi bırakıyor. Çözüm alt tarafa mask —
 *     ayrı bir "arka plana geçiş" katmanı yetmiyor.
 *  2. Aynı opaklık koyuda hafif, açıkta gri bir perde oluyor.
 *     Yoğunluk temaya göre --aurora-strength'ten geliyor.
 */
export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[62vh] overflow-hidden opacity-[var(--aurora-strength)] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)]"
    >
      <div
        className="animate-aurora absolute -left-[10%] -top-[22%] h-[70vh] w-[70vw] rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle, var(--c-portfolyo), transparent 66%)' }}
      />
      <div
        className="animate-aurora absolute -right-[12%] -top-[26%] h-[66vh] w-[62vw] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, var(--c-oyun), transparent 66%)',
          animationDelay: '-7s',
          animationDuration: '23s',
        }}
      />
      <div
        className="animate-aurora absolute -top-[34%] left-1/3 h-[52vh] w-[44vw] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, var(--c-mailapp), transparent 68%)',
          animationDelay: '-13s',
          animationDuration: '29s',
        }}
      />
    </div>
  )
}
