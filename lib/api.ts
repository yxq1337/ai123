
import { tools } from '@/data/tools'
import type { Tool } from '@/lib/types'

export async function getTools(locale: string = 'en'): Promise<Tool[]> {
  return tools
}

export async function getToolBySlug(slug: string, locale: string = 'en'): Promise<Tool | undefined> {
  return tools.find(tool => tool.slug === slug)
}

export async function getToolsByCategory(
  category: string,
  locale: string = 'en'
): Promise<Tool[]> {
  return tools.filter(tool => tool.categories.includes(category))
}

export async function getCategories(locale: string = 'en'): Promise<string[]> {
  const categories = new Set<string>()
  tools.forEach(tool => {
    tool.categories.forEach(category => categories.add(category))
  })
  return Array.from(categories).sort()
}
