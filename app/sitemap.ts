import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://omar-muammar-portifolio.vercel.app',

      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
