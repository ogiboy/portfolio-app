import type { MetadataRoute } from 'next';
import { identity, seoCopy } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${identity.siteName} by ${identity.fullName}`,
    short_name: identity.brand,
    description: seoCopy.en.homeDescription,
    start_url: '/en',
    display: 'standalone',
    background_color: '#f8f7ef',
    theme_color: '#20211d',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
