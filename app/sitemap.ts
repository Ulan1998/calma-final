import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://calma.kg',
      lastModified: new Date('2026-07-06'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
