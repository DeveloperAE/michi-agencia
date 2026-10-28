import Image from "next/image";
import Link from "next/link";

import { hasEnlace, SiteLink } from "@/components/site-link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ajustesQuery } from "@/sanity/lib/queries";
import type { Ajustes } from "@/sanity/lib/types";

import styles from "./header.module.scss";

export async function Header() {
  let ajustes: Ajustes = null;

  try {
    ajustes = await client.fetch<Ajustes>(ajustesQuery);
  } catch {
    ajustes = null;
  }

  const nombre = ajustes?.nombre || "Michi agencia";
  const logo = ajustes?.logo?.asset?._ref
    ? urlFor(ajustes.logo).height(56).url()
    : null;
  const menu = ajustes?.menu?.filter(hasEnlace) ?? [];
  const boton = hasEnlace(ajustes?.boton) ? ajustes.boton : null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          {logo ? (
            <Image
              className={styles.logo}
              src={logo}
              alt={nombre}
              width={140}
              height={28}
            />
          ) : (
            nombre
          )}
        </Link>
        <nav className={styles.nav} aria-label="Principal">
          {menu.length > 0 ? (
            <ul className={styles.menu}>
              {menu.map((item) => (
                <li key={`${item.etiqueta}-${item.url}`}>
                  <SiteLink className={styles.link} enlace={item} />
                </li>
              ))}
            </ul>
          ) : null}
          {boton ? <SiteLink className={styles.button} enlace={boton} /> : null}
        </nav>
      </div>
    </header>
  );
}
