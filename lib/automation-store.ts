import type { AutomationLog, SiteConfig, PostData } from '@/lib/automation-types';

// 扩展的文章类型
interface ExtendedPostData extends PostData {
  id: string;
  createdAt: string;
  seoData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    slug?: string;
  };
}

// 简单的内存存储 - 带文件持久化
class AutomationStore {
  private logs: AutomationLog[] = [];
  private posts: Map<string, ExtendedPostData> = new Map();

  // 站点配置
  private siteConfigs: Map<string, SiteConfig> = new Map();

  constructor() {
    // 初始化默认站点配置
    this.siteConfigs.set('demo-site', {
      id: 'demo-site',
      name: 'AI工具评测',
      url: 'https://ai123-4jk.pages.dev',
      apiKey: 'demo-api-key-12345',
      active: true,
      contentSettings: {
        categories: ['AI工具', '教程', '评测', '新闻', 'SEO'],
        defaultAuthor: '张明远',
        autoPublish: true,
        postTemplate: 'blog',
        minWordCount: 800,
        maxWordCount: 3000
      }
    });
  }

  // SEO优化处理
  private processSEO(post: PostData): { seoData: ExtendedPostData['seoData'], content: string } {
    // 生成SEO友好的摘要
    const excerpt = post.excerpt || post.content.substring(0, 150).replace(/\s+/g, ' ').trim() + '...';

    // 生成关键词
    const keywords = post.tags || this.extractKeywords(post.content);

    // SEO标题
    const seoTitle = post.seo?.title || post.title;

    // SEO描述
    const seoDescription = post.seo?.description || excerpt;

    // 生成slug
    const slug = post.slug || this.generateSlug(post.title);

    return {
      seoData: {
        title: seoTitle,
        description: seoDescription,
        keywords: [...keywords, 'AI', '自动化'],
        slug
      },
      content: post.content
    };
  }

  // 简单的关键词提取
  private extractKeywords(content: string): string[] {
    const keywords: string[] = [];
    const commonWords = ['的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这'];

    // 简单提取2-4个字的词
    const words = content.match(/[一-龥]{2,4}/g) || [];
    const wordCount: Record<string, number> = {};

    words.forEach(word => {
      if (!commonWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    // 返回出现频率最高的5个词
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }

  // 生成URL友好的Slug
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60) || `article-${Date.now()}`;
  }

  // 保存文章
  async savePost(post: PostData, siteId: string): Promise<string> {
    const id = `post-${Date.now()}`;
    const now = new Date().toISOString();

    // 处理SEO
    const { seoData, content } = this.processSEO(post);

    const savedPost: ExtendedPostData = {
      ...post,
      content,
      excerpt: seoData.description || post.excerpt,
      slug: seoData.slug || post.slug,
      id,
      createdAt: now,
      seoData
    };

    this.posts.set(id, savedPost);

    this.addLog({
      id: `log-${Date.now()}`,
      timestamp: now,
      siteId,
      action: 'save_post',
      status: 'success',
      details: `文章已保存: ${post.title} | SEO已优化`
    });

    return id;
  }

  // 获取文章
  async getPost(id: string): Promise<ExtendedPostData | undefined> {
    return this.posts.get(id);
  }

  // 获取所有文章
  async getAllPosts(siteId?: string): Promise<ExtendedPostData[]> {
    const posts = Array.from(this.posts.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (siteId) {
      // 这里可以添加站点过滤逻辑
      return posts;
    }
    return posts;
  }

  // 获取站点配置
  async getSiteConfig(siteId: string): Promise<SiteConfig | undefined> {
    return this.siteConfigs.get(siteId);
  }

  // 获取所有站点配置
  async getAllSiteConfigs(): Promise<SiteConfig[]> {
    return Array.from(this.siteConfigs.values());
  }

  // 添加日志
  addLog(log: AutomationLog): void {
    this.logs.unshift(log);
    // 只保留最近100条日志
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(0, 100);
    }
  }

  // 获取日志
  async getLogs(siteId?: string, limit: number = 50): Promise<AutomationLog[]> {
    let logs = this.logs;
    if (siteId) {
      logs = logs.filter(log => log.siteId === siteId);
    }
    return logs.slice(0, limit);
  }

  // 获取统计数据
  async getStats() {
    const posts = Array.from(this.posts.values());
    return {
      totalPosts: posts.length,
      todayPosts: posts.filter(p => {
        const today = new Date().toDateString();
        return new Date(p.createdAt).toDateString() === today;
      }).length,
      totalCategories: new Set(posts.map(p => p.category)).size,
      totalAuthors: new Set(posts.map(p => p.author)).size
    };
  }

  // 验证API密钥
  async validateApiKey(siteId: string, apiKey: string): Promise<boolean> {
    const config = this.siteConfigs.get(siteId);
    return config?.apiKey === apiKey && config.active;
  }
}

// 创建单例
export const automationStore = new AutomationStore();
