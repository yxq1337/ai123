// AI内容服务层 - 统一AI调用接口
import {
  DoubaoClient,
  getDoubaoClient,
  isDoubaoConfigured,
  type TokenUsage
} from './volcengine-doubao';

export type ContentType = 'blog' | 'review' | 'tutorial' | 'news' | 'comparison' | 'how-to' | 'list';
export type ContentTone = 'professional' | 'casual' | 'friendly' | 'technical';

export interface ContentGenerationOptions {
  topic: string;
  contentType: ContentType;
  category: string;
  targetWordCount?: number;
  tone?: ContentTone;
  keywords?: string[];
  language?: 'zh-CN' | 'zh-TW' | 'en-US';
}

export interface GeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  tags: string[];
  wordCount: number;
  readTimeMinutes: number;
  faq: Array<{ question: string; answer: string }>;
  aiMetadata: {
    model: string;
    tokenUsage: TokenUsage;
    generationTime: number;
    isFallback?: boolean;
  };
}

export interface AIContentService {
  generateContent(options: ContentGenerationOptions): Promise<GeneratedContent>;
  generateTitle(topic: string, contentType: string): Promise<string>;
  generateTitles(topic: string, count?: number): Promise<string[]>;
  generateDescription(title: string, content: string): Promise<string>;
  generateKeywords(title: string, content: string): Promise<string[]>;
  generateFAQ(topic: string, content: string, count?: number): Promise<Array<{ question: string; answer: string }>>;
}

export class DoubaoContentService implements AIContentService {
  private client: DoubaoClient;

  constructor(client?: DoubaoClient) {
    this.client = client || getDoubaoClient();
  }

  async generateContent(options: ContentGenerationOptions): Promise<GeneratedContent> {
    const startTime = Date.now();
    console.log(`🤖 [Doubao] 开始生成内容: ${options.topic}`);

    try {
      // 1. 生成文章内容
      const content = await this.client.generateContent(
        options.topic,
        options.contentType,
        {
          wordCount: options.targetWordCount,
          tone: options.tone,
          keywords: options.keywords
        }
      );

      if (!content || content.trim().length < 100) {
        throw new Error('生成的内容过短或为空');
      }

      // 2. 提取标题（从内容中或单独生成）
      let title = this.extractTitleFromContent(content) || options.topic;
      if (title === options.topic) {
        title = await this.client.generateTitle(options.topic);
      }

      // 3. 生成描述
      const description = await this.client.generateDescription(title, content);

      // 4. 生成关键词
      const keywords = await this.client.generateKeywords(title, content);

      // 5. 生成FAQ
      const faq = await this.client.generateFAQ(title, content, 5);

      // 6. 计算统计
      const wordCount = this.countWords(content);
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      const excerpt = this.generateExcerpt(content);

      // 7. 获取令牌使用情况
      const tokenUsage = this.client.getTokenUsage();
      const generationTime = Date.now() - startTime;

      console.log(`✅ [Doubao] 内容生成完成: ${title} (${wordCount}字, ${generationTime}ms)`);

      return {
        title,
        content,
        excerpt,
        seo: {
          title: `${title} | ${options.category}`,
          description,
          keywords: [...keywords, ...(options.keywords || [])].slice(0, 10)
        },
        tags: keywords.slice(0, 8),
        wordCount,
        readTimeMinutes,
        faq,
        aiMetadata: {
          model: process.env.VOLCENGINE_MODEL || 'doubao',
          tokenUsage,
          generationTime
        }
      };
    } catch (error) {
      console.error('❌ [Doubao] 内容生成失败:', error);
      throw error;
    }
  }

  async generateTitle(topic: string, contentType: string): Promise<string> {
    return this.client.generateTitle(topic);
  }

  async generateTitles(topic: string, count: number = 5): Promise<string[]> {
    return this.client.generateTitles(topic, count);
  }

  async generateDescription(title: string, content: string): Promise<string> {
    return this.client.generateDescription(title, content);
  }

  async generateKeywords(title: string, content: string): Promise<string[]> {
    return this.client.generateKeywords(title, content);
  }

  async generateFAQ(topic: string, content: string, count: number = 5): Promise<Array<{ question: string; answer: string }>> {
    return this.client.generateFAQ(topic, content, count);
  }

  private extractTitleFromContent(content: string): string | null {
    // 尝试从Markdown内容中提取H1标题
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      return h1Match[1].trim();
    }
    return null;
  }

  private generateExcerpt(content: string, maxLength: number = 180): string {
    // 移除Markdown格式并提取摘要
    let cleanText = content
      .replace(/^#+\s+.*$/gm, '') // 移除标题
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接
      .replace(/[*_~`]+/g, '') // 移除格式标记
      .replace(/\n\s*\n/g, '\n') // 合并空行
      .trim();

    cleanText = cleanText.replace(/^##\s+.+$/gm, '').trim();

    if (cleanText.length <= maxLength) {
      return cleanText;
    }

    // 在标点处截断
    const excerpt = cleanText.substring(0, maxLength);
    const lastPunctuation = Math.max(
      excerpt.lastIndexOf('。'),
      excerpt.lastIndexOf('！'),
      excerpt.lastIndexOf('？'),
      excerpt.lastIndexOf('.')
    );

    if (lastPunctuation > maxLength * 0.5) {
      return excerpt.substring(0, lastPunctuation + 1) + '...';
    }

    return excerpt + '...';
  }

  private countWords(content: string): number {
    // 中文按字符，英文按单词
    const chineseChars = (content.match(/[一-龥]/g) || []).length;
    const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
    return chineseChars + englishWords;
  }
}

// 导出单例
let doubaoServiceInstance: DoubaoContentService | null = null;

export function getDoubaoContentService(): DoubaoContentService {
  if (!doubaoServiceInstance) {
    doubaoServiceInstance = new DoubaoContentService();
  }
  return doubaoServiceInstance;
}

export function isAIAvailable(): boolean {
  return isDoubaoConfigured();
}
