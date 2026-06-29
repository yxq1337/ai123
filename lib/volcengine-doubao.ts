// 火山豆包大模型API集成
// 文档：https://www.volcengine.com/docs/82379

export interface DoubaoConfig {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  timeout?: number;
  maxRetries?: number;
  enableLogging?: boolean;
}

export interface DoubaoChatCompletionRequest {
  model?: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface DoubaoChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  requests: number;
}

export class DoubaoClient {
  private config: Required<Omit<DoubaoConfig, 'enableLogging'>> & { enableLogging: boolean };
  private tokenUsage: TokenUsage = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    requests: 0
  };

  constructor(config: DoubaoConfig) {
    this.config = {
      baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
      model: 'ep-20240101000000-xxxxx', // 需要替换为真实的模型接入点ID
      timeout: 30000,
      maxRetries: 3,
      enableLogging: false,
      ...config
    };
  }

  private log(message: string, data?: unknown) {
    if (this.config.enableLogging) {
      console.log(`[DoubaoClient] ${message}`, data || '');
    }
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async chat(request: DoubaoChatCompletionRequest): Promise<DoubaoChatCompletionResponse> {
    const url = `${this.config.baseUrl}/chat/completions`;

    const body: DoubaoChatCompletionRequest = {
      model: request.model || this.config.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      top_p: request.top_p ?? 0.9,
      max_tokens: request.max_tokens ?? 2000,
      stream: request.stream ?? false
    };

    this.log('发送请求', { model: body.model, messagesCount: body.messages.length });
    const startTime = Date.now();

    try {
      const response = await this.fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(body)
      }, this.config.timeout);

      const duration = Date.now() - startTime;

      if (!response.ok) {
        let errorMessage = `API请求失败: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.error?.message || response.statusText}`;
          this.log('API错误响应', errorData);
        } catch {
          errorMessage += ` - ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      this.log('收到响应', { duration, usage: result.usage });

      // 更新令牌使用统计
      this.tokenUsage.promptTokens += result.usage?.prompt_tokens || 0;
      this.tokenUsage.completionTokens += result.usage?.completion_tokens || 0;
      this.tokenUsage.totalTokens += result.usage?.total_tokens || 0;
      this.tokenUsage.requests += 1;

      return result;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`API请求超时 (${this.config.timeout}ms)`);
      }
      this.log('API调用错误', error);
      throw error;
    }
  }

  async chatWithRetry(request: DoubaoChatCompletionRequest): Promise<DoubaoChatCompletionResponse> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        this.log(`尝试请求 (${attempt}/${this.config.maxRetries})`);
        const response = await this.chat(request);
        if (attempt > 1) {
          this.log(`请求成功 (第${attempt}次尝试)`);
        }
        return response;
      } catch (error) {
        lastError = error as Error;

        // 检查是否是可重试的错误
        if (this.isRetryableError(lastError)) {
          if (attempt < this.config.maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            this.log(`等待 ${delay}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        } else {
          // 不可重试的错误，直接抛出
          this.log('不可重试的错误', lastError.message);
          throw lastError;
        }
      }
    }

    this.log('所有重试都失败');
    throw lastError;
  }

  private isRetryableError(error: Error): boolean {
    // 超时、网络错误、5xx错误可以重试
    const retryableMessages = [
      '超时',
      'timeout',
      '网络',
      'network',
      'fetch failed',
      'ECONNRESET',
      'ETIMEDOUT'
    ];

    const message = error.message.toLowerCase();
    return retryableMessages.some(keyword => message.includes(keyword.toLowerCase()));
  }

  getTokenUsage(): TokenUsage {
    return { ...this.tokenUsage };
  }

  resetTokenUsage(): void {
    this.tokenUsage = {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      requests: 0
    };
  }

  async generateContent(
    topic: string,
    contentType: string = 'blog',
    options: {
      wordCount?: number;
      language?: string;
      tone?: 'professional' | 'casual' | 'friendly' | 'technical' | 'educational';
      keywords?: string[];
    } = {}
  ) {
    const prompt = this.buildPrompt(topic, contentType, options);

    const response = await this.chatWithRetry({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的AI内容创作助手，擅长生成高质量、SEO友好的中文内容。请根据用户的需求创作内容。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: options.wordCount ? Math.min(options.wordCount * 3, 4000) : 3000
    });

    return response.choices[0]?.message?.content || '';
  }

  private buildPrompt(
    topic: string,
    contentType: string,
    options: {
      wordCount?: number;
      tone?: 'professional' | 'casual' | 'friendly' | 'technical' | 'educational';
      keywords?: string[];
    } = {}
  ) {
    const { wordCount = 1500, tone = 'professional', keywords = [] } = options;

    const toneDescription = {
      professional: '专业、权威的语调',
      casual: '轻松、易懂的语调',
      friendly: '友好、热情的语调',
      technical: '技术、详细的语调',
      educational: '教学、循序渐进的语调'
    }[tone];

    const keywordsSection = keywords.length > 0
      ? `请自然融入以下关键词：${keywords.join('、')}`
      : '';

    if (contentType === 'blog') {
      return `你是一位专业的中文内容创作专家和SEO优化师。

请为主题"${topic}"创作一篇约${wordCount}字的高质量博客文章，要求：

## 内容要求
1. 字数：约${wordCount}字
2. 语调：${toneDescription}
3. 语言：简体中文
4. 风格：原创、有深度、可读性强
5. SEO友好：${keywordsSection}

## 结构要求
- 引人入胜的标题（H1）
- 引言段落（2-3句话）
- 3-5个主要章节（H2标题）
- 每个章节下有1-2个子章节（H3标题，可选）
- 实用的要点或列表
- 总结和行动建议

## 格式要求
- 使用Markdown格式
- 标题层级清晰（H1, H2, H3）
- 使用有序/无序列表增强可读性
- 适当使用粗体和斜体强调重点
- 添加相关的FAQ部分（3-5个问题）

## 质量标准
- 内容真实可信
- 避免AI生成痕迹
- 逻辑连贯，过渡自然
- 提供实用价值

请直接返回文章内容，不需要额外说明。`;
    }

    if (contentType === 'review') {
      return `你是一位专业的产品评测专家。

请为主题"${topic}"写一篇约${wordCount}字的深度评测文章，要求：

## 内容要求
1. 字数：约${wordCount}字
2. 语调：${toneDescription}
3. 语言：简体中文
4. ${keywordsSection}

## 结构要求
- 评测背景和方法介绍
- 核心功能详细评测
- 实际使用体验分享
- 优缺点深度分析
- 与同类产品对比
- 购买建议和适用人群
- 总结与推荐

## 格式要求
- 使用Markdown格式
- 标题层级清晰
- 适当使用列表和表格

请直接返回文章内容，不需要额外说明。`;
    }

    if (contentType === 'tutorial') {
      return `你是一位专业的技术教程作者。

请为主题"${topic}"写一篇约${wordCount}字的教程文章，要求：

## 内容要求
1. 字数：约${wordCount}字
2. 语调：${toneDescription}
3. 语言：简体中文
4. ${keywordsSection}

## 结构要求
- 引言：解决什么问题
- 准备工作和前置知识
- 第一步：基础操作
- 第二步：进阶技巧
- 第三步：高级用法
- 常见问题和解决方案
- 最佳实践建议
- 效率提升技巧
- 总结和下一步

## 格式要求
- 使用Markdown格式
- 标题层级清晰
- 使用有序列表列出步骤

请直接返回文章内容，不需要额外说明。`;
    }

    if (contentType === 'news' || contentType === 'trend') {
      return `你是一位专业的行业分析师。

请为主题"${topic}"写一篇约${wordCount}字的趋势分析文章，要求：

## 内容要求
1. 字数：约${wordCount}字
2. 语调：${toneDescription}
3. 语言：简体中文
4. ${keywordsSection}

## 结构要求
- 引言：当前的AI时代/行业背景
- 趋势一：详细分析
- 趋势二：详细分析
- 趋势三：详细分析（可选）
- 对企业的影响
- 对个人的影响
- 机遇与挑战
- 专家观点
- 未来展望
- 总结与行动建议

## 格式要求
- 使用Markdown格式
- 标题层级清晰

请直接返回文章内容，不需要额外说明。`;
    }

    if (contentType === 'comparison') {
      return `你是一位专业的产品对比分析师。

请为主题"${topic}"写一篇约${wordCount}字的对比评测文章，要求：

## 内容要求
1. 字数：约${wordCount}字
2. 语调：${toneDescription}
3. 语言：简体中文
4. ${keywordsSection}

## 结构要求
- 引言：为什么对比这些工具
- 各产品/工具详细介绍
- 功能详细对比表
- 使用场景推荐
- 选择建议和购买指南

## 格式要求
- 使用Markdown格式
- 使用表格展示对比

请直接返回文章内容，不需要额外说明。`;
    }

    // 默认博客
    return `请为主题"${topic}"写一篇约${wordCount}字的高质量文章，使用Markdown格式，${toneDescription}，适合中文读者。${keywordsSection}`;
  }

  async generateTitle(topic: string): Promise<string> {
    const response = await this.chatWithRetry({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的内容标题创作者，擅长生成吸引人且SEO友好的中文标题。'
        },
        {
          role: 'user',
          content: `请为主题"${topic}"生成5个吸引人的博客标题，用中文，每个标题简洁明了，包含关键词。每行一个标题。`
        }
      ],
      temperature: 0.8
    });

    const content = response.choices[0]?.message?.content || '';
    const titles = content.split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.replace(/^\d+[\.\)\s]*/, '')); // 移除序号
    return titles[0] || topic;
  }

  async generateTitles(topic: string, count: number = 5): Promise<string[]> {
    const response = await this.chatWithRetry({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的内容标题创作者，擅长生成吸引人且SEO友好的中文标题。'
        },
        {
          role: 'user',
          content: `请为主题"${topic}"生成${count}个吸引人的博客标题，用中文，每个标题简洁明了，包含关键词。每行一个标题，不要序号。`
        }
      ],
      temperature: 0.8
    });

    const content = response.choices[0]?.message?.content || '';
    return content.split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .slice(0, count);
  }

  async generateDescription(topic: string, content: string): Promise<string> {
    const response = await this.chatWithRetry({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的内容创作者，擅长为文章生成吸引人的SEO描述。'
        },
        {
          role: 'user',
          content: `请为以下文章生成一个120-160字的SEO友好描述：

标题：${topic}

内容：${content.substring(0, 800)}

请只返回描述文本。`
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices[0]?.message?.content || `探索${topic}相关的精彩内容`;
  }

  async generateKeywords(topic: string, content: string): Promise<string[]> {
    const response = await this.chatWithRetry({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的SEO专家，擅长提取文章的关键词。'
        },
        {
          role: 'user',
          content: `请为以下文章提取5-8个相关的关键词：

标题：${topic}

内容：${content.substring(0, 800)}

请只返回关键词，每行一个，不要序号。`
        }
      ],
      temperature: 0.5,
      max_tokens: 200
    });

    const contentResult = response.choices[0]?.message?.content || '';
    return contentResult.split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .slice(0, 8);
  }

  async generateFAQ(topic: string, content: string, count: number = 5): Promise<Array<{ question: string; answer: string }>> {
    const response = await this.chatWithRetry({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的内容创作者，擅长为文章生成相关的FAQ部分。'
        },
        {
          role: 'user',
          content: `请为以下文章生成${count}个常见问题及答案：

标题：${topic}

内容：${content.substring(0, 1000)}

请按以下格式返回：
Q: 问题1
A: 答案1

Q: 问题2
A: 答案2

不要其他额外内容。`
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const faqText = response.choices[0]?.message?.content || '';
    const faqPairs: Array<{ question: string; answer: string }> = [];

    const qAPairs = faqText.split(/\n\s*(?=Q:)/i);
    for (const pair of qAPairs) {
      const qMatch = pair.match(/Q:\s*(.+?)(?:\n|$)/i);
      const aMatch = pair.match(/A:\s*([\s\S]+?)(?:\n(?=Q:)|$)/i);
      if (qMatch && aMatch) {
        faqPairs.push({
          question: qMatch[1].trim(),
          answer: aMatch[1].trim()
        });
      }
    }

    return faqPairs.slice(0, count);
  }
}

// 全局实例
let doubaoClient: DoubaoClient | null = null;

export function getDoubaoClient(): DoubaoClient {
  if (!doubaoClient) {
    const apiKey = process.env.VOLCENGINE_API_KEY || '';
    const model = process.env.VOLCENGINE_MODEL || '';
    const baseUrl = process.env.VOLCENGINE_BASE_URL || '';
    const timeout = process.env.AI_API_TIMEOUT ? parseInt(process.env.AI_API_TIMEOUT, 10) : undefined;
    const maxRetries = process.env.AI_MAX_RETRIES ? parseInt(process.env.AI_MAX_RETRIES, 10) : undefined;
    const enableLogging = process.env.AI_LOG_REQUESTS === 'true';

    if (!apiKey) {
      console.warn('未配置VOLCENGINE_API_KEY');
      throw new Error('请先配置VOLCENGINE_API_KEY环境变量');
    }

    doubaoClient = new DoubaoClient({
      apiKey,
      model: model || undefined,
      baseUrl: baseUrl || undefined,
      timeout,
      maxRetries,
      enableLogging
    });
  }

  return doubaoClient;
}

export function isDoubaoConfigured(): boolean {
  const apiKey = process.env.VOLCENGINE_API_KEY;
  const model = process.env.VOLCENGINE_MODEL;

  return !!(
    apiKey &&
    apiKey !== 'your_api_key_here' &&
    model &&
    model !== 'ep-20240101000000-xxxxx'
  );
}
