import { defineQuery } from "next-sanity";

export const ajustesQuery = defineQuery(`
  *[_id == "ajustes"][0]{
    nombre,
    logo,
    menu[]{etiqueta, url},
    boton{etiqueta, url}
  }
`);

export const inicioQuery = defineQuery(`
  *[_id == "inicio"][0]{
    hero{
      antetitulo,
      titular,
      bajada,
      imagen,
      boton{etiqueta, url}
    }
  }
`);

export const servicioBySlugQuery = defineQuery(`
  *[_type == "servicio" && slug.current == $slug][0]{
    titulo,
    resumen,
    cuerpo,
    portada,
    "slug": slug.current
  }
`);
