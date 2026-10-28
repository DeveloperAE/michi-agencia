import { defineField, defineType } from "sanity";

export const inicio = defineType({
  name: "inicio",
  title: "Inicio",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "antetitulo",
          title: "Antetítulo",
          type: "string",
        }),
        defineField({
          name: "titular",
          title: "Titular",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "bajada",
          title: "Bajada",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "boton",
          title: "Botón",
          type: "enlace",
        }),
      ],
    }),
  ],
});
