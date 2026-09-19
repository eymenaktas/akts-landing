/* ═══════════════════════════════════════════════════════════════
   Sayfanın tüm içeriği burada. Yeni kişi/servis eklemek için
   HTML kopyalamak yok — aşağıdaki dizilere bir nesne ekle.
   `icon` değeri src/components/Logos.tsx içindeki tanımın adı.
   ═══════════════════════════════════════════════════════════════ */

export type LogoName = 'mail' | 'oyun' | 'n8n' | 'kod' | 'zarf' | 'github' | 'ezan' | 'study' | 'blankreel'

export type Link = {
  name: string
  desc: string
  href: string
  icon: LogoName
  /** satırın accent rengi — index.css'teki servis renklerinden biri */
  accent: string
  /** öne çıkan satır: etrafında yumuşak hâle ve nabız atar */
  featured?: boolean
}

export type Person = {
  name: string
  role: string
  /** yoksa baş harfler gösterilir */
  avatar?: string
  initials: string
  links: Link[]
}

export const services: Link[] = [
  {
    name: 'Aktaş Mail',
    desc: 'akts.tr posta kutusu · passkey ile giriş',
    href: 'https://mail.akts.tr',
    icon: 'mail',
    accent: 'var(--c-mailapp)',
    featured: true,
  },
  {
    name: 'OyunHub',
    desc: '40 oyunluk Türkçe oyun portalı',
    href: 'https://oyun.akts.tr',
    icon: 'oyun',
    accent: 'var(--c-oyun)',
  },
  {
    name: 'StudyTrack',
    desc: 'Pomodoro, günlük hedef ve seri · widget ve Galaxy Watch · Android',
    href: 'https://studytrack.tr',
    icon: 'study',
    accent: 'var(--c-study)',
  },
  {
    name: 'Ezan Vaktim',
    desc: 'Namaz vakitleri, Cuma, takip ve widget’lar · Galaxy Watch · Android',
    href: 'https://ezan.akts.tr',
    icon: 'ezan',
    accent: 'var(--c-ezan)',
  },
  {
    name: 'BlankReel',
    desc: 'Kodla kısa video üretimi · TikTok, Shorts ve Reels için API',
    href: 'https://blankreel.com',
    icon: 'blankreel',
    accent: 'var(--c-blankreel)',
  },
  {
    name: 'n8n',
    desc: 'İş akışı otomasyonu · giriş gerekir',
    href: 'https://n8n.akts.tr',
    icon: 'n8n',
    accent: 'var(--c-n8n)',
  },
]

export const people: Person[] = [
  {
    name: 'Eymen Aktaş',
    role: 'Minecraft ekosistemi · makine öğrenmesi',
    avatar: '/assets/profile.jpg',
    initials: 'EA',
    links: [
      {
        name: 'Portfolyo',
        desc: 'eymen.akts.tr',
        href: 'https://eymen.akts.tr',
        icon: 'kod',
        accent: 'var(--c-portfolyo)',
      },
      {
        name: 'GitHub',
        desc: 'github.com/eymenaktas',
        href: 'https://github.com/eymenaktas',
        icon: 'github',
        accent: 'var(--c-github)',
      },
      {
        name: 'Mail gönder',
        desc: 'eymen@akts.tr',
        href: 'mailto:eymen@akts.tr',
        icon: 'zarf',
        accent: 'var(--c-mail)',
      },
    ],
  },
]

/** Henüz yayında olmayan işler. Bağlantı yok — yalnız bilgi veriyor. */
export type Upcoming = {
  name: string
  desc: string
  icon: LogoName
  accent: string
  /** karttaki etiket, ör. "Geliştiriliyor" */
  status: string
}

export const upcoming: Upcoming[] = []
