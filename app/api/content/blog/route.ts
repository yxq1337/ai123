import { NextRequest, NextResponse } from 'next/server';
import { contentStore } from '@/lib/content-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      description,
      category,
      author,
      tags,
      slug,
      seo,
      faq,
      isAIGenerated = true,
      aiContributionPercent = 70
    } = body;

    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { success: false, message: '缺少必填字段：标题、内容、分类、作者' },
        { status: 400 }
      );
    }

    const blogPost = await contentStore.createBlogPost({
      slug: slug || generateSlug(title),
      title,
      description,
      category,
      author,
      tags: tags || [],
      content,
      excerpt: description || content.substring(0, 160),
      seo: seo || {
        title: title,
        description: description || content.substring(0, 160),
        keywords: tags || []
      },
      faq
    }, {
      isAIGenerated,
      aiContributionPercent
    });

    return NextResponse.json({
      success: true,
      message: '博客文章创建成功',
      data: blogPost
    });

  } catch (error) {
    console.error('创建博客文章失败:', error);
    return NextResponse.json(
      { success: false, message: '创建失败', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const author = searchParams.get('author');

    if (id) {
      const content = await contentStore.getContentById(id);
      if (!content) {
        return NextResponse.json(
          { success: false, message: '内容不存在' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: content });
    }

    if (slug) {
      const content = await contentStore.getContentBySlug(slug);
      if (!content) {
        return NextResponse.json(
          { success: false, message: '内容不存在' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: content });
    }

    let contents;
    if (category) {
      contents = await contentStore.getContentByCategory(category, 'blog');
    } else if (author) {
      contents = await contentStore.getContentByAuthor(author, 'blog');
    } else {
      contents = await contentStore.getAllContent('blog');
    }

    return NextResponse.json({ success: true, data: contents });

  } catch (error) {
    console.error('获取博客文章失败:', error);
    return NextResponse.json(
      { success: false, message: '获取失败', error: String(error) },
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
