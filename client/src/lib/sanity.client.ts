// src/lib/sanity.client.ts
import { createClient } from '@sanity/client'
import type { ClientConfig } from '@sanity/client'

export const sanity = createClient({
  projectId: '0gpaq987', // from sanity.json or your studio config
  dataset: 'production',
  apiVersion: '2024-05-01', // use today's date for latest
  useCdn: true, // `true` = faster, cached, good for public data
})