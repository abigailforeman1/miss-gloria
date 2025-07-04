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
  title: string;
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
  mainImageUrl: string;
  year: number;
  services: ServiceRef[];
  publishedAt: string;
  projectUrl?: string;
  gallery: SanityImage[];
  body: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
}
