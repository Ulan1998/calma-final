import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://calma.kg',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.calma.kg',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
