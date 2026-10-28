import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem().title("Ajustes").singleton("ajustes"),
      S.listItem().title("Inicio").singleton("inicio"),
      S.divider(),
      S.documentTypeListItem("servicio").title("Servicios"),
    ]);
