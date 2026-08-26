import type { LogoName } from '@/data/site'

/**
 * Logolar eski index.html'deki <defs> bloğundan olduğu gibi taşındı.
 * <use> ile referans verildiği için her satırda SVG tekrar etmiyor.
 *
 * Aktaş Mail : kendi markamız (degrade karo + iki tonlu A)
 * OyunHub    : sitenin favicon'undaki şimşek (blur filtreleri atıldı)
 * n8n        : n8n'in düğüm-grafik markası, marka rengi #ea4b71
 * kod/zarf   : tek renk glif — satırın accent rengini alır
 */
export function LogoDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="g-mail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b9bff" />
          <stop offset="1" stopColor="#1558d6" />
        </linearGradient>

        <g id="i-mail">
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#g-mail)" />
          <path d="M24 13 L34 34" stroke="#fff" strokeWidth="4.4" strokeLinecap="round" />
          <path d="M24 13 L14 34" stroke="#fff" strokeWidth="4.4" strokeLinecap="round" />
          <path d="M18.4 27.5 H29.6" stroke="#c2e7ff" strokeWidth="4.4" strokeLinecap="round" />
        </g>

        <g id="i-oyun">
          <path
            fill="#863bff"
            d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
          />
        </g>

        <g id="i-n8n" stroke="#ea4b71" strokeWidth="3.6" strokeLinecap="round" fill="#ea4b71">
          <path d="M11 24 H22" fill="none" />
          <path d="M26 24 H32 L37 15" fill="none" />
          <path d="M26 24 H32 L37 33" fill="none" />
          <circle cx="8" cy="24" r="5" stroke="none" />
          <circle cx="24" cy="24" r="6.5" stroke="none" />
          <circle cx="40" cy="13" r="5" stroke="none" />
          <circle cx="40" cy="35" r="5" stroke="none" />
        </g>

        <g
          id="i-kod"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 16 L8 24 L17 32" />
          <path d="M31 16 L40 24 L31 32" />
        </g>

        {/* GitHub markası — tek yol, currentColor ile satırın rengini alır.
            48'lik viewBox'a otursun diye 16'lık orijinal yol 3x ölçeklendi. */}
        <g id="i-github" fill="currentColor">
          <path
            transform="scale(3)"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </g>

        <g
          id="i-zarf"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="11" width="36" height="26" rx="4" />
          <path d="M7 14 L24 26 L41 14" />
        </g>
      </defs>
    </svg>
  )
}

export function Logo({ name, className }: { name: LogoName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  )
}
