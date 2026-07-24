'use client';

import { NextIntlClientProvider } from 'next-intl';
import { SiteTelemetry } from '@/components/client/site-telemetry';
import { WebMcpTools } from '@/components/client/webmcp-tools';

/** Provides locale context and optional client integrations for the application tree. */
export default function Providers({
  children,
  messages,
  locale,
}: Readonly<{
  children: React.ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}>) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Istanbul">
      {children}
      <SiteTelemetry />
      <WebMcpTools />
    </NextIntlClientProvider>
  );
}
