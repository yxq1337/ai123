// 专业级AI内容生成引擎 - 支持长文、去重、配图

export interface GeneratedImage {
  id: string;
  description: string;
  url: string;
  altText: string;
  prompt: string;
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  image?: GeneratedImage;
}

export interface LongFormArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  contentSections: ContentSection[];
  fullContent: string;
  wordCount: number;
  readTimeMinutes: number;
  images: GeneratedImage[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  originalityScore: number;
  duplicateCheck: {
    hasDuplicate: boolean;
    duplicateSections: string[];
    suggestedRewrites: string[];
  };
  createdAt: string;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  targetWordCount: number;
}

// 预置内容模板
export const LONG_FORM_TEMPLATES: ContentTemplate[] = [
  {
    id: 'tool-review',
    name: 'AI工具深度评测',
    description: '详细评测AI工具，包含使用体验、优缺点分析',
    sections: [
      '引言：为什么这个工具值得关注',
      '工具概况：什么是[工具名]',
      '核心功能详解',
      '实际使用体验',
      '优点与亮点',
      '缺点与不足',
      '适用场景分析',
      '与同类工具对比',
      '使用建议与技巧',
      '总结与购买建议'
    ],
    targetWordCount: 2000
  },
  {
    id: 'tutorial',
    name: '实用教程',
    description: '一步步教你如何使用AI工具',
    sections: [
      '引言：解决什么问题',
      '准备工作与前置知识',
      '第一步：基础操作',
      '第二步：进阶技巧',
      '第三步：高级用法',
      '常见问题与解决方案',
      '最佳实践建议',
      '效率提升技巧',
      '总结与下一步'
    ],
    targetWordCount: 1800
  },
  {
    id: 'trend-analysis',
    name: '趋势分析',
    description: '分析AI行业发展趋势',
    sections: [
      '引言：当前的AI浪潮',
      '趋势一：[趋势主题]',
      '趋势二：[趋势主题]',
      '趋势三：[趋势主题]',
      '趋势四：[趋势主题]',
      '对企业的影响',
      '对个人的影响',
      '机遇与挑战',
      '专家观点',
      '未来展望',
      '总结与行动建议'
    ],
    targetWordCount: 1900
  },
  {
    id: 'comparison',
    name: '工具对比',
    description: '横向对比多款AI工具',
    sections: [
      '引言：为什么对比这些工具',
      '工具A深度评测',
      '工具B深度评测',
      '工具C深度评测',
      '功能对比表',
      '价格对比',
      '用户体验对比',
      '不同场景推荐',
      '总结与选择建议'
    ],
    targetWordCount: 2000
  }
];

// 配图库 - 模拟AI生成的图片
const IMAGE_LIBRARY = [
  { emoji: '🤖', desc: 'AI机器人助手', colors: ['#667eea', '#764ba2'] },
  { emoji: '🎨', desc: 'AI艺术创作', colors: ['#f093fb', '#f5576c'] },
  { emoji: '⚡', desc: 'AI闪电般的速度', colors: ['#4facfe', '#00f2fe'] },
  { emoji: '📊', desc: 'AI数据分析', colors: ['#43e97b', '#38f9d7'] },
  { emoji: '✨', desc: 'AI魔法效果', colors: ['#ffecd2', '#fcb69f'] },
  { emoji: '🧠', desc: 'AI神经网络', colors: ['#a8edea', '#fed6e3'] },
  { emoji: '🚀', desc: 'AI技术革新', colors: ['#667eea', '#764ba2'] },
  { emoji: '💡', desc: 'AI创意灵感', colors: ['#ffecd2', '#fcb69f'] },
  { emoji: '🎯', desc: 'AI精准定位', colors: ['#4facfe', '#00f2fe'] },
  { emoji: '📝', desc: 'AI写作助手', colors: ['#f093fb', '#f5576c'] }
];

// 内容段落库
const CONTENT_PARAGRAPHS = {
  intro: [
    "在当今快速发展的AI时代，新工具和新技术层出不穷，选择最适合自己的AI助手变得尤为重要。本文将深入探讨这个领域，为您提供全面而实用的信息。",
    "人工智能正在以前所未有的速度改变我们的工作和生活方式。作为内容创作者和技术爱好者，我们有责任了解并善用这些强大的工具。",
    "随着AI技术的飞速进步，越来越多的创新工具进入我们的视野。今天，让我们一起深入了解这一领域的最新动态和实用工具。"
  ],
  feature: [
    "这款工具最引人注目的功能是其强大的处理能力。无论是处理复杂的文本任务，还是进行创意内容生成，它都能提供令人满意的结果。",
    "核心功能包括智能文本分析、多语言支持、上下文理解以及高质量的输出。这些功能的组合使得这款工具在众多竞品中脱颖而出。",
    "我们特别注意到其创新的工作流设计，让用户能够更高效地完成任务，大大提升了整体使用体验。"
  ],
  experience: [
    "在我们长达数周的深度使用中，这款工具展现了非常稳定的性能。无论是处理简单任务还是复杂项目，它都能保持良好的响应速度和输出质量。",
    "实际使用体验超出了我们的预期。界面设计友好直观，即使是初学者也能快速上手，而高级用户会发现其中的强大功能。",
    "从日常工作到创意项目，这款工具展现出了出色的适应性和实用性，真正成为了工作流程中不可或缺的一部分。"
  ],
  pros: [
    "首先要提到的是其卓越的输出质量。AI生成的内容质量很高，在大多数情况下只需要少量编辑即可使用，这大大节省了时间。",
    "速度和效率是另一个巨大优势。相比于传统方法，使用这款工具可以节省约60-70%的时间，让你能够专注于更重要的工作。",
    "持续的更新和改进也让我们印象深刻。开发团队积极响应用户反馈，不断推出新功能和优化，让工具的价值持续提升。"
  ],
  cons: [
    "尽管这款工具很强大，但也存在一些局限性。例如，在处理非常专业或技术深度的内容时，偶尔会出现事实性错误，需要人工验证。",
    "价格方面，虽然物有所值，但对于预算有限的个人用户或小型团队来说，可能需要考虑一下成本投入。",
    "学习曲线确实存在，特别是对于那些不太熟悉AI工具的用户，需要一些时间来完全掌握其全部功能。"
  ],
  conclusion: [
    "总体而言，这是一款非常优秀的AI工具，值得推荐给大多数内容创作者和专业人士使用。它的优势明显超过了其局限性。",
    "在AI工具竞争激烈的今天，这款产品凭借其出色的综合表现，确实值得您投入时间和资源去尝试。",
    "我们对这款工具的未来发展充满期待，也相信它会持续进化，为用户带来更多惊喜和价值。"
  ]
};

// 原创性检查 - 模拟去重功能
export class OriginalityChecker {
  private knownPhrases: Set<string>;

  constructor() {
    this.knownPhrases = new Set([
      '人工智能是未来',
      'AI改变世界',
      '机器学习算法',
      '深度学习技术',
      '自然语言处理',
      '创新解决方案',
      '提高工作效率',
      '数字化转型'
    ]);
  }

  checkContent(content: string): {
    originalityScore: number;
    hasDuplicate: boolean;
    duplicateSections: string[];
    suggestedRewrites: string[];
  } {
    let duplicateCount = 0;
    let duplicateSections: string[] = [];
    let suggestedRewrites: string[] = [];

    // 检查常见重复词组
    const sentences = content.split(/[。！？.!?]/).filter(s => s.trim().length > 20);

    for (const sentence of sentences) {
      for (const phrase of Array.from(this.knownPhrases)) {
        if (sentence.includes(phrase)) {
          duplicateCount++;
          duplicateSections.push(sentence.trim());

          // 建议重写
          suggestedRewrites.push(this.suggestRewrite(phrase));
        }
      }
    }

    // 检查内容多样性
    const wordFrequency = this.analyzeWordFrequency(content);
    const repetitiveWords = Object.entries(wordFrequency)
      .filter(([_, count]) => count > 5)
      .map(([word]) => word);

    if (repetitiveWords.length > 3) {
      duplicateCount += repetitiveWords.length;
    }

    // 计算原创性分数 (0-100)
    const baseScore = 85;
    const penalty = Math.min(duplicateCount * 2, 40);
    const originalityScore = Math.max(baseScore - penalty, 40);

    return {
      originalityScore,
      hasDuplicate: duplicateCount > 3,
      duplicateSections: duplicateSections.slice(0, 5),
      suggestedRewrites
    };
  }

  private analyzeWordFrequency(content: string): Record<string, number> {
    const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const frequency: Record<string, number> = {};

    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    return frequency;
  }

  private suggestRewrite(phrase: string): string {
    const alternatives: Record<string, string> = {
      '人工智能是未来': 'AI技术正在深刻影响各个领域的发展',
      'AI改变世界': '人工智能正在以创新的方式重塑各行业',
      '机器学习算法': '先进的学习算法正在不断进化',
      '深度学习技术': '深层神经网络技术展现巨大潜力',
      '自然语言处理': '语言理解与生成能力有了突破进展'
    };

    return alternatives[phrase] || `考虑重新表达：${phrase}`;
  }
}

// 配图生成器
export class ImageGenerator {
  private images: GeneratedImage[];

  constructor() {
    this.images = [];
  }

  generateForTopic(topic: string, count: number = 3): GeneratedImage[] {
    const generated: GeneratedImage[] = [];
    const shuffled = [...IMAGE_LIBRARY].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const imgData = shuffled[i];
      const id = `img-${Date.now()}-${i}`;

      generated.push({
        id,
        description: `${topic}相关：${imgData.desc}`,
        url: this.generateImageUrl(topic, i),
        altText: `${topic}${imgData.desc}`,
        prompt: `${topic}, ${imgData.desc}, professional illustration, ${imgData.colors.join(', ')}`
      });
    }

    this.images.push(...generated);
    return generated;
  }

  private generateImageUrl(topic: string, index: number): string {
    // 生成模拟的图片URL
    const topicSlug = topic.toLowerCase().replace(/[^a-z一-龥]+/g, '-');
    return `/api/ai-image/${topicSlug}-${index}?t=${Date.now()}`;
  }
}

// 长文生成引擎
export class LongFormContentEngine {
  private originalityChecker: OriginalityChecker;
  private imageGenerator: ImageGenerator;

  constructor() {
    this.originalityChecker = new OriginalityChecker();
    this.imageGenerator = new ImageGenerator();
  }

  async generateArticle(
    topic: string,
    category: string,
    author: string,
    options?: {
      targetWordCount?: number;
      templateId?: string;
      includeImages?: boolean;
    }
  ): Promise<LongFormArticle> {
    const {
      targetWordCount = 1800,
      templateId = 'tool-review',
      includeImages = true
    } = options || {};

    // 选择模板
    const template = LONG_FORM_TEMPLATES.find(t => t.id === templateId) || LONG_FORM_TEMPLATES[0];

    // 生成标题
    const title = this.generateTitle(topic, category);

    // 生成各章节内容
    const sections: ContentSection[] = [];
    let totalWordCount = 0;

    for (let i = 0; i < template.sections.length; i++) {
      const sectionTemplate = template.sections[i].replace('[工具名]', topic);
      const section = await this.generateSection(
        sectionTemplate,
        topic,
        Math.round((targetWordCount / template.sections.length) * (0.8 + Math.random() * 0.4))
      );

      sections.push(section);
      totalWordCount += section.wordCount;
    }

    // 去重检查
    const fullContent = this.buildFullContent(sections);
    const duplicateCheck = this.originalityChecker.checkContent(fullContent);

    // 生成配图
    let images: GeneratedImage[] = [];
    if (includeImages) {
      images = this.imageGenerator.generateForTopic(topic, 4);

      // 为主要章节分配图片
      const imageSections = [0, 2, 4]; // 引言、功能、优点章节
      imageSections.forEach((sectionIdx, imgIdx) => {
        if (sections[sectionIdx] && images[imgIdx]) {
          sections[sectionIdx].image = images[imgIdx];
        }
      });
    }

    // 构建完整文章
    const article: LongFormArticle = {
      id: `article-${Date.now()}`,
      title,
      description: `关于${topic}的深度分析与实用指南`,
      slug: this.generateSlug(title),
      category,
      tags: this.generateTags(topic, category),
      author,
      contentSections: sections,
      fullContent,
      wordCount: totalWordCount,
      readTimeMinutes: Math.ceil(totalWordCount / 200),
      images,
      seo: {
        title: `${title} | ${category}`,
        description: `${topic}深度解析，包含实际使用体验、优缺点分析和实用建议`,
        keywords: [topic, category, 'AI工具', '实用指南', '深度评测']
      },
      originalityScore: duplicateCheck.originalityScore,
      duplicateCheck,
      createdAt: new Date().toISOString()
    };

    return article;
  }

  private generateTitle(topic: string, category: string): string {
    const titles = [
      `${topic}深度评测：值得使用吗？`,
      `2024${topic}完全指南：从入门到精通`,
      `对比评测：${topic}与其他工具的选择建议`,
      `${topic}实战技巧：提升效率的10个方法`,
      `为什么${topic}成为行业首选？全面分析`,
      `${topic}专业评测：优缺点与适用场景`
    ];

    return titles[Math.floor(Math.random() * titles.length)];
  }

  private async generateSection(title: string, topic: string, targetWordCount: number): Promise<ContentSection> {
    // 根据标题类型选择内容
    let content = '';

    if (title.includes('引言') || title.includes('为什么')) {
      content = this.buildParagraphs(CONTENT_PARAGRAPHS.intro, targetWordCount);
    } else if (title.includes('功能') || title.includes('核心')) {
      content = this.buildParagraphs(CONTENT_PARAGRAPHS.feature, targetWordCount);
    } else if (title.includes('体验') || title.includes('使用')) {
      content = this.buildParagraphs(CONTENT_PARAGRAPHS.experience, targetWordCount);
    } else if (title.includes('优点') || title.includes('亮点') || title.includes('优势')) {
      content = this.buildParagraphs(CONTENT_PARAGRAPHS.pros, targetWordCount);
    } else if (title.includes('缺点') || title.includes('不足') || title.includes('局限')) {
      content = this.buildParagraphs(CONTENT_PARAGRAPHS.cons, targetWordCount);
    } else if (title.includes('总结') || title.includes('建议')) {
      content = this.buildParagraphs(CONTENT_PARAGRAPHS.conclusion, targetWordCount);
    } else {
      // 通用内容生成
      content = this.buildGenericSection(title, topic, targetWordCount);
    }

    // 插入主题相关内容
    content = content.replace(/这个工具/g, topic);
    content = content.replace(/这款工具/g, topic);

    return {
      id: `section-${Date.now()}-${Math.random()}`,
      title,
      content,
      wordCount: content.split(/\s+/).length
    };
  }

  private buildParagraphs(paragraphs: string[], targetWordCount: number): string {
    let content = '';
    let currentWordCount = 0;

    // 重复使用段落直到达到目标字数
    let iterations = 0;
    while (currentWordCount < targetWordCount && iterations < 3) {
      for (const paragraph of paragraphs) {
        if (currentWordCount >= targetWordCount) break;

        // 添加变体
        let modifiedPara = paragraph;
        if (iterations > 0) {
          modifiedPara = this.addVariations(paragraph, iterations);
        }

        content += '\n\n' + modifiedPara;
        currentWordCount += paragraph.split(/\s+/).length;
      }
      iterations++;
    }

    return content.trim();
  }

  private addVariations(paragraph: string, variation: number): string {
    // 添加一些变化性
    const additions = [
      '根据我们的实际测试，',
      '从用户的反馈来看，',
      '值得注意的是，',
      '在长期使用中，',
      '从数据统计的角度，'
    ];

    const addition = additions[variation % additions.length];

    if (paragraph.length > 50) {
      return addition + paragraph.charAt(0).toLowerCase() + paragraph.slice(1);
    }

    return paragraph;
  }

  private buildGenericSection(title: string, topic: string, targetWordCount: number): string {
    const baseContent = [
      `${title}是使用${topic}时不可忽视的重要方面。让我们从多个角度来探讨这一话题，为您提供全面的参考。`,
      `在深入了解${topic}的过程中，我们发现了许多有趣的现象和实用的技巧。这些经验对于使用类似工具的用户也有很好的借鉴意义。`,
      `无论是初学者还是经验丰富的用户，都能从这些观察中获得启发。重要的是根据自己的实际需求来选择最合适的方法。`,
      `技术在不断进步，我们也需要保持学习的心态，持续关注新功能和最佳实践的发展。这样才能在竞争中保持优势。`
    ];

    return this.buildParagraphs(baseContent, targetWordCount);
  }

  private buildFullContent(sections: ContentSection[]): string {
    let content = '';

    for (const section of sections) {
      content += `## ${section.title}\n\n`;

      if (section.image) {
        content += `![${section.image.altText}](${section.image.url} "${section.image.description}")\n\n`;
      }

      content += section.content + '\n\n';
    }

    return content;
  }

  private generateTags(topic: string, category: string): string[] {
    const baseTags = [topic, category, 'AI工具', '实用指南'];
    const extraTags = ['效率提升', '工作流优化', '工具推荐', '专业评测'];
    const shuffled = extraTags.sort(() => Math.random() - 0.5);

    return [...baseTags, ...shuffled.slice(0, 3)];
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
  }
}

// 导出单例
export const aiContentPro = new LongFormContentEngine();
