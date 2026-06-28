import { getToolsByCategory, getCategories } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeURIComponent(params.category);

  return {
    title: `${category} AI工具评测与推荐`,
    description: `发现${category}类 AI 工具的真实评测、优缺点、适用场景和替代方案，快速找到适合你的 AI 工具。`,
    alternates: {
      canonical: `/categories/${encodeURIComponent(category)}/`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories('en');
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const tools = await getToolsByCategory(category, 'en');
  const categories = await getCategories('en');

  if (tools.length === 0) {
    notFound();
  }

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

      <main style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <Link href="/tools" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '8px' }}>
            ← 返回全部工具
          </Link>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
            {category}
          </h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${encodeURIComponent(cat)}`}
                className="hover-button"
                style={{
                  backgroundColor: cat === category ? 'var(--color-primary)' : 'var(--color-background-secondary)',
                  color: cat === category ? 'white' : 'var(--color-text-muted)',
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: cat === category ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                }}
              >
                {cat}
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
