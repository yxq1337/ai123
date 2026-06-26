
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { OrganizationSchema } from '@/app/components/SchemaOrg'
import { SkipLink } from '@/app/components/InteractiveButton'

export const metadata: Metadata = {
  title: 'AI工具评测 - 专业的AI工具评测和导航网站',
  description: '发现和评测最新的AI工具，包括写作、图像、编程、视频等各类AI工具。专业评测，真实体验，帮你找到合适的AI助手。',
  keywords: 'AI工具,AI写作,AI图像,AI编程,AI评测,AI工具推荐',
}

export const viewport: Viewport = {
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
      </head>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  )
}
