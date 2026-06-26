import type { SiteConfig, Author } from '@/lib/types'

export const siteConfig: SiteConfig = {
  name: 'AI工具评测',
  description: '专业、真实、可信的AI工具评测平台，发现最好用的AI工具',
  logo: '🤖',
  url: 'https://ai123-4jk.pages.dev',
  foundingDate: '2024-01-01',
  organizationDescription: 'AI工具评测团队由资深AI产品专家、全栈工程师和数字营销专家组成，致力于提供真实、客观、有深度的AI工具评测内容。',
  founder: {
    name: '张明远',
    title: '创始人 & 首席AI产品专家',
    bio: '拥有10年互联网产品经验，专注AI产品研究和评测。曾任职于多家知名互联网公司，主导过多个千万用户级产品的AI功能设计。',
    avatar: '👨‍💼',
    experienceYears: 10,
    expertise: ['AI产品设计', 'Prompt工程', '生成式AI应用', 'AI工具评测', 'SEO优化'],
    verified: true,
    social: {
      twitter: 'https://twitter.com/zhangmingyuan',
      linkedin: 'https://linkedin.com/in/zhangmingyuan',
    },
  },
}

export const authors: Record<string, Author> = {
  '张明远': siteConfig.founder,
  '李小红': {
    name: '李小红',
    title: '资深全栈工程师',
    bio: '8年开发经验，专注于AI工具的技术评测和性能测试。',
    avatar: '👩‍💻',
    experienceYears: 8,
    expertise: ['AI工具技术架构', '性能测试', 'API集成', '开发工具'],
    verified: true,
    social: {
      github: 'https://github.com/lixiaohong',
    },
  },
  '王大力': {
    name: '王大力',
    title: '数字营销专家',
    bio: '10年数字营销经验，擅长AI工具在营销领域的应用研究。',
    avatar: '👨‍💼',
    experienceYears: 10,
    expertise: ['AI营销工具', 'SEO优化', '内容策略', '增长黑客'],
    verified: true,
    social: {
      linkedin: 'https://linkedin.com/in/wangdali',
    },
  },
}
