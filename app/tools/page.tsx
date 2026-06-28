import { getTools, getCategories } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '全部AI工具 - AI工具评测',
  description: '浏览所有AI工具，按分类筛选，找到最适合你的AI助手。',
  alternates: {
    canonical: '/tools/',
  },
};

export default async function ToolsPage() {
  const tools = await getTools('en');
  const categories = await getCategories('en');

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

      <main id="main-content" style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
            全部AI工具
          </h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="hover-button"
                style={{
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-muted)',
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1px solid var(--color-border)'
                }}
              >
                {category}
              </Link>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
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
                    <div style={{ fontSize: '40px' }}>{tool.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', margin: 0 }}>
                          {tool.name}
                        </h3>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>★ {tool.review.rating}</span>
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)', margin: '8px 0', fontSize: '14px', lineHeight: '1.6' }}>
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
                              padding: '4px 8px',
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
