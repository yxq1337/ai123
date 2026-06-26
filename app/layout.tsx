import type { Metadata } from 'next'
import './globals.css'
import { OrganizationSchema, WebSiteSchema } from './components/SchemaOrg'
import { SkipLink } from './components/InteractiveButton'

export const metadata: Metadata = {
  metadataBase: new URL('https://ai123-4jk.pages.dev'),
  title: {
    default: 'AI工具评测 - 最好用的AI工具推荐',
    template: '%s - AI工具评测',
  },
  description: '专业评测2026年最新AI工具，包括AI写作、图像生成、编程助手等。真实体验、客观分析，帮你找到最适合的AI工具。',
  keywords: ['AI工具', 'AI写作', 'AI图像', 'AI编程', 'AI评测', '2026 AI工具', 'AI工具推荐', '免费AI工具'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ai123-4jk.pages.dev',
    siteName: 'AI工具评测',
    title: 'AI工具评测 - 最好用的AI工具推荐',
    description: '专业评测2026年最新AI工具，真实体验、客观分析，帮你找到最适合的AI工具。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI工具评测',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI工具评测 - 最好用的AI工具推荐',
    description: '专业评测2026年最新AI工具，真实体验、客观分析',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  )
}
