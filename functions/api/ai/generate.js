import {
  generateLongFormArticle,
  getContentIdeas,
  getHotTopics,
  isArkConfigured,
  json,
  toBasicGeneratedContent
} from '../../_lib/ai-content.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (action === 'status') {
    const aiAvailable = isArkConfigured(env);

    return json({
      success: true,
      data: {
        aiAvailable,
        fallbackEnabled: false,
        preferFallback: false,
        message: aiAvailable ? 'AI service is available' : 'AI service is not configured'
      }
    });
  }

  if (action === 'hot-topics') {
    return json({
      success: true,
      data: getHotTopics()
    });
  }

  if (action === 'content-ideas') {
    const topic = url.searchParams.get('topic') || 'AI tools';
    const count = Number(url.searchParams.get('count') || 5);

    return json({
      success: true,
      data: getContentIdeas(topic, count)
    });
  }

  if (action === 'generate-title') {
    const topic = url.searchParams.get('topic') || 'AI tools';

    return json({
      success: true,
      data: {
        title: `${topic}: practical review and usage guide`,
        titles: getContentIdeas(topic, 5).map((idea) => idea.title)
      }
    });
  }

  return json({
    success: true,
    message: 'AI content generation API',
    endpoints: {
      'GET /api/ai/generate?action=status': 'service status',
      'GET /api/ai/generate?action=hot-topics': 'hot topics',
      'GET /api/ai/generate?action=content-ideas': 'content ideas',
      'GET /api/ai/generate?action=generate-title&topic=xxx': 'generate title',
      'POST /api/ai/generate': 'generate article'
    }
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const result = await generateLongFormArticle(env, body);

    if (!result.ok) {
      return json(result.body, { status: result.status });
    }

    return json({
      success: true,
      message: 'Content generated successfully',
      data: toBasicGeneratedContent(result.body.data)
    });
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Content generation failed'
      },
      { status: 500 }
    );
  }
}
