import Link from "next/link";

import type { Enlace } from "@/sanity/lib/types";

export function hasEnlace(
  enlace: Enlace | null | undefined,
): enlace is { etiqueta: string; url: string } {
  return Boolean(enlace?.etiqueta && enlace.url);
}

export function SiteLink({
  enlace,
  className,
}: {
  enlace: { etiqueta: string; url: string };
  className?: string;
}) {
  const external = enlace.url.startsWith("http");

  if (external) {
    return (
      <a className={className} href={enlace.url}>
        {enlace.etiqueta}
      </a>
    );
  }

  return (
    <Link className={className} href={enlace.url}>
      {enlace.etiqueta}
    </Link>
  );
}
