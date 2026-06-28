import { notFound } from 'next/navigation';
import Link from 'next/link';
import { contentStore } from '@/lib/content-store';
import { getAuthorByName } from '@/data/site';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await contentStore.getContentBySlug(params.slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords?.join(', '),
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await contentStore.getAllContent('blog');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await contentStore.getContentBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorByName(post.author);

  return (
    <>
      <header style={{
        borderBottom: '2px solid #f0f0f0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <Link href="/" style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#667eea',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚡</span> AI内容工场
          </Link>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/blog" style={{ color: '#333', textDecoration: 'none' }}>博客</Link>
            <Link href="/publish" style={{
              color: 'white',
              background: '#667eea',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700
            }}>发布文章</Link>
          </nav>
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#fafafa' }}>
        <article style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '48px 20px'
        }}>
          {/* 返回按钮 */}
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#666',
              textDecoration: 'none',
              marginBottom: '28px',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            ← 返回博客列表
          </Link>

          {/* 文章标题 */}
          <h1 style={{
            fontSize: '40px',
            fontWeight: 800,
            marginBottom: '20px',
            lineHeight: '1.2',
            color: '#111'
          }}>
            {post.title}
          </h1>

          {/* 文章信息 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '28px',
            color: '#666',
            fontSize: '14px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              👤 {post.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              📂 {post.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              🕐 {new Date(post.createdAt).toLocaleDateString('zh-CN')}
            </span>
            {('wordCount' in post) && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✍️ {post.wordCount}字
              </span>
            )}
            {('readTimeMinutes' in post) && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⏱️ {post.readTimeMinutes}分钟阅读
              </span>
            )}
          </div>

          {/* 质量标签 */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{
              background: post.isAIGenerated ? '#f0f9ff' : '#f0fdf4',
              color: post.isAIGenerated ? '#0369a1' : '#166534',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600
            }}>
              {post.isAIGenerated ? '🤖 AI 生成' : '✍️ 原创'}
            </div>
            {('originalityScore' in post) && (
              <div style={{
                background: post.originalityScore >= 80 ? '#ecfdf5' : post.originalityScore >= 60 ? '#fffbeb' : '#fef2f2',
                color: post.originalityScore >= 80 ? '#047857' : post.originalityScore >= 60 ? '#b45309' : '#b91c1c',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600
              }}>
                原创度 {post.originalityScore}/100
              </div>
            )}
            {post.isHumanReviewed && (
              <div style={{
                background: '#f0fdf4',
                color: '#166534',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600
              }}>
                ✓ 人工审核
              </div>
            )}
          </div>

          {/* 文章标签 */}
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: '#f0f4ff',
                  color: '#4338ca',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 文章描述 */}
          {post.description && (
            <div style={{
              fontSize: '18px',
              color: '#444',
              lineHeight: '1.7',
              marginBottom: '36px',
              padding: '20px',
              background: '#f8f9ff',
              borderLeft: '4px solid #667eea',
              borderRadius: '0 8px 8px 0'
            }}>
              {post.description}
            </div>
          )}

          {/* 文章内容 */}
          <div style={{
            lineHeight: '1.9',
            fontSize: '17px',
            color: '#333',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div
              dangerouslySetInnerHTML={{
                __html: formatContent('content' in post ? post.content : '')
              }}
            />
          </div>

          {/* 作者信息 */}
          <div style={{
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid #eee'
          }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              padding: '24px',
              background: '#f8f9ff',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0
              }}>
                {author.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{author.name}</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{author.title}</div>
                <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.6' }}>{author.bio}</div>
              </div>
            </div>
          </div>

          {/* 相关文章 */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #eee' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>📚 相关文章</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <Link
                href="/publish"
                style={{
                  padding: '20px',
                  border: '2px dashed #ddd',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#666',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
                <div style={{ fontWeight: 600 }}>发布新文章</div>
                <div style={{ fontSize: '13px', marginTop: '4px' }}>用 AI 创作更多内容</div>
              </Link>
            </div>
          </div>

        </article>
      </main>

      <footer style={{
        borderTop: '1px solid #eee',
        background: 'white',
        marginTop: 'auto',
        padding: '32px 20px',
        textAlign: 'center',
        color: '#999'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>AI内容工场 © {new Date().getFullYear()} | 智能创作，高效发布</p>
        </div>
      </footer>
    </>
  );
}

function formatContent(content: string): string {
  if (!content) return '<p>暂无内容</p>';

  // 完整的Markdown格式转换，支持图片
  return content
    // 标题
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 20px; font-weight: 800; margin: 28px 0 12px; color: #222;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 24px; font-weight: 800; margin: 36px 0 16px; color: #111;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 28px; font-weight: 800; margin: 40px 0 20px;">$1</h1>')
    // 图片标记 - 生成漂亮的图片占位符
    .replace(/!\[(.*?)\]\((.*?) "(.*?)"\)/g, `
      <div style="
        margin: 32px 0;
        padding: 40px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
      ">
        <div style="color: white; font-size: 64px; margin-bottom: 12px;">🖼️</div>
        <div style="color: white; opacity: 0.95; font-size: 16px; font-weight: 600;">$1</div>
        <div style="color: rgba(255,255,255,0.7); font-size: 13px; margin-top: 6px;">AI 生成配图</div>
      </div>
    `)
    // 简单图片格式
    .replace(/!\[(.*?)\]\((.*?)\)/g, `
      <div style="
        margin: 32px 0;
        padding: 40px 20px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 8px 24px rgba(245, 87, 108, 0.3);
      ">
        <div style="color: white; font-size: 64px; margin-bottom: 12px;">🖼️</div>
        <div style="color: white; opacity: 0.95; font-size: 16px; font-weight: 600;">$1</div>
      </div>
    `)
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700; color: #111;">$1</strong>')
    // 段落
    .replace(/\n\n/g, '</p><p style="margin-bottom: 20px; line-height: 1.9;">')
    .replace(/^(?!<[h|p|div])(.*$)/gim, '<p style="margin-bottom: 20px; line-height: 1.9;">$1</p>')
    .replace(/^<p><\/p>/g, '');
}
