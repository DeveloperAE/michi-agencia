import Image from "next/image";

import { hasEnlace, SiteLink } from "@/components/site-link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { inicioQuery } from "@/sanity/lib/queries";
import type { Hero as HeroContent } from "@/sanity/lib/types";

import styles from "./hero.module.scss";

export async function Hero() {
  let hero: HeroContent = null;

  try {
    const inicio = await client.fetch<{ hero?: HeroContent } | null>(inicioQuery);
    hero = inicio?.hero ?? null;
  } catch {
    return (
      <section className={styles.hero}>
        <p className={styles.empty}>
          No pude leer el dataset production. Revisa la conexión con el proyecto.
        </p>
      </section>
    );
  }

  if (!hero?.titular) {
    return (
      <section className={styles.hero}>
        <p className={styles.empty}>
          El hero todavía no está publicado. Ábrelo en Studio, dentro de Inicio,
          y pulsa Publish.
        </p>
      </section>
    );
  }

  const imagen = hero.imagen?.asset?._ref
    ? urlFor(hero.imagen).width(1400).height(1200).url()
    : null;
  const boton = hasEnlace(hero.boton) ? hero.boton : null;

  return (
    <section className={styles.hero}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          {hero.antetitulo ? (
            <p className={styles.kicker}>{hero.antetitulo}</p>
          ) : null}
          <h1 className={styles.title}>{hero.titular}</h1>
          {hero.bajada ? <p className={styles.text}>{hero.bajada}</p> : null}
          {boton ? <SiteLink className={styles.button} enlace={boton} /> : null}
        </div>
        {imagen ? (
          <figure className={styles.media}>
            <Image
              className={styles.image}
              src={imagen}
              alt=""
              width={1400}
              height={1200}
            />
          </figure>
        ) : null}
      </div>
    </section>
  );
}
