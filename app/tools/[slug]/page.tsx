import { notFound } from 'next/navigation';
import { getToolBySlug, getTools } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';
import { ToolPageSchema, BreadcrumbListSchema } from '@/app/components/SchemaOrg';
import { AuthorBio } from '@/app/components/AuthorBio';
import { UserQuestions } from '@/app/components/UserQuestions';
import { siteConfig } from '@/data/site';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug, 'en');
  if (!tool) {
    return { title: '工具未找到 - AI工具评测' };
  }
  return {
    title: `${tool.name} - AI工具评测`,
    description: tool.description
  };
}

export async function generateStaticParams() {
  const tools = await getTools('en');
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug, 'en');

  if (!tool) {
    notFound();
  }

  const allTools = await getTools('en');
  const relatedTools = allTools
    .filter((t) => tool.alternatives.includes(t.slug) && t.id !== tool.id)
    .slice(0, 5);

  return (
    <>
      <ToolPageSchema tool={tool} />
      <BreadcrumbListSchema items={[
        { name: '首页', url: siteConfig.url },
        { name: '全部工具', url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` }
      ]} />

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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
            <div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div style={{ fontSize: '64px' }}>{tool.logo}</div>
                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--color-primary)', margin: 0 }}>
                    {tool.name}
                  </h1>
                  <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', margin: '8px 0' }}>
                    {tool.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {tool.categories.map((category) => (
                      <span
                        key={category}
                        style={{
                          backgroundColor: 'var(--color-background-secondary)',
                          color: 'var(--color-text-muted)',
                          fontSize: '14px',
                          padding: '6px 12px',
                          borderRadius: '999px'
                        }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-button"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '12px 32px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'inline-block'
                      }}
                    >
                      访问官网
                    </a>
                  </div>
                </div>
              </div>

              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  我们的使用体验
                </h2>
                <div style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text)', whiteSpace: 'pre-line' }}>
                  {tool.review.ourExperience}
                </div>
              </section>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                <div style={{ padding: '24px', backgroundColor: 'var(--color-background-secondary)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '16px' }}>
                    ✓ 优点
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    {tool.review.pros.map((pro, i) => (
                      <li key={i} style={{ marginBottom: '8px', fontSize: '16px' }}>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: '24px', backgroundColor: 'var(--color-background-secondary)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px' }}>
                    ✗ 缺点
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)' }}>
                    {tool.review.cons.map((con, i) => (
                      <li key={i} style={{ marginBottom: '8px', fontSize: '16px' }}>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {tool.faq && tool.faq.length > 0 && (
                <section style={{ marginBottom: '48px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '20px' }}>
                    💬 常见问题
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tool.faq.map((item, index) => (
                      <details
                        key={index}
                        style={{
                          backgroundColor: 'var(--color-background-secondary)',
                          borderRadius: '12px',
                          padding: '16px 20px'
                        }}
                      >
                        <summary style={{
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: 'var(--color-text)'
                        }}>
                          {item.question}
                        </summary>
                        <p style={{
                          marginTop: '12px',
                          fontSize: '15px',
                          color: 'var(--color-text-secondary)',
                          lineHeight: '1.6',
                          marginBottom: 0
                        }}>
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <AuthorBio
                authorName={tool.review.author}
                eeatMetadata={tool.eeatMetadata}
              />

              <UserQuestions tool={tool} />
            </div>

            <aside>
              {relatedTools.length > 0 && (
                <div style={{ position: 'sticky', top: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                    替代工具推荐
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {relatedTools.map((relatedTool) => (
                      <Link
                        key={relatedTool.id}
                        href={`/tools/${relatedTool.slug}`}
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        <div
                          className="hover-card"
                          style={{
                            padding: '16px',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            backgroundColor: 'white'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '28px' }}>{relatedTool.logo}</div>
                            <div>
                              <p style={{ color: 'var(--color-text)', fontWeight: 'bold', margin: 0 }}>
                                {relatedTool.name}
                              </p>
                              <span style={{ color: 'var(--color-accent)', fontSize: '14px' }}>
                                ★ {relatedTool.review.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
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
