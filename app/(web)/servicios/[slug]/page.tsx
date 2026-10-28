import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { servicioBySlugQuery } from "@/sanity/lib/queries";

import styles from "./servicio.module.scss";

type Servicio = {
  titulo: string;
  resumen?: string | null;
  slug: string;
  cuerpo?: PortableTextBlock[] | null;
  portada?: {
    asset?: { _ref?: string };
  } | null;
};

export default function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className={styles.main}>
      <Suspense fallback={<p className={styles.status}>Leyendo el servicio…</p>}>
        <ServicioDetalle params={params} />
      </Suspense>
    </main>
  );
}

async function ServicioDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servicio = await client.fetch<Servicio | null>(servicioBySlugQuery, {
    slug,
  });

  if (!servicio) {
    notFound();
  }

  const portada = servicio.portada?.asset?._ref
    ? urlFor(servicio.portada).width(1600).height(900).url()
    : null;

  return (
    <article>
      <Link className={styles.back} href="/">
        Volver al inicio
      </Link>
      <h1 className={styles.title}>{servicio.titulo}</h1>
      {servicio.resumen ? (
        <p className={styles.summary}>{servicio.resumen}</p>
      ) : null}
      {portada ? (
        <Image
          className={styles.image}
          src={portada}
          alt=""
          width={1600}
          height={900}
        />
      ) : null}
      {servicio.cuerpo && servicio.cuerpo.length > 0 ? (
        <div className={styles.body}>
          <PortableText value={servicio.cuerpo} />
        </div>
      ) : null}
    </article>
  );
}
