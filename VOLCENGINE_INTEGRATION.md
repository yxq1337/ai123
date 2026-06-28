# 火山豆包 AI 集成指南

## 📋 概述

本项目已成功集成火山引擎（Volcengine）豆包大模型API，用于高质量中文内容生成。集成包含完整的错误处理、降级策略和令牌使用统计。

## 🎯 功能特性

### 核心功能
- ✅ 真实火山豆包AI API调用
- ✅ 智能重试机制（最多3次）
- ✅ 请求超时控制（默认30秒）
- ✅ 自动降级策略（API失败时使用模拟生成）
- ✅ 令牌使用统计
- ✅ 完整的TypeScript类型支持

### 内容生成
- 📝 多种内容类型支持（博客、评测、教程、新闻、对比等）
- 🎯 可配置语气风格（专业、轻松、友好、技术）
- 🔍 自动SEO优化（标题、描述、关键词）
- ❓ 自动FAQ生成
- 📊 字数控制和阅读时间估算

### API端点
- `POST /api/ai/generate` - 基础内容生成
- `POST /api/ai/generate-pro` - 专业内容生成
- `GET /api/ai/generate?action=status` - 服务状态检查
- `GET /api/ai/generate?action=generate-title` - 标题生成

## 🔧 配置步骤

### 1. 获取火山引擎API密钥

1. 访问 [火山引擎控制台](https://console.volcengine.com/)
2. 注册/登录账号
3. 进入 [方舟（Ark）平台](https://console.volcengine.com/ark)
4. 创建模型接入点（Endpoint）
5. 获取 API Key 和接入点 ID

### 2. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
# 火山豆包API配置（必填）
VOLCENGINE_API_KEY=your_api_key_here
VOLCENGINE_MODEL=ep-20240101000000-xxxxx
VOLCENGINE_BASE_URL=https://ark.cn-beijing.volces.com/api/v3

# API配置（可选）
AI_API_TIMEOUT=30000
AI_MAX_RETRIES=3
AI_ENABLE_FALLBACK=true

# 调试配置（可选）
AI_LOG_REQUESTS=false
AI_LOG_RESPONSES=false
```

### 3. 环境变量说明

| 变量名 | 说明 | 必填 | 默认值 |
|--------|------|------|--------|
| `VOLCENGINE_API_KEY` | 火山引擎API密钥 | ✅ | - |
| `VOLCENGINE_MODEL` | 模型接入点ID | ✅ | - |
| `VOLCENGINE_BASE_URL` | API基础URL | ❌ | `https://ark.cn-beijing.volces.com/api/v3` |
| `AI_API_TIMEOUT` | 请求超时时间（毫秒） | ❌ | `30000` |
| `AI_MAX_RETRIES` | 最大重试次数 | ❌ | `3` |
| `AI_ENABLE_FALLBACK` | 启用降级策略 | ❌ | `true` |
| `AI_LOG_REQUESTS` | 记录请求日志 | ❌ | `false` |

## 💻 使用方法

### 基础使用 - API调用

```bash
# 检查服务状态
curl http://localhost:3000/api/ai/generate?action=status

# 生成标题
curl "http://localhost:3000/api/ai/generate?action=generate-title&topic=AI内容创作"

# 生成完整内容
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "AI内容创作的未来",
    "category": "AI技术",
    "author": "AI作者",
    "contentType": "blog",
    "wordCount": 1500,
    "tone": "professional"
  }'
```

### 专业版内容生成

```bash
curl -X POST http://localhost:3000/api/ai/generate-pro \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "GPT-5与下一代AI大模型",
    "category": "AI技术",
    "author": "AI研究员",
    "targetWordCount": 2000,
    "templateId": "tool-review",
    "tone": "technical",
    "keywords": ["GPT-5", "AI大模型", "人工智能"]
  }'
```

### 代码中使用

```typescript
import { getContentGenerator } from '@/lib/content-generator';

// 获取生成器实例
const generator = getContentGenerator();

// 生成内容
const content = await generator.generate({
  topic: '如何使用AI提升工作效率',
  contentType: 'blog',
  category: '效率工具',
  targetWordCount: 1500,
  tone: 'professional',
  keywords: ['AI', '效率', '自动化']
});

console.log('生成的内容:', content);
console.log('是否使用降级:', content.aiMetadata.isFallback);
console.log('令牌使用:', content.aiMetadata.tokenUsage);
```

### 检查服务状态

```typescript
import { getContentGenerator, isAIAvailable } from '@/lib/content-generator';

const generator = getContentGenerator();
const status = generator.getStatus();

console.log('AI可用:', status.aiAvailable);
console.log('降级启用:', status.fallbackEnabled);
```

## 📁 项目结构

```
lib/
├── volcengine-doubao.ts      # 火山豆包客户端
├── ai-content-service.ts      # AI内容服务层
├── fallback-generator.ts      # 降级策略服务
├── content-generator.ts       # 内容生成协调器
├── content-store.ts           # 内容存储（已更新）
└── ai-content-engine.ts       # 模拟引擎（保留）

app/api/ai/
├── generate/route.ts          # 基础API（已更新）
└── generate-pro/route.ts      # 专业API（已更新）

.env.example                   # 环境变量示例
VOLCENGINE_INTEGRATION.md      # 本文档
```

## 🎨 支持的内容类型

| 类型 | 说明 | 推荐字数 |
|------|------|----------|
| `blog` | 博客文章 | 1500-2000 |
| `review` | 产品评测 | 1800-2500 |
| `tutorial` | 教程指南 | 1500-2000 |
| `news` | 新闻/趋势分析 | 1200-1800 |
| `comparison` | 产品对比 | 1500-2000 |
| `how-to` | 实用指南 | 1200-1500 |
| `list` | 资源清单 | 1000-1500 |

## 🎭 支持的语气风格

| 风格 | 说明 | 适用场景 |
|------|------|----------|
| `professional` | 专业权威 | 技术博客、行业分析 |
| `casual` | 轻松易懂 | 生活分享、入门指南 |
| `friendly` | 友好热情 | 教程、经验分享 |
| `technical` | 技术详细 | 深度技术文章 |

## 🔄 降级策略

当出现以下情况时，系统会自动使用降级策略：

1. ❌ 未配置 `VOLCENGINE_API_KEY`
2. ❌ API请求超时
3. ❌ API返回错误（如配额不足）
4. ❌ 网络连接失败

降级策略会使用本地模拟生成，确保网站功能正常运行。

## 📊 响应示例

### 成功响应（真实AI）

```json
{
  "success": true,
  "message": "内容生成成功",
  "data": {
    "generatedContent": {
      "title": "AI内容创作的未来发展趋势",
      "content": "# AI内容创作的未来...",
      "excerpt": "探索AI如何改变内容创作...",
      "wordCount": 1650,
      "readTimeMinutes": 8,
      "seo": {
        "title": "AI内容创作的未来发展趋势 | AI技术",
        "description": "深入探讨AI如何改变内容创作...",
        "keywords": ["AI", "内容创作", "人工智能"]
      },
      "tags": ["AI", "内容创作", "效率工具"],
      "faq": [...],
      "aiMetadata": {
        "model": "ep-20240101000000-xxxxx",
        "tokenUsage": {
          "promptTokens": 250,
          "completionTokens": 1800,
          "totalTokens": 2050,
          "requests": 1
        },
        "generationTime": 4500,
        "isFallback": false
      }
    },
    "isFallback": false,
    "generationTime": 4500
  }
}
```

### 降级响应

```json
{
  "success": true,
  "message": "内容生成成功",
  "data": {
    "generatedContent": {
      "...": "...",
      "aiMetadata": {
        "model": "fallback-generator",
        "isFallback": true
      }
    },
    "isFallback": true,
    "generationTime": 120
  }
}
```

## 🐛 故障排查

### 问题：API调用失败

**检查清单：**
1. 确认 `.env` 文件存在且配置正确
2. 确认 API Key 有效且未过期
3. 确认模型接入点 ID 正确
4. 检查火山引擎账户配额是否充足
5. 查看控制台日志获取详细错误

### 问题：始终使用降级策略

**可能原因：**
- `VOLCENGINE_API_KEY` 未配置或使用默认值
- 网络连接问题
- API Key 权限不足

**解决方法：**
1. 访问 `/api/ai/generate?action=status` 检查状态
2. 确认环境变量正确加载
3. 检查网络连接

### 问题：生成内容质量不理想

**优化建议：**
1. 提供更具体的 topic（不要太宽泛）
2. 使用 keywords 引导内容方向
3. 调整 tone 参数匹配需求
4. 尝试不同的 contentType

## 📈 成本控制建议

1. **合理设置字数**：根据实际需求设置 targetWordCount
2. **使用降级策略**：开发环境可以强制使用降级
3. **监控令牌使用**：通过 `aiMetadata.tokenUsage` 查看消耗
4. **缓存常用内容**：对重复需求进行缓存

## 🔐 安全最佳实践

1. **永远不要**将 `.env` 文件提交到 git
2. 使用环境变量管理密钥
3. 在生产环境中使用不同的API密钥
4. 定期轮换API密钥
5. 监控API使用情况，设置用量告警

## 📚 相关资源

- [火山引擎方舟文档](https://www.volcengine.com/docs/82379)
- [豆包大模型API文档](https://www.volcengine.com/docs/82379/1099324)
- [项目README](./README.md)

## 🤝 贡献

发现问题或有改进建议？欢迎提交 Issue 或 PR！

---

**最后更新**: 2026-06-28
**版本**: 2.0.0
