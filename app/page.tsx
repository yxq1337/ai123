import { getTools, getCategories } from '@/lib/api';
import Link from 'next/link';

export default async function HomePage() {
  const tools = await getTools('en');
  const categories = await getCategories('en');

  const topTools = [...tools].sort((a, b) => b.review.rating - a.review.rating).slice(0, 6);

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', textDecoration: 'none' }}>
            AI工具评测
          </Link>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <Link href="/" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>首页</Link>
            <Link href="/tools" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>全部工具</Link>
            <Link href="/about" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>关于我们</Link>
            <Link href="/contact" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>联系方式</Link>
          </nav>
        </div>
      </header>

      <main>
        <section style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          padding: '80px 0',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
              发现最好用的AI工具
            </h1>
            <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '32px' }}>
              专业评测、真实体验，帮你找到最适合的AI助手
            </p>
            <Link
              href="/tools"
              className="hover-button"
              style={{
                display: 'inline-block',
                background: 'white',
                color: 'var(--color-primary)',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              浏览全部工具
            </Link>
          </div>
        </section>

        <section style={{ padding: '60px 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-primary)' }}>
            热门分类
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '18px' }}>
            按分类找到你需要的AI工具
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="hover-button"
                style={{
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  border: '1px solid var(--color-border)'
                }}
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section style={{ padding: '40px 0 80px', backgroundColor: 'var(--color-background-secondary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-primary)' }}>
              精选推荐
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', fontSize: '18px' }}>
              我们亲测好用的优质AI工具
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {topTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="hover-card"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid var(--color-border)',
                      borderRadius: '12px',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '48px' }}>{tool.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', margin: 0 }}>
                            {tool.name}
                          </h3>
                          <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '18px' }}>
                            ★ {tool.review.rating}
                          </span>
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', margin: '12px 0', lineHeight: '1.6' }}>
                          {tool.description}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {tool.categories.slice(0, 2).map((category) => (
                            <span
                              key={category}
                              style={{
                                backgroundColor: 'var(--color-background-secondary)',
                                color: 'var(--color-text-muted)',
                                fontSize: '12px',
                                padding: '4px 12px',
                                borderRadius: '999px'
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link
                href="/tools"
                className="hover-button"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                查看全部工具
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--color-border)', padding: '40px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p style={{ marginBottom: '16px', fontSize: '16px' }}>AI工具评测 © {new Date().getFullYear()}</p>
          <p>专业、真实、可信的AI工具评测平台</p>
        </div>
      </footer>
    </>
  );
}
