// src/lib/sanity.queries.ts
import { groq } from 'next-sanity'

export const projectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    client,
    title,
    slug,
    description,
    mainImage,
    projectUrl
  }
`
