// 内容生成协调器 - 协调真实AI和降级策略
import {
  DoubaoContentService,
  getDoubaoContentService,
  isAIAvailable,
  type ContentGenerationOptions,
  type GeneratedContent
} from './ai-content-service';
import {
  FallbackContentService,
  getFallbackContentService
} from './fallback-generator';

export interface GeneratorOptions {
  enableFallback?: boolean;
  preferFallback?: boolean;
  onFallback?: (error: Error) => void;
}

export class ContentGenerator {
  private doubaoService: DoubaoContentService;
  private fallbackService: FallbackContentService;
  private options: Required<GeneratorOptions>;

  constructor(options: GeneratorOptions = {}) {
    this.options = {
      enableFallback: options.enableFallback ?? (process.env.AI_ENABLE_FALLBACK !== 'false'),
      preferFallback: options.preferFallback ?? false,
      onFallback: options.onFallback || ((error) => {
        console.warn('⚠️ 使用降级策略，原因:', error.message);
      })
    };

    this.doubaoService = getDoubaoContentService();
    this.fallbackService = getFallbackContentService();
  }

  async generate(options: ContentGenerationOptions): Promise<GeneratedContent> {
    // 检查是否配置了AI
    const aiConfigured = isAIAvailable();

    // 如果优先使用降级策略或AI未配置，直接使用降级
    if (this.options.preferFallback || !aiConfigured) {
      if (!aiConfigured) {
        console.log('ℹ️ AI未配置，使用降级策略');
      }
      return this.fallbackService.generateContent(options);
    }

    // 尝试使用真实AI
    try {
      return await this.doubaoService.generateContent(options);
    } catch (error) {
      console.error('❌ AI生成失败:', error);

      // 如果启用了降级策略，则使用降级
      if (this.options.enableFallback) {
        this.options.onFallback(error as Error);
        return this.fallbackService.generateContent(options);
      }

      // 否则抛出错误
      throw error;
    }
  }

  async generateTitle(
    topic: string,
    contentType: string
  ): Promise<string> {
    if (!isAIAvailable() || this.options.preferFallback) {
      return this.fallbackService.generateTitle(topic, contentType);
    }

    try {
      return await this.doubaoService.generateTitle(topic, contentType);
    } catch (error) {
      if (this.options.enableFallback) {
        this.options.onFallback(error as Error);
        return this.fallbackService.generateTitle(topic, contentType);
      }
      throw error;
    }
  }

  async generateTitles(
    topic: string,
    count: number = 5
  ): Promise<string[]> {
    if (!isAIAvailable() || this.options.preferFallback) {
      return this.fallbackService.generateTitles(topic, count);
    }

    try {
      return await this.doubaoService.generateTitles(topic, count);
    } catch (error) {
      if (this.options.enableFallback) {
        this.options.onFallback(error as Error);
        return this.fallbackService.generateTitles(topic, count);
      }
      throw error;
    }
  }

  async generateDescription(
    title: string,
    content: string
  ): Promise<string> {
    if (!isAIAvailable() || this.options.preferFallback) {
      return this.fallbackService.generateDescription(title, content);
    }

    try {
      return await this.doubaoService.generateDescription(title, content);
    } catch (error) {
      if (this.options.enableFallback) {
        this.options.onFallback(error as Error);
        return this.fallbackService.generateDescription(title, content);
      }
      throw error;
    }
  }

  async generateKeywords(
    title: string,
    content: string
  ): Promise<string[]> {
    if (!isAIAvailable() || this.options.preferFallback) {
      return this.fallbackService.generateKeywords(title, content);
    }

    try {
      return await this.doubaoService.generateKeywords(title, content);
    } catch (error) {
      if (this.options.enableFallback) {
        this.options.onFallback(error as Error);
        return this.fallbackService.generateKeywords(title, content);
      }
      throw error;
    }
  }

  async generateFAQ(
    topic: string,
    content: string,
    count: number = 5
  ): Promise<Array<{ question: string; answer: string }>> {
    if (!isAIAvailable() || this.options.preferFallback) {
      return this.fallbackService.generateFAQ(topic, content, count);
    }

    try {
      return await this.doubaoService.generateFAQ(topic, content, count);
    } catch (error) {
      if (this.options.enableFallback) {
        this.options.onFallback(error as Error);
        return this.fallbackService.generateFAQ(topic, content, count);
      }
      throw error;
    }
  }

  // 质量检查
  private validateContent(content: GeneratedContent): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    if (!content.title || content.title.length < 5) {
      issues.push('标题过短');
    }

    if (!content.content || content.content.length < 200) {
      issues.push('内容过短');
    }

    if (content.wordCount < 300) {
      issues.push('字数不足');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  // 检查当前是否可以使用真实AI
  canUseAI(): boolean {
    return isAIAvailable();
  }

  // 获取当前服务状态
  getStatus(): {
    aiAvailable: boolean;
    fallbackEnabled: boolean;
    preferFallback: boolean;
  } {
    return {
      aiAvailable: isAIAvailable(),
      fallbackEnabled: this.options.enableFallback,
      preferFallback: this.options.preferFallback
    };
  }
}

// 全局单例
let contentGeneratorInstance: ContentGenerator | null = null;

export function getContentGenerator(options?: GeneratorOptions): ContentGenerator {
  if (!contentGeneratorInstance) {
    contentGeneratorInstance = new ContentGenerator(options);
  } else if (options) {
    // 如果提供了新选项，更新实例
    Object.assign(contentGeneratorInstance['options'], options);
  }
  return contentGeneratorInstance;
}

// 便捷导出
export {
  type ContentGenerationOptions,
  type GeneratedContent,
  type ContentType,
  type ContentTone
} from './ai-content-service';
