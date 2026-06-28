import { NextRequest, NextResponse } from 'next/server';
import { contentStore } from '@/lib/content-store';
import { getContentGenerator, isAIAvailable } from '@/lib/content-generator';
import { aiContentEngine } from '@/lib/ai-content-engine';
import type { ContentType } from '@/lib/ai-content-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      topic,
      category,
      author,
      contentType = 'blog',
      keywords,
      wordCount,
      tone,
      useFallback
    } = body;

    if (!topic || !category || !author) {
      return NextResponse.json(
        { success: false, message: '缺少必填字段：主题、分类、作者' },
        { status: 400 }
      );
    }

    console.log(`🤖 开始生成AI内容: ${topic}`);
    const startTime = Date.now();

    // 获取内容生成器
    const generator = getContentGenerator({
      preferFallback: useFallback === true
    });

    // 生成内容
    const generatedContent = await generator.generate({
      topic,
      contentType: contentType as ContentType,
      category,
      targetWordCount: wordCount || 1500,
      tone: tone || 'professional',
      keywords: keywords || []
    });

    const generationTime = Date.now() - startTime;
    console.log(`✅ 内容生成成功: ${generatedContent.title} (${generationTime}ms)`);

    // 保存到内容存储（如果是博客类型）
    let savedResult;
    if (contentType === 'blog') {
      savedResult = await contentStore.createBlogPost({
        slug: generateSlug(generatedContent.title),
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
      console.log(`✅ 博客文章保存成功: ${savedResult.title}`);
    }

    return NextResponse.json({
      success: true,
      message: '内容生成成功',
      data: {
        generatedContent,
        savedResult,
        isFallback: generatedContent.aiMetadata.isFallback,
        generationTime
      }
    });

  } catch (error) {
    console.error('AI内容生成失败:', error);
    return NextResponse.json(
      { success: false, message: '内容生成失败', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      // 返回服务状态
      const generator = getContentGenerator();
      const status = generator.getStatus();
      return NextResponse.json({
        success: true,
        data: {
          ...status,
          message: status.aiAvailable
            ? 'AI服务可用'
            : 'AI服务未配置，使用降级策略'
        }
      });
    }

    if (action === 'hot-topics') {
      // 获取热点话题
      const topics = await aiContentEngine.discoverHotTopics(6);
      return NextResponse.json({
        success: true,
        data: topics
      });
    }

    if (action === 'content-ideas') {
      const topic = searchParams.get('topic') || '';
      const count = parseInt(searchParams.get('count') || '5');

      // 尝试使用AI生成标题
      const generator = getContentGenerator();
      let ideas;

      if (topic && isAIAvailable()) {
        try {
          const titles = await generator.generateTitles(topic, count);
          ideas = titles.map((title, index) => ({
            id: `idea-${Date.now()}-${index}`,
            topic: { title },
            title,
            description: `关于"${topic}"的内容创意`,
            targetWordCount: 1500,
            contentType: 'blog' as const,
            seoKeywords: [topic],
            estimatedValue: 85
          }));
        } catch {
          // 降级到模拟生成
          const hotTopics = await aiContentEngine.discoverHotTopics(3);
          ideas = await aiContentEngine.generateContentIdeas(hotTopics, count);
        }
      } else {
        const hotTopics = await aiContentEngine.discoverHotTopics(3);
        ideas = await aiContentEngine.generateContentIdeas(hotTopics, count);
      }

      return NextResponse.json({
        success: true,
        data: ideas
      });
    }

    if (action === 'generate-title') {
      const topic = searchParams.get('topic');
      const contentType = searchParams.get('contentType') || 'blog';

      if (!topic) {
        return NextResponse.json(
          { success: false, message: '缺少topic参数' },
          { status: 400 }
        );
      }

      const generator = getContentGenerator();
      const title = await generator.generateTitle(topic, contentType);
      const titles = await generator.generateTitles(topic, 5);

      return NextResponse.json({
        success: true,
        data: { title, titles }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'AI内容生成API',
      endpoints: {
        'GET /api/ai/generate?action=status': '获取服务状态',
        'GET /api/ai/generate?action=hot-topics': '获取热点话题',
        'GET /api/ai/generate?action=content-ideas': '获取内容创意',
        'GET /api/ai/generate?action=generate-title&topic=xxx': '生成标题',
        'POST /api/ai/generate': '生成完整内容'
      }
    });

  } catch (error) {
    console.error('AI API失败:', error);
    return NextResponse.json(
      { success: false, message: '请求失败', error: String(error) },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60) || `post-${Date.now()}`;
}
