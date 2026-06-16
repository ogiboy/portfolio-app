import { redirect } from '@/i18n/navigation';

export default async function DashboardRedirect({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  redirect({ href: '/', locale });
}
