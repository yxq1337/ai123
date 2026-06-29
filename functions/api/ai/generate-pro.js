import {
  LONG_FORM_TEMPLATES,
  generateLongFormArticle,
  isArkConfigured,
  json
} from '../../_lib/ai-content.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (action === 'templates') {
    return json({
      success: true,
      data: LONG_FORM_TEMPLATES
    });
  }

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

  return json({
    success: true,
    message: 'Professional AI content generation API',
    endpoints: {
      'GET /api/ai/generate-pro?action=status': 'service status',
      'GET /api/ai/generate-pro?action=templates': 'template list',
      'POST /api/ai/generate-pro': 'generate long-form article'
    }
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const result = await generateLongFormArticle(env, body);
    return json(result.body, { status: result.status });
  } catch (error) {
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Article generation failed'
      },
      { status: 500 }
    );
  }
}
