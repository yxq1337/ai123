// 降级策略服务 - API失败时提供模拟内容
import type {
  ContentGenerationOptions,
  GeneratedContent,
  AIContentService,
  ContentType
} from './ai-content-service';

// 内容模板库
const CONTENT_TEMPLATES: Record<ContentType, {
  titlePatterns: string[];
  sections: string[];
}> = {
  'blog': {
    titlePatterns: [
      '{topic}深度解析：从入门到精通',
      '2024年{topic}完全指南',
      '{topic}实战：提升效率的10个方法',
      '为什么{topic}成为行业首选？全面分析',
      '{topic}专业指南：核心概念与实用技巧'
    ],
    sections: [
      '引言：为什么这个话题重要',
      '核心概念详解',
      '实战应用指南',
      '常见问题解答',
      '最佳实践建议',
      '总结与展望'
    ]
  },
  'review': {
    titlePatterns: [
      '{topic}深度评测：真实使用体验',
      '2024年最佳{topic}对比评测',
      '{topic}值得用吗？全面分析',
      '{topic}专业评测：优缺点与适用场景'
    ],
    sections: [
      '评测背景介绍',
      '核心功能分析',
      '实际使用体验',
      '优缺点深度分析',
      '与同类产品对比',
      '购买建议',
      '总结'
    ]
  },
  'tutorial': {
    titlePatterns: [
      '{topic}完整教程：从零开始到精通',
      '如何掌握{topic}：分步指南',
      '{topic}实战教程：10分钟上手'
    ],
    sections: [
      '引言：解决什么问题',
      '准备工作与前置知识',
      '第一步：基础操作',
      '第二步：进阶技巧',
      '第三步：高级用法',
      '常见问题与解决方案',
      '最佳实践',
      '总结'
    ]
  },
  'news': {
    titlePatterns: [
      '最新{topic}动态：行业趋势分析',
      '{topic}发展：你需要知道的10件事',
      '2024年{topic}的最新发展'
    ],
    sections: [
      '最新动态速览',
      '详细分析与解读',
      '对行业的影响',
      '专家观点',
      '未来展望',
      '行动建议'
    ]
  },
  'comparison': {
    titlePatterns: [
      '{topic}对比：哪个最适合你？',
      '{topic}完整对比：功能、价格、优缺点',
      '{topic}怎么选？10个维度深度对比'
    ],
    sections: [
      '对比说明',
      '各产品详细介绍',
      '功能对比表',
      '使用场景推荐',
      '选择建议'
    ]
  },
  'how-to': {
    titlePatterns: [
      '如何用{topic}实现目标：完整指南',
      '{topic}实用技巧：解决常见问题',
      '用{topic}提升效率的7个方法'
    ],
    sections: [
      '问题介绍',
      '准备工作',
      '具体步骤',
      '常见问题',
      '进阶技巧',
      '成功案例'
    ]
  },
  'list': {
    titlePatterns: [
      '2024年最好的{topic}推荐：TOP 15',
      '{topic}终极清单',
      '精选{topic}资源大全'
    ],
    sections: [
      '清单介绍',
      '资源详细介绍',
      '分类对比',
      '选择建议',
      '获取方式'
    ]
  }
};

// 段落生成器
const PARAGRAPH_GENERATORS = {
  intro: (topic: string) => `在当今快速发展的时代，${topic}已经成为不可忽视的重要话题。无论是对于初学者还是资深从业者，理解和掌握${topic}都具有重要的现实意义。

本文将从多个角度深入探讨${topic}，帮助你获得全面的理解和实用的知识。让我们开始这段探索之旅。`,

  concept: (topic: string) => `要理解${topic}，首先需要掌握其核心概念。${topic}涉及多个方面，包括基本原理、应用场景和最佳实践。

从本质上讲，${topic}是一套系统化的方法和工具，旨在解决特定领域的问题。通过学习和应用${topic}，我们可以显著提升工作效率和质量。`,

  practice: (topic: string) => `理论学习固然重要，但实践是掌握${topic}的关键。在实际应用中，我们需要注意以下几点：

1. 从简单开始，循序渐进地掌握核心功能
2. 保持学习心态，持续关注最新发展
3. 结合实际情况灵活运用，不要生搬硬套
4. 记录经验教训，持续优化改进

通过不断实践和总结，你会逐渐形成自己的方法论和最佳实践。`,

  faq: (topic: string) => [
    {
      question: `什么是${topic}？`,
      answer: `${topic}是一个涉及多个方面的综合性概念，包括理论知识、实践技能和工具应用。它可以帮助我们更高效地完成特定任务。`
    },
    {
      question: `学习${topic}需要什么基础？`,
      answer: `学习${topic}的基础要求因人而异。一般来说，具备相关领域的基本知识会有所帮助，但即使是零基础，通过系统学习也可以掌握。`
    },
    {
      question: `${topic}有哪些实际应用场景？`,
      answer: `${topic}的应用场景非常广泛，包括但不限于日常工作、项目管理、内容创作、数据分析等多个领域。具体应用取决于你的实际需求。`
    },
    {
      question: `如何快速上手${topic}？`,
      answer: `快速上手${topic}的最佳方法是理论结合实践。先学习核心概念，然后立即动手实践，在实践中遇到问题再深入学习相关知识。`
    },
    {
      question: `${topic}的未来发展趋势如何？`,
      answer: `${topic}领域正在快速发展，新技术和新方法不断涌现。保持持续学习的心态，关注行业动态，是跟上发展步伐的关键。`
    }
  ],

  conclusion: (topic: string) => `通过本文的深入探讨，相信你对${topic}已经有了更全面的认识。知识的价值在于应用，希望你能将所学知识运用到实际工作中。

记住，学习是一个持续的过程。${topic}领域在不断发展，保持好奇心和学习热情，你将不断获得新的收获和成长。

感谢阅读！如果觉得这篇文章对你有帮助，欢迎分享给更多人。让我们一起在学习的道路上不断进步！`
};

export class FallbackContentService implements AIContentService {
  async generateContent(options: ContentGenerationOptions): Promise<GeneratedContent> {
    console.log(`⚠️ [Fallback] 使用降级策略生成内容: ${options.topic}`);
    const startTime = Date.now();

    const template = CONTENT_TEMPLATES[options.contentType] || CONTENT_TEMPLATES['blog'];

    // 生成标题
    const title = this.generateTitle(template.titlePatterns, options.topic);

    // 生成内容
    const content = this.generateArticle(
      title,
      options.topic,
      template.sections,
      options.targetWordCount || 1500
    );

    // 生成其他元数据
    const wordCount = this.countWords(content);
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const excerpt = this.generateExcerpt(content);
    const keywords = this.generateKeywords(options.topic, options.category);
    const faq = PARAGRAPH_GENERATORS.faq(options.topic);

    const generationTime = Date.now() - startTime;

    return {
      title,
      content,
      excerpt,
      seo: {
        title: `${title} | ${options.category}`,
        description: `深入探讨${options.topic}，提供实用指南和专业见解。`,
        keywords
      },
      tags: keywords,
      wordCount,
      readTimeMinutes,
      faq,
      aiMetadata: {
        model: 'fallback-generator',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, requests: 0 },
        generationTime,
        isFallback: true
      }
    };
  }

  async generateTitle(topic: string, contentType: string): Promise<string> {
    const template = CONTENT_TEMPLATES[contentType as ContentType] || CONTENT_TEMPLATES['blog'];
    return this.generateTitle(template.titlePatterns, topic);
  }

  async generateTitles(topic: string, count: number = 5): Promise<string[]> {
    const allPatterns = Object.values(CONTENT_TEMPLATES).flatMap(t => t.titlePatterns);
    const uniquePatterns = [...new Set(allPatterns)];
    const shuffled = uniquePatterns.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count).map(pattern =>
      pattern.replace('{topic}', topic)
    );
  }

  async generateDescription(title: string, content: string): Promise<string> {
    return this.generateExcerpt(content, 160);
  }

  async generateKeywords(title: string, content: string): Promise<string[]> {
    return this.generateKeywords(title, '');
  }

  async generateFAQ(topic: string, content: string, count: number = 5): Promise<Array<{ question: string; answer: string }>> {
    const faq = PARAGRAPH_GENERATORS.faq(topic);
    return faq.slice(0, count);
  }

  private generateTitle(patterns: string[], topic: string): string {
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern.replace('{topic}', topic);
  }

  private generateArticle(title: string, topic: string, sections: string[], targetWordCount: number): string {
    let content = `# ${title}\n\n`;

    // 引言
    content += PARAGRAPH_GENERATORS.intro(topic) + '\n\n';

    // 主体章节
    const sectionsPerArticle = Math.min(sections.length, 4 + Math.floor(Math.random() * 3));
    const selectedSections = sections.slice(0, sectionsPerArticle);

    for (const sectionTitle of selectedSections) {
      if (sectionTitle.includes('引言')) continue;

      content += `## ${sectionTitle}\n\n`;
      content += this.generateSectionContent(sectionTitle, topic) + '\n\n';
    }

    // 总结
    content += `## 总结\n\n`;
    content += PARAGRAPH_GENERATORS.conclusion(topic);

    // FAQ部分
    content += '\n\n## 常见问题\n\n';
    const faq = PARAGRAPH_GENERATORS.faq(topic);
    for (const item of faq.slice(0, 3)) {
      content += `### ${item.question}\n\n${item.answer}\n\n`;
    }

    return content;
  }

  private generateSectionContent(sectionTitle: string, topic: string): string {
    if (sectionTitle.includes('概念') || sectionTitle.includes('核心')) {
      return PARAGRAPH_GENERATORS.concept(topic);
    }
    if (sectionTitle.includes('实战') || sectionTitle.includes('应用') || sectionTitle.includes('步骤')) {
      return PARAGRAPH_GENERATORS.practice(topic);
    }

    // 通用内容
    return `${sectionTitle}是学习${topic}过程中的重要环节。

在这一部分，我们将深入探讨相关的核心概念和实用技巧。通过具体的例子和详细的解释，帮助你建立扎实的知识基础。

记住，理论学习需要结合实践才能真正掌握。建议你在阅读的同时，动手尝试相关的操作，这样可以加深理解并发现问题。

随着对${topic}理解的深入，你会发现更多的应用场景和可能性。保持探索精神，不断学习和实践，你将获得更多的收获。`;
  }

  private generateExcerpt(content: string, maxLength: number = 180): string {
    let cleanText = content
      .replace(/^#+\s+.*$/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~`]+/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    if (cleanText.length <= maxLength) {
      return cleanText;
    }

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

  private generateKeywords(topic: string, category: string): string[] {
    const baseKeywords = [topic, category];
    const additionalKeywords = [
      '实用指南',
      '效率提升',
      '最佳实践',
      '专业评测',
      '入门教程',
      '深度学习',
      '实战技巧'
    ];

    const shuffled = additionalKeywords.sort(() => Math.random() - 0.5);
    return [...baseKeywords, ...shuffled.slice(0, 5)].filter(Boolean);
  }

  private countWords(content: string): number {
    const chineseChars = (content.match(/[一-龥]/g) || []).length;
    const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
    return chineseChars + englishWords;
  }
}

// 导出单例
let fallbackServiceInstance: FallbackContentService | null = null;

export function getFallbackContentService(): FallbackContentService {
  if (!fallbackServiceInstance) {
    fallbackServiceInstance = new FallbackContentService();
  }
  return fallbackServiceInstance;
}
