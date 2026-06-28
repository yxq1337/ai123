
import { MetadataRoute } from 'next'
import { getTools, getCategories } from '@/lib/api'
import { siteConfig } from '@/data/site'
import { contentStore } from '@/lib/content-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getTools('en')
  const categories = await getCategories('en')
  const blogPosts = await contentStore.getAllContent('blog')

  const baseUrl = siteConfig.url.replace(/\/$/, '')

  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}/`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category)}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews/ai-content-automation/`,
      lastModified: new Date('2026-06-26'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comparisons/ai-content-automation-vs-others/`,
      lastModified: new Date('2026-06-26'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...toolUrls,
    ...categoryUrls,
    ...blogUrls,
  ]
}
