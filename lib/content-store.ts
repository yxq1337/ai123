import type {
  BlogPost,
  Tutorial,
  Comparison,
  NewsArticle,
  ContentType,
  ContentBase,
  ContentTemplate,
  FAQItem
} from '@/lib/content-types';
import { aiContentEngine, type GeneratedContent } from '@/lib/ai-content-engine';
import { getContentGenerator, isAIAvailable, type ContentGenerationOptions } from '@/lib/content-generator';

// 联合类型
export type ContentItem = BlogPost | Tutorial | Comparison | NewsArticle;

// 内容存储系统
class ContentStore {
  private contents: Map<string, ContentItem> = new Map();
  private templates: ContentTemplate[] = [];

  constructor() {
    // 初始化一些示例内容
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // 添加一些示例博客文章
    const sampleBlog: BlogPost = {
      id: 'blog-1',
      slug: 'how-ai-transforms-content-creation',
      title: 'AI如何改变内容创作：从生产者到策展人',
      description: '探索AI工具如何彻底改变内容创作的方式，以及内容创作者的角色如何演变',
      contentType: 'blog',
      category: 'AI趋势',
      author: '张明远',
      tags: ['AI写作', '内容创作', '效率提升'],
      createdAt: '2026-06-15',
      updatedAt: '2026-06-15',
      content: `# AI如何改变内容创作：从生产者到策展人

## 引言

人工智能正在以前所未有的方式改变内容创作领域。从简单的文本生成到复杂的多媒体创作，AI工具已经成为内容创作者的得力助手。

## 内容创作的演变

在AI出现之前，内容创作主要依赖人类的创造力和时间投入。一篇高质量的文章可能需要数天甚至数周的时间来完成。

现在，借助AI工具，创作者可以：

- 快速生成初稿
- 获得创意启发
- 优化现有内容
- 多语言内容创作
- 自动化格式处理

## 角色转变：从生产者到策展人

随着AI承担越来越多的机械性工作，内容创作者的角色正在发生变化：

1. **质量把关者** - 确保AI生成内容的质量和准确性
2. **创意总监** - 指导AI的创作方向
3. **内容策略师** - 规划整体内容生态
4. **情感连接者** - 注入人类的真实体验和情感

## 实践建议

1. 拥抱AI工具，但不要过度依赖
2. 保持批判性思维，验证AI生成内容
3. 注入个人独特经验和观点
4. 使用AI处理重复性工作，专注高价值创作

## 未来展望

AI工具将继续进化，但人类的创造力、判断力和情感连接能力始终是不可替代的。成功的内容创作者会是那些能够巧妙结合AI能力和人类智慧的人。`,
      excerpt: '探索AI工具如何彻底改变内容创作的方式，以及内容创作者的角色如何从生产者演变为策展人',
      wordCount: 850,
      readTimeMinutes: 6,
      seo: {
        title: 'AI如何改变内容创作 - 从生产者到策展人',
        description: '探索AI工具如何改变内容创作方式，以及内容创作者如何适应这种变化',
        keywords: ['AI写作', '内容创作', 'AI工具', '效率提升']
      },
      isAIGenerated: true,
      aiContributionPercent: 60,
      originalityScore: 88,
      isHumanReviewed: true
    };

    this.contents.set(sampleBlog.id, sampleBlog);
  }

  // ===== 内容创建方法 =====

  async createBlogPost(
    data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'contentType' | 'wordCount' | 'readTimeMinutes' | 'isAIGenerated' | 'aiContributionPercent' | 'originalityScore' | 'isHumanReviewed'>,
    options: {
      isAIGenerated?: boolean;
      aiContributionPercent?: number;
      originalityScore?: number;
    } = {}
  ): Promise<BlogPost> {
    const id = `blog-${Date.now()}`;
    const now = new Date().toISOString();
    const wordCount = data.content.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / 150);

    const blogPost: BlogPost = {
      ...data,
      id,
      contentType: 'blog',
      createdAt: now,
      updatedAt: now,
      wordCount,
      readTimeMinutes,
      isAIGenerated: options.isAIGenerated ?? true,
      aiContributionPercent: options.aiContributionPercent ?? 70,
      originalityScore: options.originalityScore ?? 85,
      isHumanReviewed: false
    };

    this.contents.set(id, blogPost);
    return blogPost;
  }

  async createTutorial(
    data: Omit<Tutorial, 'id' | 'createdAt' | 'updatedAt' | 'contentType' | 'isAIGenerated' | 'aiContributionPercent' | 'originalityScore' | 'isHumanReviewed'>,
    options: {
      isAIGenerated?: boolean;
      aiContributionPercent?: number;
      originalityScore?: number;
    } = {}
  ): Promise<Tutorial> {
    const id = `tutorial-${Date.now()}`;
    const now = new Date().toISOString();

    const tutorial: Tutorial = {
      ...data,
      id,
      contentType: 'tutorial',
      createdAt: now,
      updatedAt: now,
      isAIGenerated: options.isAIGenerated ?? true,
      aiContributionPercent: options.aiContributionPercent ?? 75,
      originalityScore: options.originalityScore ?? 85,
      isHumanReviewed: false
    };

    this.contents.set(id, tutorial);
    return tutorial;
  }

  async createComparison(
    data: Omit<Comparison, 'id' | 'createdAt' | 'updatedAt' | 'contentType' | 'isAIGenerated' | 'aiContributionPercent' | 'originalityScore' | 'isHumanReviewed'>,
    options: {
      isAIGenerated?: boolean;
      aiContributionPercent?: number;
      originalityScore?: number;
    } = {}
  ): Promise<Comparison> {
    const id = `comparison-${Date.now()}`;
    const now = new Date().toISOString();

    const comparison: Comparison = {
      ...data,
      id,
      contentType: 'comparison',
      createdAt: now,
      updatedAt: now,
      isAIGenerated: options.isAIGenerated ?? true,
      aiContributionPercent: options.aiContributionPercent ?? 65,
      originalityScore: options.originalityScore ?? 85,
      isHumanReviewed: false
    };

    this.contents.set(id, comparison);
    return comparison;
  }

  async createNewsArticle(
    data: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt' | 'contentType' | 'isAIGenerated' | 'aiContributionPercent' | 'originalityScore' | 'isHumanReviewed'>,
    options: {
      isAIGenerated?: boolean;
      aiContributionPercent?: number;
      originalityScore?: number;
    } = {}
  ): Promise<NewsArticle> {
    const id = `news-${Date.now()}`;
    const now = new Date().toISOString();

    const newsArticle: NewsArticle = {
      ...data,
      id,
      contentType: 'news',
      createdAt: now,
      updatedAt: now,
      isAIGenerated: options.isAIGenerated ?? true,
      aiContributionPercent: options.aiContributionPercent ?? 50,
      originalityScore: options.originalityScore ?? 90,
      isHumanReviewed: false
    };

    this.contents.set(id, newsArticle);
    return newsArticle;
  }

  // ===== 内容查询方法 =====

  async getContentById(id: string): Promise<ContentItem | undefined> {
    return this.contents.get(id);
  }

  async getContentBySlug(slug: string): Promise<ContentItem | undefined> {
    return Array.from(this.contents.values()).find(c => c.slug === slug);
  }

  async getAllContent(contentType?: ContentType): Promise<ContentItem[]> {
    let contents = Array.from(this.contents.values());

    if (contentType) {
      contents = contents.filter(c => c.contentType === contentType);
    }

    return contents.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getContentByCategory(category: string, contentType?: ContentType): Promise<ContentItem[]> {
    let contents = await this.getAllContent(contentType);
    return contents.filter(c => c.category === category);
  }

  async getContentByAuthor(author: string, contentType?: ContentType): Promise<ContentItem[]> {
    let contents = await this.getAllContent(contentType);
    return contents.filter(c => c.author === author);
  }

  async getContentByTag(tag: string, contentType?: ContentType): Promise<ContentItem[]> {
    let contents = await this.getAllContent(contentType);
    return contents.filter(c => c.tags.includes(tag));
  }

  // ===== 内容更新方法 =====

  async updateContent(id: string, updates: Partial<ContentItem>): Promise<ContentItem | undefined> {
    const content = this.contents.get(id);
    if (!content) return undefined;

    const updatedContent = {
      ...content,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.contents.set(id, updatedContent as ContentItem);
    return updatedContent as ContentItem;
  }

  async markAsReviewed(id: string): Promise<ContentItem | undefined> {
    return this.updateContent(id, { isHumanReviewed: true });
  }

  // ===== 内容删除方法 =====

  async deleteContent(id: string): Promise<boolean> {
    return this.contents.delete(id);
  }

  // ===== 统计方法 =====

  async getStats() {
    const contents = Array.from(this.contents.values());
    return {
      totalContents: contents.length,
      byType: {
        blogs: contents.filter(c => c.contentType === 'blog').length,
        tutorials: contents.filter(c => c.contentType === 'tutorial').length,
        comparisons: contents.filter(c => c.contentType === 'comparison').length,
        news: contents.filter(c => c.contentType === 'news').length
      },
      byCategory: this.groupByCategory(contents),
      aiGenerated: contents.filter(c => c.isAIGenerated).length,
      humanReviewed: contents.filter(c => c.isHumanReviewed).length,
      totalWords: contents.reduce((sum, c) => {
        if ('wordCount' in c) return sum + c.wordCount;
        return sum;
      }, 0)
    };
  }

  private groupByCategory(contents: ContentItem[]): Record<string, number> {
    const groups: Record<string, number> = {};
    contents.forEach(c => {
      groups[c.category] = (groups[c.category] || 0) + 1;
    });
    return groups;
  }

  // ===== AI内容生成集成 =====

  async generateAndSaveBlogPost(
    topic: string,
    category: string,
    author: string,
    options?: {
      keywords?: string[];
      wordCount?: number;
      tone?: 'professional' | 'casual' | 'educational' | 'friendly' | 'technical';
      useRealAI?: boolean;
      useFallback?: boolean;
    }
  ): Promise<BlogPost> {
    console.log(`📝 [ContentStore] 开始生成博客: ${topic}`);

    // 检查是否使用真实AI
    const useRealAI = options?.useRealAI !== false && isAIAvailable();

    if (useRealAI) {
      try {
        // 使用新的内容生成器
        const generator = getContentGenerator({
          preferFallback: options?.useFallback === true
        });

        const generatedContent = await generator.generate({
          topic,
          contentType: 'blog',
          category,
          targetWordCount: options?.wordCount || 1500,
          tone: options?.tone || 'professional',
          keywords: options?.keywords || []
        });

        console.log(`✅ [ContentStore] AI生成完成: ${generatedContent.title}`);

        // 创建博客文章
        return this.createBlogPost({
          slug: this.generateSlug(generatedContent.title),
          title: generatedContent.title,
          description: generatedContent.seo.description,
          category,
          author,
          tags: generatedContent.tags,
          content: generatedContent.content,
          excerpt: generatedContent.excerpt,
          seo: generatedContent.seo,
          faq: generatedContent.faq
        }, {
          isAIGenerated: true,
          aiContributionPercent: generatedContent.aiMetadata.isFallback ? 50 : 90,
          originalityScore: 85
        });
      } catch (error) {
        console.warn(`⚠️ [ContentStore] AI生成失败，降级到模拟生成:`, error);
        // 降级到模拟生成
      }
    }

    // 使用原有模拟引擎作为后备
    console.log(`🔄 [ContentStore] 使用模拟内容生成`);
    const ideas = await aiContentEngine.generateContentIdeas(
      [{
        id: 'topic-1',
        title: topic,
        description: category,
        category,
        trendScore: 90,
        source: 'manual',
        keywords: options?.keywords || [],
        relatedTopics: [],
        discoveredAt: new Date().toISOString()
      }],
      1
    );

    if (ideas.length === 0) {
      throw new Error('无法生成内容创意');
    }

    const generatedContent = await aiContentEngine.generateDeepOriginalContent(ideas[0]);

    // 创建博客文章
    return this.createBlogPost({
      slug: this.generateSlug(generatedContent.title),
      title: generatedContent.title,
      description: generatedContent.excerpt,
      category,
      author,
      tags: generatedContent.tags,
      content: generatedContent.content,
      excerpt: generatedContent.excerpt,
      seo: {
        title: generatedContent.seo.title,
        description: generatedContent.seo.description,
        keywords: generatedContent.seo.keywords
      },
      faq: [
        {
          question: '这篇文章是AI生成的吗？',
          answer: '是的，这篇文章是AI辅助创作的，但经过了人工审核和优化。'
        }
      ]
    }, {
      isAIGenerated: true,
      aiContributionPercent: 70,
      originalityScore: generatedContent.originalityScore
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60) || `post-${Date.now()}`;
  }
}

// 创建单例
export const contentStore = new ContentStore();
