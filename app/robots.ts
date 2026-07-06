import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/baker-test', '/mascots-demo', '/preview'],
    },
    sitemap: 'https://calma.kg/sitemap.xml',
    host: 'https://calma.kg',
  }
}
