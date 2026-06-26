# AI内容自动化系统

让AI自动更新网站内容，核心逻辑在于"用AI替代重复的内容生产"并"用自动化流程串起发布环节"。

## 功能特性

- ✅ **API接口** - 接收自动化工具推送的内容
- ✅ **内容管理** - 文章存储和管理
- ✅ **站点配置** - 多站点支持
- ✅ **活动日志** - 操作记录和监控
- ✅ **管理面板** - 友好的Web管理界面
- ✅ **配置指南** - 详细的使用文档

## 快速开始

### 1. 访问管理面板

打开 `/automation-admin` 查看系统状态和管理面板。

### 2. 查看配置文档

打开 `/automation-docs` 查看详细的API文档和配置说明。

### 3. 测试API

```bash
# 检查系统状态
curl https://your-domain.com/api/automation/status

# 发布文章（使用demo配置）
curl -X POST https://your-domain.com/api/automation/publish \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "demo-api-key-12345",
    "siteId": "demo-site",
    "post": {
      "title": "测试文章标题",
      "content": "这里是文章内容...",
      "excerpt": "文章摘要",
      "category": "AI工具",
      "author": "张明远"
    },
    "options": {
      "autoPublish": true,
      "imageLocalization": true,
      "seoOptimization": true
    }
  }'
```

## 目录结构

```
app/
├── api/
│   └── automation/
│       ├── publish/route.ts     # 内容发布API
│       ├── status/route.ts      # 状态查询API
│       └── logs/route.ts        # 日志查询API
├── automation-admin/page.tsx    # 管理面板
└── automation-docs/page.tsx     # 配置文档

lib/
├── automation-types.ts          # 类型定义
└── automation-store.ts          # 数据存储

data/
└── site.ts                     # 站点配置
```

## 工作原理

1. **配置连接** - 在AI内容自动化工具中添加站点并配置API密钥
2. **设置策略** - 配置关键词、原创模式、SEO选项等
3. **开启运行** - 启用云端自动运行模式
4. **自动发布** - 工具自动采集、生成并推送内容到本站

## 生产环境建议

### 1. 安全配置

```typescript
// 使用环境变量而不是硬编码
const API_KEY = process.env.AUTOMATION_API_KEY;
```

### 2. 数据持久化

当前使用内存存储，生产环境建议使用：
- PostgreSQL / MySQL
- Redis 缓存
- 或 CMS系统

### 3. 认证增强

- JWT Token
- 请求签名验证
- 速率限制
- IP白名单

## 相关页面

- 🔗 配置指南: `/automation-docs`
- 🔗 管理面板: `/automation-admin`
- 🔗 工具详情: `/tools/ai-content-automation`
- 🔗 深度评测: `/reviews/ai-content-automation`

## API端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/automation/publish` | POST | 发布文章 |
| `/api/automation/status` | GET | 系统状态 |
| `/api/automation/logs` | GET | 活动日志 |

## 技术栈

- Next.js 14 App Router
- TypeScript
- React

## 注意事项

⚠️ **重要**: 这是演示实现，生产环境需要：
- 更安全的认证机制
- 持久化数据库存储
- 内容审核流程
- SEO优化集成
- 图片本地化处理

详细说明请查看 `/automation-docs`。
