import { defineField, defineType } from "sanity";

export const servicio = defineType({
  name: "servicio",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "La parte final de la URL. Se genera desde el título.",
      options: { source: "titulo", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resumen",
      title: "Resumen",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "portada",
      title: "Portada",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cuerpo",
      title: "Cuerpo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "titulo", media: "portada" },
  },
});
