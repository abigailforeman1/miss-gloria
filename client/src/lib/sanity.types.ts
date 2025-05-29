export interface SanityImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface ServiceRef {
  _type: "reference";
  _ref: string;
}

export interface Project {
  _id: string;
  client: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage: SanityImage;
  year: number;
  services: ServiceRef[];
  publishedAt: string;
  projectUrl?: string;
  gallery: SanityImage[];
  body: string;
}
