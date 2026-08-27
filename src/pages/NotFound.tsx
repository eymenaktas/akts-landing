/**
 * 404. Yapı 21st.dev'in "not-found-2" bileşeninden: Empty + dev 404
 * başlığı + alta doğru sönen maske + iki düğme.
 *
 * İki değişiklik:
 *  1. Orijinaldeki `text-nowrap` + `<br />` dar ekranda metni taşırıyor
 *     (375 px'te yatay kaydırma çubuğu çıkıyor). Yerine `text-balance`
 *     ve doğal sarma kullanıldı.
 *  2. "Explore" düğmesi akts.tr'de bir yere gitmiyordu; yerine
 *     gerçekten var olan bir hedef kondu (Aktaş Mail).
 *  3. Orijinaldeki `mask-b-from-20% mask-b-to-80%` Tailwind v4
 *     yardımcısı. Bu proje 3.4 kullanıyor, o sınıflar üretilmiyor ve
 *     sessizce hiçbir şey yapmıyordu — "404" düz, maskesiz çıkardı.
 *     Aynı sönme arbitrary property ile yazıldı.
 */
import { HomeIcon, MailIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { PageShell } from '@/components/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[62vh] w-full items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyTitle className="text-[clamp(5rem,22vw,9rem)] font-extrabold leading-none tracking-[-0.05em] [-webkit-mask-image:linear-gradient(to_bottom,#000_20%,transparent_80%)] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_80%)]">
              404
            </EmptyTitle>
            <EmptyDescription className="-mt-4 max-w-[34ch] text-balance text-foreground/80 sm:-mt-6">
              Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild>
                <a href="/">
                  <HomeIcon aria-hidden="true" />
                  Ana sayfa
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://mail.akts.tr" target="_blank" rel="noreferrer noopener">
                  <MailIcon aria-hidden="true" />
                  Aktaş Mail
                </a>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    </PageShell>
  )
}
