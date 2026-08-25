import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'q9yg5l4m',
  dataset: 'production',
  apiVersion: '2026-07-25',
  useCdn: true,
})