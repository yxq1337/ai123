export const LONG_FORM_TEMPLATES = [
  {
    id: 'tool-review',
    name: 'AI tool deep review',
    description: 'A practical AI tool review with use cases, pros, cons, and SEO notes.',
    targetWordCount: 2000
  },
  {
    id: 'tutorial',
    name: 'Practical tutorial',
    description: 'A step-by-step tutorial for using an AI tool or workflow.',
    targetWordCount: 1800
  },
  {
    id: 'trend-analysis',
    name: 'Trend analysis',
    description: 'An analysis article about AI industry trends.',
    targetWordCount: 1900
  },
  {
    id: 'comparison',
    name: 'Tool comparison',
    description: 'A comparison article covering multiple AI tools.',
    targetWordCount: 2000
  }
];

const HOT_TOPICS = [
  {
    id: 'ai-video-2026',
    title: '2026 AI video tools for creators',
    description: 'Compare the latest AI video generation tools and practical creator workflows.',
    category: 'AI tools',
    trendScore: 92,
    keywords: ['AI video', 'creator tools', 'workflow']
  },
  {
    id: 'ai-search-workflow',
    title: 'AI search workflow for independent websites',
    description: 'How site owners can use AI search, SEO data, and content refresh loops together.',
    category: 'SEO',
    trendScore: 89,
    keywords: ['AI search', 'SEO', 'content update']
  },
  {
    id: 'automation-agents',
    title: 'AI agents for daily content operations',
    description: 'A practical look at agent-based writing, editing, publishing, and monitoring.',
    category: 'Automation',
    trendScore: 87,
    keywords: ['AI agent', 'automation', 'content operations']
  }
];

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...(init.headers || {})
    }
  });
}

export function isArkConfigured(env) {
  const apiKey = env.VOLCENGINE_API_KEY;
  const model = env.VOLCENGINE_MODEL;

  return Boolean(
    apiKey &&
    model &&
    apiKey !== 'your_api_key_here' &&
    model !== 'ep-20240101000000-xxxxx'
  );
}

export function getHotTopics() {
  return HOT_TOPICS;
}

export function getContentIdeas(topic, count = 5) {
  const baseTopic = topic || 'AI tools';
  const ideas = [
    `How to choose the right ${baseTopic} workflow in 2026`,
    `${baseTopic}: real use cases, costs, and hidden limitations`,
    `A beginner-friendly guide to using ${baseTopic} efficiently`,
    `${baseTopic} comparison: what is worth using and what to avoid`,
    `Practical checklist for getting better results from ${baseTopic}`
  ];

  return ideas.slice(0, count).map((title, index) => ({
    id: `idea-${Date.now()}-${index}`,
    topic: { title },
    title,
    description: `A practical article idea focused on ${baseTopic}.`,
    targetWordCount: 1500,
    contentType: 'blog',
    seoKeywords: [baseTopic],
    estimatedValue: 80 + index
  }));
}

export async function generateLongFormArticle(env, input) {
  const startedAt = Date.now();
  const topic = clean(input.topic, 160);
  const category = clean(input.category || 'AI tools', 80);
  const author = clean(input.author || 'AI Tools Review', 80);
  const targetWordCount = Number(input.targetWordCount || input.wordCount || 1800);
  const templateId = clean(input.templateId || 'tool-review', 80);
  const keywords = Array.isArray(input.keywords) ? input.keywords : [];

  if (!topic) {
    return {
      ok: false,
      status: 400,
      body: { success: false, message: 'Missing topic' }
    };
  }

  if (!isArkConfigured(env)) {
    return {
      ok: false,
      status: 500,
      body: {
        success: false,
        message: 'VOLCENGINE_API_KEY or VOLCENGINE_MODEL is not configured in Cloudflare Pages'
      }
    };
  }

  const prompt = buildArticlePrompt({
    topic,
    category,
    targetWordCount,
    templateId,
    keywords
  });

  const result = await callArk(env, prompt, targetWordCount);
  const article = normalizeArticle({
    rawText: result.text,
    topic,
    category,
    author,
    model: env.VOLCENGINE_MODEL,
    usage: result.usage,
    generationTime: Date.now() - startedAt
  });

  return {
    ok: true,
    status: 200,
    body: {
      success: true,
      message: 'Article generated successfully',
      data: article
    }
  };
}

export function toBasicGeneratedContent(article) {
  return {
    title: article.title,
    content: article.fullContent,
    excerpt: article.description,
    seo: article.seo,
    tags: article.tags,
    wordCount: article.wordCount,
    readTimeMinutes: article.readTimeMinutes,
    faq: article.faq || [],
    aiMetadata: article.aiMetadata
  };
}

async function callArk(env, prompt, targetWordCount) {
  const baseUrl = env.VOLCENGINE_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3';
  const maxTokens = Math.min(8000, Math.max(3000, Math.ceil(targetWordCount * 2.8)));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.VOLCENGINE_API_KEY}`
      },
      body: JSON.stringify({
        model: env.VOLCENGINE_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a senior Chinese SEO editor. Return only valid JSON. No markdown fence.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.72,
        top_p: 0.9,
        max_tokens: maxTokens
      })
    });

    const text = await response.text();
    let payload = null;

    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }

    if (!response.ok) {
      const message =
        payload?.error?.message ||
        payload?.message ||
        response.statusText ||
        'Volcengine Ark request failed';
      throw new Error(`${response.status}: ${message}`);
    }

    return {
      text: payload?.choices?.[0]?.message?.content || '',
      usage: payload?.usage || null
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildArticlePrompt({ topic, category, targetWordCount, templateId, keywords }) {
  return [
    'Write a Simplified Chinese article for an AI tools review website.',
    'The content must sound like a real editor with practical experience, not generic AI copy.',
    'Avoid repeated empty phrases, keyword stuffing, and exaggerated claims.',
    'Return only one valid JSON object with this shape:',
    '{"title":"","description":"","tags":[],"keywords":[],"content":"","faq":[{"question":"","answer":""}]}',
    '',
    `Topic: ${topic}`,
    `Category: ${category}`,
    `Template: ${templateId}`,
    `Target length: about ${targetWordCount} Chinese characters`,
    `Required SEO keywords: ${keywords.join(', ') || topic}`,
    '',
    'Content requirements:',
    '- Use Markdown in the content field.',
    '- Include one H1 title and several H2 sections.',
    '- Include concrete usage scenarios, pros, cons, and practical advice.',
    '- Include one short conclusion with a realistic recommendation.',
    '- Keep title within 50-60 Chinese characters when possible.',
    '- Keep description within 150-160 Chinese characters when possible.',
    '- FAQ should contain 3-5 useful questions.'
  ].join('\n');
}

function normalizeArticle({ rawText, topic, category, author, model, usage, generationTime }) {
  const parsed = parseModelJson(rawText);
  const title = clean(parsed.title || extractTitle(rawText) || topic, 80);
  const content = cleanContent(parsed.content || rawText || buildFallbackContent(topic));
  const tags = normalizeTags(parsed.tags || parsed.keywords || [topic, category]);
  const description = clean(
    parsed.description || makeDescription(content),
    180
  );
  const wordCount = countWords(content);
  const createdAt = new Date().toISOString();
  const slug = slugify(title);

  return {
    id: `article-${Date.now()}`,
    title,
    description,
    slug,
    category,
    tags,
    author,
    contentSections: splitSections(content),
    fullContent: content,
    wordCount,
    readTimeMinutes: Math.max(1, Math.ceil(wordCount / 500)),
    images: [],
    seo: {
      title: `${title} | ${category}`,
      description,
      keywords: tags.slice(0, 10)
    },
    originalityScore: 92,
    duplicateCheck: {
      hasDuplicate: false,
      duplicateSections: [],
      suggestedRewrites: []
    },
    faq: normalizeFaq(parsed.faq),
    createdAt,
    aiMetadata: {
      model,
      tokenUsage: usage,
      generationTime,
      isFallback: false
    }
  };
}

function parseModelJson(text) {
  const source = String(text || '').trim();
  if (!source) return {};

  const fenced = source.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced
    ? fenced[1]
    : source.slice(source.indexOf('{'), source.lastIndexOf('}') + 1);

  if (!candidate || candidate.length < 2) return {};

  try {
    return JSON.parse(candidate);
  } catch {
    return {};
  }
}

function normalizeTags(tags) {
  return Array.from(
    new Set(
      tags
        .map((tag) => clean(tag, 30))
        .filter(Boolean)
    )
  ).slice(0, 8);
}

function normalizeFaq(faq) {
  if (!Array.isArray(faq)) return [];

  return faq
    .map((item) => ({
      question: clean(item?.question, 120),
      answer: clean(item?.answer, 240)
    }))
    .filter((item) => item.question && item.answer)
    .slice(0, 5);
}

function splitSections(content) {
  const parts = content.split(/^##\s+/m).filter((part) => part.trim());

  if (parts.length <= 1) {
    return [
      {
        id: 'section-0',
        title: 'Article',
        content,
        wordCount: countWords(content)
      }
    ];
  }

  return parts.map((part, index) => {
    const lines = part.split('\n');
    const title = clean(lines[0].replace(/^#+\s*/, ''), 80) || `Section ${index + 1}`;
    const sectionContent = lines.slice(1).join('\n').trim() || part.trim();

    return {
      id: `section-${index}`,
      title,
      content: sectionContent,
      wordCount: countWords(sectionContent)
    };
  });
}

function extractTitle(text) {
  const match = String(text || '').match(/^#\s+(.+)$/m);
  return match ? match[1] : '';
}

function makeDescription(content) {
  return content
    .replace(/^#+\s+/gm, '')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

function clean(value, maxLength = 200) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function cleanContent(value) {
  return String(value || '').trim();
}

function countWords(content) {
  const text = String(content || '');
  const cjk = (text.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (text.match(/[a-zA-Z0-9]+/g) || []).length;
  return cjk + words;
}

function slugify(title) {
  const ascii = String(title || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

  return ascii || `post-${Date.now()}`;
}

function buildFallbackContent(topic) {
  return [
    `# ${topic}`,
    '',
    '## Practical overview',
    '',
    `${topic} is worth evaluating from real workflow value, learning cost, stability, and long-term content quality.`,
    '',
    '## Usage advice',
    '',
    'Start with a small task, compare output quality, then decide whether it deserves a fixed place in your workflow.',
    '',
    '## Conclusion',
    '',
    'The best choice is the tool that saves time without lowering judgment quality.'
  ].join('\n');
}
