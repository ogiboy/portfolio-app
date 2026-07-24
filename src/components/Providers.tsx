'use client';

import { NextIntlClientProvider } from 'next-intl';
import { SiteTelemetry } from '@/components/client/site-telemetry';
import { WebMcpTools } from '@/components/client/webmcp-tools';

/**
 * Provides locale context and client integrations for the application tree.
 *
 * @param children - The application content to render inside the locale provider
 * @param messages - The localized messages available to descendant components
 * @param locale - The locale used by the provider
 * @returns The application content with localization and client integrations
 */
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
