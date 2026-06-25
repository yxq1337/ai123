
# AI工具评测网站

一个专业的AI工具评测和导航网站，基于Next.js 14构建，SEO友好，支持Google AdSense变现。

## 功能特性

- 🏠 美观的首页设计，展示热门工具和分类
- 🔍 完整的工具浏览和分类筛选功能
- 📝 详细的工具评测页面，包含优缺点分析
- 🚀 SEO优化（sitemap、robots.txt、meta标签）
- 💰 Google AdSense集成支持
- 📱 响应式设计，支持各种设备
- 🎨 现代化的UI设计

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: 原生CSS
- **部署**: Vercel (推荐)

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 本地运行

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
├── app/
│   ├── about/          # 关于页面
│   ├── categories/     # 分类页面
│   ├── contact/        # 联系页面
│   ├── tools/          # 工具列表和详情
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   ├── robots.ts       # robots.txt生成
│   └── sitemap.ts      # sitemap生成
├── data/
│   └── tools.ts        # 工具数据
├── lib/
│   ├── api.ts          # API函数
│   └── types.ts        # 类型定义
├── next.config.js
├── package.json
├── PROJECT_PLAN.md     # 项目规划文档
└── tsconfig.json
```

## 自定义配置

### 1. 修改网站信息

- 在 `app/layout.tsx` 中修改网站标题和描述
- 在各个页面的 `metadata` 中修改对应的SEO信息

### 2. 添加更多工具

编辑 `data/tools.ts` 文件，添加新的工具数据。每个工具包含：

```typescript
{
  id: '唯一ID',
  slug: 'URL路径',
  name: '工具名称',
  logo: '图标emoji',
  description: '描述',
  categories: ['分类1', '分类2'],
  url: '官网地址',
  review: {
    rating: 评分(0-5),
    ourExperience: '使用体验描述',
    pros: ['优点1', '优点2'],
    cons: ['缺点1', '缺点2'],
    author: '作者',
    lastUpdated: '更新日期'
  },
  alternatives: ['替代工具slug'],
  createdAt: '创建日期',
  updatedAt: '更新日期'
}
```

### 3. 配置域名

在 `app/sitemap.ts` 和 `app/robots.ts` 中将 `https://yourdomain.com` 替换为你的实际域名。

### 4. 集成Google AdSense

1. 在Google AdSense申请账号并获得批准
2. 在页面合适位置添加AdSense代码
3. 可以创建一个AdSense组件来管理广告位

## Google AdSense集成说明

### 申请AdSense前准备

1. 确保网站有足够的原创内容（推荐至少30篇）
2. 完善的About和Contact页面
3. 清晰的导航和用户友好的设计
4. 网站可正常访问，没有违规内容

### 广告位建议

1. **工具详情页侧边栏** - 相关工具上方位置
2. **工具列表页** - 工具卡片之间
3. **首页** - 热门工具下方横幅位置

### 添加AdSense代码示例

创建 `app/components/AdSense.tsx`：

```tsx
'use client'

import { useEffect } from 'react'

export default function AdSense({ client, slot, format = 'auto' }: {
  client: string
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
}) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
```

在 `app/layout.tsx` 中添加AdSense脚本：

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## SEO最佳实践

### 已实现的功能

- ✅ 自动生成sitemap.xml
- ✅ robots.txt配置（允许AI爬虫）
- ✅ 每个页面独立的meta标签
- ✅ 语义化HTML结构
- ✅ 响应式设计
- ✅ 清晰的URL结构

### 内容建议

1. **原创内容**: AI生成的内容需要人工修改和补充，加入真实体验
2. **更新频率**: 定期更新内容，保持网站活跃
3. **外链建设**: 与相关网站交换链接，提高权威性
4. **用户体验**: 保持网站速度快，导航清晰

### Google Search Console配置

1. 注册Google Search Console账号
2. 添加你的网站
3. 提交sitemap.xml
4. 监控收录和搜索表现

## 部署指南

### 部署到Vercel（推荐）

1. 将代码推送到GitHub仓库
2. 在Vercel导入项目
3. 配置项目设置
4. 部署完成后绑定你的域名

### 其他部署选项

- Cloudflare Pages
- Netlify
- 自己的服务器

## 盈利建议

### 1. Google AdSense

- 选择合适的广告位
- 不影响用户体验的前提下展示广告
- 监控收入和点击率

### 2. 联盟营销

- 与AI工具合作，获取推广佣金
- 在评测中加入联盟链接
- 透明公开联盟关系

### 3. 付费收录

- 后期可以推出付费收录服务
- 保持评测的客观性
- 明确标识付费内容

### 4. 会员订阅

- 提供高级内容或工具
- 专属的社区和资源

## 风险提示

1. **内容质量**: 确保内容质量，避免被搜索引擎降权
2. **AdSense政策**: 严格遵守Google AdSense政策，避免账号被封
3. **竞争激烈**: AI工具领域竞争激烈，需要持续提供有价值的内容
4. **算法变化**: 搜索引擎算法可能变化，需要及时调整SEO策略

## 后续扩展方向

- 🔍 添加搜索功能
- 👤 用户账号系统
- 💬 用户评论和评分
- 📊 工具对比功能
- 📰 AI资讯博客
- 📧 邮件订阅
- 🔔 工具更新提醒

## 许可证

MIT License

## 支持

如有问题或建议，欢迎联系我们！
