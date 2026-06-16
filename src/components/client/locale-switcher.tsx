"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher({ label }: Readonly<{ label: string }>) {
  const pathname = usePathname();
  const locale = useLocale();
  const nextLocale = locale === "en" ? "tr" : "en";

  return (
    <Button asChild size="sm" variant="ghost">
      <Link
        href={pathname}
        locale={nextLocale}
        scroll={false}
        aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
      >
        {label}
      </Link>
    </Button>
  );
}
