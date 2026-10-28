export type Enlace = {
  etiqueta?: string | null;
  url?: string | null;
};

export type SanityImage = {
  asset?: { _ref?: string };
} | null;

export type Ajustes = {
  nombre?: string | null;
  logo?: SanityImage;
  menu?: Enlace[] | null;
  boton?: Enlace | null;
} | null;

export type Hero = {
  antetitulo?: string | null;
  titular?: string | null;
  bajada?: string | null;
  imagen?: SanityImage;
  boton?: Enlace | null;
} | null;
