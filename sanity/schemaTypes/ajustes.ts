import { defineField, defineType } from "sanity";

export const ajustes = defineType({
  name: "ajustes",
  title: "Ajustes",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del sitio",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "menu",
      title: "Menú",
      type: "array",
      of: [{ type: "enlace" }],
    }),
    defineField({
      name: "boton",
      title: "Botón",
      type: "enlace",
    }),
  ],
});
