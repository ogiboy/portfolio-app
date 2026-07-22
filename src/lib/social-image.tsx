import { ImageResponse } from 'next/og';
import type { Locale } from '@/content/site';
import { identity, seoCopy } from '@/lib/seo';

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = 'image/png';

export function createSocialImage(locale: Locale) {
  const copy = seoCopy[locale];
  const gridLines = Array.from({ length: 9 }, (_, index) => (index + 1) * 10);

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#f8f7ef',
        color: '#20211d',
        fontFamily: 'monospace',
      }}
    >
      {gridLines.map((position) => (
        <div
          key={`vertical-${position}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            borderLeft: '1px solid rgba(32, 33, 29, 0.12)',
          }}
        />
      ))}
      {gridLines.slice(0, 5).map((position) => (
        <div
          key={`horizontal-${position}`}
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            top: `${position}%`,
            borderTop: '1px solid rgba(32, 33, 29, 0.12)',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          top: 42,
          left: 42,
          width: 1102,
          height: 532,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '4px solid #20211d',
          padding: '48px 54px',
          boxShadow: '14px 14px 0 #20211d',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              background: '#ef5b2a',
              border: '4px solid #20211d',
              fontSize: 42,
              fontWeight: 900,
            }}
          >
            <svg width="46" height="54" viewBox="0 0 24 30">
              <path
                fill="#20211d"
                d="M13.8 1.4c1.3 5.2-3.9 7.1-2.1 11.1 1.1-1.2 1.8-2.8 1.8-4.4 4.3 3.1 7 7 7 11.2 0 5.2-3.8 9.3-8.8 9.3S3 24.7 3 19.7c0-3.8 2.1-7.4 6.2-10.7-.2 3 1.1 4.9 2.4 5.9-1.1-4.7.3-8.8 2.2-13.5Z"
              />
              <path
                fill="#b9ef35"
                d="M12.1 17.2c2.5 2 3.2 3.6 3.2 5.2 0 2.1-1.5 3.8-3.6 3.8-2 0-3.5-1.5-3.5-3.6 0-1.7 1-3.4 3-5.2-.1 1.4.3 2.3.9 2.9.2-1 .2-2 0-3.1Z"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 900, letterSpacing: '-7px' }}>
            {identity.brand}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 800, letterSpacing: '-3px' }}>
            {identity.fullName}
          </div>
          <div
            style={{
              display: 'flex',
              maxWidth: 900,
              fontSize: 30,
              lineHeight: 1.25,
              color: '#4b4c45',
            }}
          >
            {copy.role} / Next.js / Automation / WebAssembly
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 20 }}>
          <div style={{ display: 'flex', width: 18, height: 18, background: '#b9ef35' }} />
          <div style={{ display: 'flex' }}>oguzcantoptas.com / developer + homelab portfolio</div>
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
