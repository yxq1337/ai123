'use client'

import type { Tool, Author } from '@/lib/types'
import { siteConfig, getAuthorByName } from '@/data/site'

export function OrganizationSchema({}: {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    foundingDate: siteConfig.foundingDate,
    sameAs: [
      siteConfig.founder.social.linkedin,
      siteConfig.founder.social.twitter
    ].filter(Boolean),
    founder: {
      '@type': 'Person',
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
      description: siteConfig.founder.bio
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema({}: {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI工具评测',
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface PersonSchemaProps {
  author: Author
}

export function PersonSchema({ author }: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    sameAs: Object.values(author.social).filter(Boolean),
    knowsAbout: author.expertise
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  faq: { question: string; answer: string }[]
}

export function FAQSchema({ faq }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ReviewSchemaProps {
  tool: Tool
  author: Author
}

export function ReviewSchema({ tool, author }: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: tool.url,
      offers: tool.pricing ? {
        '@type': 'Offer',
        price: tool.pricing.price || '0',
        priceCurrency: tool.pricing.currency || 'CNY',
        availability: 'https://schema.org/InStock'
      } : undefined,
      featureList: tool.features?.join(', '),
      screenshot: tool.images?.[0]
    },
    author: {
      '@type': 'Person',
      name: author.name
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: tool.review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: tool.review.ourExperience,
    positiveNotes: tool.review.pros,
    negativeNotes: tool.review.cons,
    datePublished: tool.createdAt,
    dateModified: tool.updatedAt
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  tool: Tool
  author: Author
}

export function ArticleSchema({ tool, author }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${tool.name} 评测 - AI工具评测`,
    description: tool.description,
    author: {
      '@type': 'Person',
      name: author.name
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`
      }
    },
    datePublished: tool.createdAt,
    dateModified: tool.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/tools/${tool.slug}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbListSchemaProps {
  items: { name: string; url: string }[]
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface CollectionPageSchemaProps {
  name: string
  description: string
  items: { name: string; url: string }[]
}

export function CollectionPageSchema({ name, description, items }: CollectionPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: name,
    description: description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: item.url
      }))
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ToolPageSchemaProps {
  tool: Tool
}

export function ToolPageSchema({ tool }: ToolPageSchemaProps) {
  const author = getAuthorByName(tool.review.author) || siteConfig.founder

  return (
    <>
      <OrganizationSchema />
      <ReviewSchema tool={tool} author={author} />
      <ArticleSchema tool={tool} author={author} />
      {tool.faq && tool.faq.length > 0 && <FAQSchema faq={tool.faq} />}
    </>
  )
}
