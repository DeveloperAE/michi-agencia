import { defineField, defineType } from "sanity";

export const enlace = defineType({
  name: "enlace",
  title: "Enlace",
  type: "object",
  fields: [
    defineField({
      name: "etiqueta",
      title: "Etiqueta",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description: "Ruta interna, como /contacto, o una URL completa.",
      validation: (rule) => rule.required(),
    }),
  ],
});
