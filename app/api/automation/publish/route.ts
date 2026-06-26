import { NextRequest, NextResponse } from 'next/server';
import type { PublishRequest, PublishResponse } from '@/lib/automation-types';
import { siteConfig } from '@/data/site';
import { automationStore } from '@/lib/automation-store';

export async function POST(request: NextRequest) {
  try {
    const body: PublishRequest = await request.json();

    // 验证API密钥
    const { apiKey, siteId, post, options } = body;

    if (!apiKey || !siteId) {
      return NextResponse.json<PublishResponse>({
        success: false,
        message: '缺少必要参数: apiKey 和 siteId',
        error: 'missing_params'
      }, { status: 400 });
    }

    // 使用存储系统验证API密钥
    const isValid = await automationStore.validateApiKey(siteId, apiKey);
    if (!isValid) {
      return NextResponse.json<PublishResponse>({
        success: false,
        message: 'API密钥验证失败',
        error: 'invalid_api_key'
      }, { status: 401 });
    }

    // 验证文章内容
    if (!post.title || !post.content) {
      return NextResponse.json<PublishResponse>({
        success: false,
        message: '文章缺少必要内容: title 和 content 是必填项',
        error: 'invalid_post_data'
      }, { status: 400 });
    }

    // 生成Slug（如果未提供）
    const slug = post.slug || generateSlug(post.title);

    // 保存文章到存储系统
    const postId = await automationStore.savePost(post, siteId);
    const postUrl = `${siteConfig.url}/blog/${slug}`;

    // 记录日志
    console.log(`[Automation] 文章发布成功: ${post.title} (ID: ${postId})`);

    // 返回成功响应
    return NextResponse.json<PublishResponse>({
      success: true,
      message: '文章发布成功',
      postId,
      postUrl
    }, { status: 200 });

  } catch (error) {
    console.error('[Automation] API错误:', error);

    return NextResponse.json<PublishResponse>({
      success: false,
      message: '服务器内部错误',
      error: 'internal_error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'AI内容自动化API - 使用POST方法发布内容',
    documentation: '/automation-docs',
    version: '1.0.0',
    endpoints: {
      publish: '/api/automation/publish (POST)',
      status: '/api/automation/status (GET)',
      logs: '/api/automation/logs (GET)'
    }
  });
}

// 生成URL友好的Slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}
