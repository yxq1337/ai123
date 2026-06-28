import Link from 'next/link';
import { contentStore } from '@/lib/content-store';

export const metadata = {
  title: '博客 | AI内容工场',
  description: 'AI生成的高质量文章集合',
  alternates: {
    canonical: '/blog/',
  },
};

export default async function BlogPage() {
  const posts = await contentStore.getAllContent('blog');

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
            <Link href="/blog" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 700 }}>博客</Link>
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
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 20px' }}>
          {/* 页面标题 */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 800,
              marginBottom: '12px',
              color: '#111'
            }}>
              📝 AI 博客
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              AI 生成的高质量文章，每天更新
            </p>
          </div>

          {posts.length === 0 ? (
            // 空状态
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '2px dashed #ddd',
              borderRadius: '16px',
              background: 'white'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>📭</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>还没有文章</h2>
              <p style={{ color: '#666', marginBottom: '28px', fontSize: '16px' }}>
                开始使用 AI 内容自动化工具发布您的第一篇文章！
              </p>
              <Link href="/publish" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '14px 32px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '16px'
              }}>
                ✨ 发布第一篇文章
              </Link>
            </div>
          ) : (
            // 文章列表
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="hover-card"
                  style={{
                    display: 'block',
                    background: 'white',
                    border: '2px solid #eee',
                    borderRadius: '16px',
                    padding: '28px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    gap: '12px'
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h2 style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        marginBottom: '8px',
                        color: '#111',
                        lineHeight: '1.3'
                      }}>
                        {post.title}
                      </h2>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '14px',
                        alignItems: 'center',
                        fontSize: '13px',
                        color: '#888'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          👤 {post.author}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          📂 {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          🕐 {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                        {('wordCount' in post) && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            ✍️ {post.wordCount}字
                          </span>
                        )}
                        {('readTimeMinutes' in post) && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            ⏱️ {post.readTimeMinutes}分钟
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 质量标签 */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: post.isAIGenerated ? '#f0f9ff' : '#f0fdf4',
                        color: post.isAIGenerated ? '#0369a1' : '#166534',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600
                      }}>
                        {post.isAIGenerated ? '🤖 AI' : '✍️ 原创'}
                      </span>
                      {('originalityScore' in post) && (
                        <span style={{
                          background: post.originalityScore >= 80 ? '#ecfdf5' : post.originalityScore >= 60 ? '#fffbeb' : '#fef2f2',
                          color: post.originalityScore >= 80 ? '#047857' : post.originalityScore >= 60 ? '#b45309' : '#b91c1c',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 600
                        }}>
                          {post.originalityScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 描述 */}
                  <p style={{
                    color: '#555',
                    lineHeight: '1.7',
                    marginBottom: '16px',
                    fontSize: '15px'
                  }}>
                    {post.description}
                  </p>

                  {/* 标签 */}
                  {post.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {post.tags.slice(0, 4).map(tag => (
                        <span key={tag} style={{
                          background: '#f0f4ff',
                          color: '#4338ca',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 500
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 阅读更多 */}
                  <div style={{
                    marginTop: '16px',
                    color: '#667eea',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    阅读文章 →
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 底部提示 */}
          <div style={{
            marginTop: '56px',
            textAlign: 'center',
            padding: '28px',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #eee'
          }}>
            <p style={{ marginBottom: '16px', color: '#555', fontSize: '15px' }}>
              💡 想要发布更多 AI 内容？使用我们的自动化工具一键生成高质量文章！
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/publish" style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700
              }}>
                🚀 发布新文章
              </Link>
              <Link href="/automation-admin" style={{
                padding: '12px 28px',
                border: '2px solid #eee',
                borderRadius: '10px',
                textDecoration: 'none',
                color: '#333',
                fontWeight: 600
              }}>
                📊 管理面板
              </Link>
            </div>
          </div>

        </div>
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
