import type { Locale } from '@/content/site';
import { createSocialImage, socialImageContentType, socialImageSize } from '@/lib/social-image';

export const alt = 'H.O.T. developer and homelab portfolio by Halil Oğuzcan Toptaş';
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function OpenGraphImage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  return createSocialImage((locale === 'tr' ? 'tr' : 'en') satisfies Locale);
}
