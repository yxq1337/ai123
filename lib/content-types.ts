// 扩展的内容类型定义

export type ContentType = 'blog' | 'tutorial' | 'comparison' | 'review' | 'news';

export interface ContentBase {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentType: ContentType;
  category: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  isAIGenerated: boolean;
  aiContributionPercent: number;
  originalityScore: number;
  isHumanReviewed: boolean;
}

// 博客文章
export interface BlogPost extends ContentBase {
  contentType: 'blog';
  content: string;
  excerpt: string;
  wordCount: number;
  readTimeMinutes: number;
  relatedPosts?: string[]; // slugs of related posts
  faq?: FAQItem[];
}

// 教程
export interface Tutorial extends ContentBase {
  contentType: 'tutorial';
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // e.g., "30分钟"
  prerequisites?: string[];
  learningObjectives?: string[];
  sections: TutorialSection[];
  resources?: ResourceLink[];
}

export interface TutorialSection {
  title: string;
  content: string;
  order: number;
  codeExamples?: CodeExample[];
}

export interface CodeExample {
  language: string;
  code: string;
  explanation?: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  description?: string;
}

// 对比评测
export interface Comparison extends ContentBase {
  contentType: 'comparison';
  items: ComparisonItem[];
  comparisonTable: ComparisonTable;
  verdict: Verdict;
  useCases: UseCaseRecommendation[];
}

export interface ComparisonItem {
  id: string;
  name: string;
  logo?: string;
  description: string;
  keyFeatures: string[];
  pricing?: string;
  pros: string[];
  cons: string[];
  rating: number;
  url?: string;
}

export interface ComparisonTable {
  criteria: string[];
  ratings: Record<string, Record<string, number | string>>; // itemId -> criteria -> value
}

export interface Verdict {
  overallRecommendation: string;
  bestFor: BestForCategory[];
  summary: string;
}

export interface BestForCategory {
  category: string;
  recommendation: string;
  itemId: string;
  reason: string;
}

export interface UseCaseRecommendation {
  useCase: string;
  recommendedItemId: string;
  reason: string;
}

// 新闻
export interface NewsArticle extends ContentBase {
  contentType: 'news';
  content: string;
  source?: string;
  sourceUrl?: string;
  publishDate: string;
  breaking: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// 内容模板
export interface ContentTemplate {
  id: string;
  name: string;
  contentType: ContentType;
  description: string;
  promptTemplate: string;
  suggestedCategories: string[];
  example?: {
    title: string;
    outline: string[];
  };
}

// 预定义的内容模板
export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'tool-review',
    name: 'AI工具评测',
    contentType: 'review',
    description: '深度评测一个AI工具，包括使用体验、优缺点、适用场景等',
    promptTemplate: `请写一篇深度的AI工具评测文章，要求：

1. 标题吸引人，包含工具名称和核心卖点
2. 开头介绍这个工具是什么，解决什么问题
3. 详细描述使用体验
4. 列出至少5个优点和3个缺点
5. 给出明确的适用场景建议
6. 与同类工具的简单对比
7. 总结和购买建议

工具名称: {toolName}
主要功能: {toolDescription}
目标受众: {targetAudience}`,
    suggestedCategories: ['AI工具', '评测', '效率工具'],
    example: {
      title: 'ChatGPT 4.0深度评测：真的值这个价吗？',
      outline: [
        '简介：什么是ChatGPT 4.0',
        '核心功能体验',
        '优点分析',
        '缺点分析',
        '与Claude的对比',
        '适用场景',
        '购买建议',
        '总结'
      ]
    }
  },
  {
    id: 'how-to-tutorial',
    name: '教程指南',
    contentType: 'tutorial',
    description: '一步步教用户如何使用某个AI工具或技术',
    promptTemplate: `请写一篇详细的教程文章，要求：

1. 清晰的标题，说明能学到什么
2. 介绍这个教程的目标受众和前置条件
3. 分步骤的详细指导（至少8步）
4. 每个步骤都有具体的操作说明
5. 包含常见问题和解决方案
6. 给出进阶技巧
7. 总结和下一步建议

工具/技术: {topic}
难度等级: {difficulty}
目标成果: {goal}`,
    suggestedCategories: ['教程', 'AI工具', '效率提升'],
    example: {
      title: '从零开始用Stable Diffusion制作专业级AI图片',
      outline: [
        '准备工作：需要什么工具',
        '界面基础认识',
        '第一步：写一个好的提示词',
        '第二步：选择合适的模型',
        '第三步：调整参数获得理想效果',
        '第四步：后处理优化',
        '常见问题解决',
        '进阶技巧分享',
        '总结和资源推荐'
      ]
    }
  },
  {
    id: 'tools-comparison',
    name: '工具对比',
    contentType: 'comparison',
    description: '对比多个同类工具，帮助用户选择最适合的',
    promptTemplate: `请写一篇深度的工具对比文章，要求：

1. 标题说明对比哪些工具
2. 介绍每个工具的基本情况
3. 创建详细的对比表格，涵盖：
   - 价格
   - 功能完整性
   - 易用性
   - 输出质量
   - 客户支持
4. 详细分析每个工具的优缺点
5. 给出不同场景下的购买建议
6. 最终总结和推荐

工具列表: {toolsList}
对比维度: {comparisonCriteria}`,
    suggestedCategories: ['对比', 'AI工具', '选购指南'],
    example: {
      title: '2026年AI写作工具横评：ChatGPT vs Claude vs Notion AI',
      outline: [
        '对比概览',
        '各个工具详细介绍',
        '功能对比表',
        '价格对比',
        '实际使用体验对比',
        '不同场景推荐',
        '最终购买建议',
        '常见问题'
      ]
    }
  },
  {
    id: 'ai-trend-analysis',
    name: 'AI趋势分析',
    contentType: 'blog',
    description: '分析AI领域的最新趋势和发展方向',
    promptTemplate: `请写一篇AI趋势分析文章，要求：

1. 吸引人的标题，点明趋势方向
2. 介绍当前的AI发展背景
3. 分析3-5个主要趋势
4. 每个趋势包括：
   - 是什么
   - 为什么重要
   - 实际应用案例
   - 未来发展方向
5. 给读者的建议和启示
6. 总结和展望

主题: {topic}
时间范围: {timeframe}
目标读者: {audience}`,
    suggestedCategories: ['AI趋势', '行业分析', '科技新闻'],
    example: {
      title: '2026年AI发展的5个重要趋势：从生成式AI到自主AI',
      outline: [
        '引言：AI发展现状',
        '趋势一：多模态AI的普及',
        '趋势二：小型化AI模型兴起',
        '趋势三：AI Agent应用爆发',
        '趋势四：AI与工作流程的深度融合',
        '趋势五：AI监管和伦理议题',
        '给从业者的建议',
        '总结和展望'
      ]
    }
  }
];
