'use client'

import Image from 'next/image'
import turkishFlag from '/public/lang/tr-flag.svg'
import usaFlag from '/public/lang/us-flag.svg'
import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

const LangSwitcher = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const changedLocale = locale === 'en' ? 'tr' : 'en'

  return (
    <Link href={pathname} locale={changedLocale}>
      <Image
        src={changedLocale === 'en' ? usaFlag : turkishFlag}
        alt={changedLocale === 'en' ? 'USA Flag' : 'Turkish Flag'}
        width={20}
        height={20}
        className="hover:scale-110 transition-transform"
      />
    </Link>
  )
}
export default LangSwitcher
