"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig, defineSingleton } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const ajustes = defineSingleton({
  id: "ajustes",
  documentId: "ajustes",
  schemaType: "ajustes",
  title: "Ajustes",
});

const inicio = defineSingleton({
  id: "inicio",
  documentId: "inicio",
  schemaType: "inicio",
  title: "Inicio",
});

export default defineConfig({
  name: "default",
  title: "Michi agencia",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2026-10-26" }),
  ],
  schema: { types: schemaTypes },
  document: {
    singletons: [ajustes, inicio],
  },
});
