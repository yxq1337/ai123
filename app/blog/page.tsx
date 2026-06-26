import Link from 'next/link';
import { automationStore } from '@/lib/automation-store';

export const metadata = {
  title: '博客 - AI工具评测',
  description: 'AI内容自动化发布的博客文章'
};

export default async function BlogPage() {
  const posts = await automationStore.getAllPosts();

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', textDecoration: 'none' }}>
            AI工具评测
          </Link>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <Link href="/" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>首页</Link>
            <Link href="/automation-admin" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>管理</Link>
            <Link href="/automation-test" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>发布</Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '12px' }}>
              📝 博客文章
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px' }}>
              通过AI内容自动化系统发布的文章
            </p>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', border: '2px dashed var(--color-border)', borderRadius: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>还没有文章</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                快去发布你的第一篇文章吧！
              </p>
              <Link href="/automation-test" style={{
                display: 'inline-block',
                background: 'var(--color-primary)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                🚀 发布第一篇文章
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {posts.map((post) => (
                <article key={post.id} style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'box-shadow 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {post.title}
                      </h2>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                        <span>👤 {post.author || '匿名'}</span>
                        {post.category && <span>📂 {post.category}</span>}
                        <span>🕐 {new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {post.tags.map((tag: string) => (
                          <span key={tag} style={{
                            background: 'var(--color-background-secondary)',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '12px'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {post.excerpt && (
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
                      {post.excerpt}
                    </p>
                  )}

                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <details style={{ cursor: 'pointer' }}>
                      <summary style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                        阅读全文
                      </summary>
                      <div style={{
                        marginTop: '16px',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-wrap',
                        color: 'var(--color-text)'
                      }}>
                        {post.content}
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div style={{ marginTop: '48px', textAlign: 'center', padding: '24px', background: 'var(--color-background-secondary)', borderRadius: '12px' }}>
            <p style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}>
              💡 这就是AI内容自动化的力量！文章自动发布，无需手动操作。
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/automation-test" style={{
                padding: '10px 20px',
                background: 'var(--color-primary)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                发布文章
              </Link>
              <Link href="/automation-admin" style={{
                padding: '10px 20px',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--color-text)'
              }}>
                管理面板
              </Link>
            </div>
          </div>

        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p>AI工具评测 © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
