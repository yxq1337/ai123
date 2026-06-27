import type { Metadata } from 'next';
import './globals.css';
import { OrganizationSchema, WebSiteSchema } from './components/SchemaOrg';
import { SkipLink } from './components/InteractiveButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai123-4jk.pages.dev'),
  title: {
    default: 'AI 工具图鉴 - 真正有用的 AI 工具',
    template: '%s - AI 工具图鉴',
  },
  description: '专业评测 2026 年最新 AI 工具，真实体验、客观分析，帮你找到最适合的 AI 助手。',
  keywords: ['AI 工具', 'AI 写作', 'AI 图像', 'AI 编程', 'AI 评测', '2026 AI 工具', 'AI 工具推荐', '免费 AI 工具'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ai123-4jk.pages.dev',
    siteName: 'AI 工具图鉴',
    title: 'AI 工具图鉴 - 真正有用的 AI 工具',
    description: '专业评测 2026 年最新 AI 工具，真实体验、客观分析，帮你找到最适合的 AI 助手。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI 工具图鉴',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 工具图鉴 - 真正有用的 AI 工具',
    description: '专业评测 2026 年最新 AI 工具，真实体验、客观分析',
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#9A4A2F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Fonts - Playfair Display, DM Sans, Space Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <OrganizationSchema />
        <WebSiteSchema />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
