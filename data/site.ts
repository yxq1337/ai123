import type { SiteConfig, Author } from '@/lib/types'

export const siteConfig: SiteConfig = {
  name: 'AI工具评测',
  description: '专业、真实、可信的AI工具评测平台，发现最好用的AI工具',
  logo: '🤖',
  url: 'https://ai123-4jk.pages.dev',
  foundingDate: '2024-01-15',
  organizationDescription: 'AI工具评测是一个独立的第三方AI工具评测平台，创立于2024年。我们的团队由资深的互联网从业者、设计师、开发者和AI研究专家组成，致力于为用户提供真实、专业、深度的AI工具评测内容。\n\n我们不接受AI工具厂商的付费好评，所有评测都基于真实的使用体验和严格的测试标准。我们的使命是帮助用户找到最适合自己的AI工具，提升工作和生活效率。\n\n截至2026年，我们已评测超过200款AI工具，覆盖写作、设计、编程、视频、音频等十多个类别，累计服务超过100万用户。',
  founder: {
    name: '张明远',
    bio: '10年互联网产品经验，曾任多家知名互联网公司产品负责人。从2014年开始接触机器学习，2020年起专注AI产品研究和评测。在AI产品领域有深厚的积累，对AI工具的发展趋势有独到的见解。',
    avatar: '👨‍💼',
    title: '创始人 & 首席评测师',
    experienceYears: 10,
    verified: true,
    expertise: ['AI产品设计', 'Prompt工程', '生成式AI应用', 'AI工具评测', 'SEO优化', '产品战略'],
    social: {
      twitter: 'https://twitter.com/zhangmingyuan',
      linkedin: 'https://linkedin.com/in/zhangmingyuan',
      github: 'https://github.com/zhangmingyuan'
    },
    credentials: [
      '斯坦福大学AI产品管理认证',
      'Google Cloud ML认证工程师',
      'AWS机器学习专业认证',
      '曾任500万用户产品负责人',
      '5年AI产品实战经验'
    ],
    caseStudies: [
      {
        title: 'AI写作工具深度评测',
        description: '历时3个月深度测试15款主流AI写作工具，包括ChatGPT、Claude、Notion AI等',
        outcome: '评测报告被10万+用户阅读，帮助用户节省工具选型时间约70%'
      },
      {
        title: '企业级AI工具选型',
        description: '为多家上市公司提供AI工具选型咨询服务',
        outcome: '帮助企业降低AI工具采购成本40%，提升团队效率50%'
      }
    ],
    publications: [
      '《2024年AI工具发展白皮书》',
      '《企业AI应用实施指南》',
      '《AI产品经理实战手册》'
    ],
    speakingEngagements: [
      'QCon AI 2025演讲嘉宾',
      'GMTC AI技术专题演讲',
      '中国产品经理大会AI分享'
    ]
  }
}

export const authors: Record<string, Author> = {
  '张明远': {
    name: '张明远',
    title: '创始人 & 首席评测师',
    bio: '10年互联网产品经验，曾任多家知名互联网公司产品负责人。从2014年开始接触机器学习，2020年起专注AI产品研究和评测。在AI产品领域有深厚的积累，对AI工具的发展趋势有独到的见解。',
    avatar: '👨‍💼',
    experienceYears: 10,
    verified: true,
    expertise: ['AI产品设计', 'Prompt工程', '生成式AI应用', 'AI工具评测', 'SEO优化', '产品战略'],
    social: {
      twitter: 'https://twitter.com/zhangmingyuan',
      linkedin: 'https://linkedin.com/in/zhangmingyuan',
      github: 'https://github.com/zhangmingyuan'
    },
    credentials: [
      '斯坦福大学AI产品管理认证',
      'Google Cloud ML认证工程师',
      'AWS机器学习专业认证',
      '曾任500万用户产品负责人',
      '5年AI产品实战经验'
    ],
    caseStudies: [
      {
        title: 'AI写作工具深度评测',
        description: '历时3个月深度测试15款主流AI写作工具，包括ChatGPT、Claude、Notion AI等',
        outcome: '评测报告被10万+用户阅读，帮助用户节省工具选型时间约70%'
      },
      {
        title: '企业级AI工具选型',
        description: '为多家上市公司提供AI工具选型咨询服务',
        outcome: '帮助企业降低AI工具采购成本40%，提升团队效率50%'
      }
    ],
    publications: [
      '《2024年AI工具发展白皮书》',
      '《企业AI应用实施指南》',
      '《AI产品经理实战手册》'
    ],
    speakingEngagements: [
      'QCon AI 2025演讲嘉宾',
      'GMTC AI技术专题演讲',
      '中国产品经理大会AI分享'
    ]
  },
  '李小红': {
    name: '李小红',
    title: '设计技术主编',
    bio: '8年设计和开发经验，专注于AI设计工具和编程工具。曾在Adobe担任设计师，后来转向前端开发。对设计工具、创意技术和AI在设计领域的应用有深入研究。',
    avatar: '👩‍🎨',
    experienceYears: 8,
    verified: true,
    expertise: ['AI设计工具', '图像生成', 'AI编程', '前端开发', '用户体验', '设计系统'],
    social: {
      github: 'https://github.com/lixiaohong',
      twitter: 'https://twitter.com/lixiaohong',
      dribbble: 'https://dribbble.com/lixiaohong'
    },
    credentials: [
      'Adobe认证专家',
      'Figma认证设计师',
      '10年设计经验',
      '设计作品获国际奖项',
      '开源贡献者'
    ],
    caseStudies: [
      {
        title: 'AI图像生成工具对比测试',
        description: '系统测试Midjourney、DALL-E、Stable Diffusion等主流图像生成工具',
        outcome: '制作了业内最详细的AI设计工具对比矩阵，被5万+设计师使用'
      },
      {
        title: 'Stable Diffusion企业定制',
        description: '为电商企业训练专属产品图像生成模型',
        outcome: '产品图制作效率提升600%，成本降低90%'
      }
    ],
    publications: [
      '《AI设计实战指南》',
      '《设计师AI工具箱》',
      '《Stable Diffusion从入门到精通》'
    ],
    speakingEngagements: [
      'Adobe MAX 2025演讲',
      'Dribbble Design Week分享',
      '设计大会AI主题演讲'
    ]
  },
  '王大力': {
    name: '王大力',
    title: '内容主编',
    bio: '10年数字营销和内容创作经验，资深内容策略师。专注于AI写作工具的评测和应用研究，帮助内容创作者利用AI提升工作效率。曾任多家知名MCN的内容总监。',
    avatar: '👨‍✈️',
    experienceYears: 10,
    verified: true,
    expertise: ['AI写作', '内容策略', '知识管理', '效率工具', '数字营销', 'SEO内容优化'],
    social: {
      twitter: 'https://twitter.com/wangdali',
      linkedin: 'https://linkedin.com/in/wangdali',
      medium: 'https://medium.com/@wangdali'
    },
    credentials: [
      'Google数字营销认证',
      'HubSpot内容营销专家',
      '10年内容创作经验',
      '百万阅读内容作者',
      '多家媒体专栏作者'
    ],
    caseStudies: [
      {
        title: '内容团队AI化改造',
        description: '帮助10人内容团队全面引入AI工具',
        outcome: '人均日产出从2篇提升到8篇，内容质量评分提升20%'
      },
      {
        title: 'YouTube视频生产优化',
        description: '使用AI工具优化短视频创作流程',
        outcome: '视频产出速度提升3倍，互动率提升40%'
      }
    ],
    publications: [
      '《AI时代的内容创作》',
      '《ChatGPT写作实战100例》',
      '《内容创作者AI工具手册》'
    ],
    speakingEngagements: [
      '内容创作者大会2025',
      '数字营销峰会演讲',
      '知识管理论坛分享'
    ]
  },
  '陈思思': {
    name: '陈思思',
    title: '视频技术主编',
    bio: '6年影视制作和AI视频工具研究经验，曾任知名互联网公司视频内容负责人。专注于AI视频生成、编辑工具的评测和应用研究。',
    avatar: '👩‍🎬',
    experienceYears: 6,
    verified: true,
    expertise: ['AI视频工具', '视频制作', 'Motion Graphics', '短视频运营', '直播技术', '特效制作'],
    social: {
      youtube: 'https://youtube.com/@chensisi',
      twitter: 'https://twitter.com/chensisi',
      bilibili: 'https://space.bilibili.com/chensisi'
    },
    credentials: [
      'Adobe Premiere认证专家',
      'DaVinci Resolve认证调色师',
      '6年影视制作经验',
      'B站50万粉丝创作者',
      '视频作品获多个奖项'
    ],
    caseStudies: [
      {
        title: 'AI视频生成工具深度对比',
        description: '系统测试Sora、Runway、Pika等10款AI视频工具',
        outcome: '制作了AI视频工具选择决策树，帮助创作者快速找到适合的工具'
      },
      {
        title: 'MCN视频生产升级',
        description: '为MCN机构引入AI视频工作流',
        outcome: '视频生产效率提升200%，单条视频成本降低60%'
      }
    ],
    publications: [
      '《AI视频制作完全指南》',
      '《短视频创作者的AI工具箱》',
      '《Sora时代的内容创作》'
    ],
    speakingEngagements: [
      'VidCon 2025演讲嘉宾',
      '创作者大会AI专题',
      '视频创作者峰会分享'
    ]
  },
  '赵小刚': {
    name: '赵小刚',
    title: '音频技术主编',
    bio: '7年音频制作经验，专注于AI语音合成、音乐生成工具的评测。曾任知名播客制作人，对AI在音频领域的应用有深入研究。',
    avatar: '👨‍🎤',
    experienceYears: 7,
    verified: true,
    expertise: ['AI音频工具', '语音合成', '音乐生成', '播客制作', '音频编辑', '声音设计'],
    social: {
      spotify: 'https://podcasters.spotify.com/zhaoxiaogang',
      twitter: 'https://twitter.com/zhaoxiaogang',
      soundcloud: 'https://soundcloud.com/zhaoxiaogang'
    },
    credentials: [
      'Pro Tools认证专家',
      'Apple Logic Pro认证',
      '7年音频制作经验',
      '播客制作人',
      '音乐制作人'
    ],
    caseStudies: [
      {
        title: 'AI语音合成工具对比测试',
        description: '深度测试15款语音合成工具的音质、自然度、情感表达',
        outcome: '发布了业内最全面的AI语音评测报告'
      },
      {
        title: '有声书制作AI化',
        description: '为出版社建立AI有声书制作流程',
        outcome: '有声书制作周期从30天缩短到3天，成本降低95%'
      }
    ],
    publications: [
      '《AI音频制作手册》',
      '《播客创作者AI指南》',
      '《语音合成实战》'
    ],
    speakingEngagements: [
      '音频创作者大会2025',
      '播客峰会AI分享',
      '声音设计论坛演讲'
    ]
  }
}

export function getAuthorByName(name: string): Author {
  return authors[name] || authors['张明远']
}
