// src/lib/sanity.queries.ts

export const allProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    client,
    title,
    slug,
    mainImage,
    "mainImageUrl": mainImage.asset->url,
    services[]->{
      _id,
      title,
      slug
    }
  }
`;

export const singleProjectQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    title,
    slug,
    year,
    body,
    projectUrl,
    mainImage,
    "mainImageUrl": mainImage.asset->url,
    services[]->{
      _id,
      title,
      slug
    },
    gallery
  }
`;

export const projectsByServiceQuery = `
  *[_type == "project" && $serviceId in services[]._ref] | order(_createdAt desc) {
    _id,
    client,
    title,
    slug,
    mainImage,
    "mainImageUrl": mainImage.asset->url,
    services[]->{
      _id,
      title,
      slug
    }
  }
`;

export const allServicesQuery = `
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    description
  }
`;
