/* ═══════════════════════════════════════════════════════════════
   Sayfanın tüm içeriği burada. Yeni kişi/servis eklemek için
   HTML kopyalamak yok — aşağıdaki dizilere bir nesne ekle.
   `icon` değeri src/components/Logos.tsx içindeki tanımın adı.
   ═══════════════════════════════════════════════════════════════ */

export type LogoName = 'mail' | 'oyun' | 'n8n' | 'kod' | 'zarf' | 'github'

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
    desc: '172 oyunluk Türkçe oyun portalı',
    href: 'https://oyun.akts.tr',
    icon: 'oyun',
    accent: 'var(--c-oyun)',
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
