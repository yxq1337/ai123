import { getTools, getCategories } from '@/lib/api';
import Link from 'next/link';
import { OrganizationSchema } from './components/SchemaOrg';
import { SkipLink } from './components/InteractiveButton';
import { FeatureCard } from './components/FeatureCard';
import { siteConfig } from '@/data/site';

export default async function HomePage() {
  const tools = await getTools('en');
  const categories = await getCategories('en');

  const topTools = [...tools].sort((a, b) => b.review.rating - a.review.rating).slice(0, 6);
  const recentTools = [...tools].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4);

  // Group tools by category for featured sections
  const writingTools = tools.filter(t => t.categories.includes('写作')).slice(0, 3);
  const designTools = tools.filter(t => t.categories.includes('设计') || t.categories.includes('图像')).slice(0, 3);
  const codingTools = tools.filter(t => t.categories.includes('编程')).slice(0, 3);

  return (
    <>
      <OrganizationSchema />
      <SkipLink />

      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            <span style={{ fontSize: '1.75rem', marginRight: '0.5rem' }}>🤖</span>
            AI工具评测
          </Link>
          <nav className="nav">
            <Link href="/" className="nav-link active">首页</Link>
            <Link href="/tools" className="nav-link">全部工具</Link>
            <Link href="/about" className="nav-link">关于我们</Link>
            <Link href="/contact" className="nav-link">联系方式</Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['🤖', '🎨', '⚡', '🎬', '📝'].map((emoji, idx) => (
                <span
                  key={idx}
                  className="float"
                  style={{
                    fontSize: '2.5rem',
                    animationDelay: `${idx * 0.2}s`,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>
            <h1 className="hero-title">
              发现最好用的AI工具
            </h1>
            <p className="hero-description">
              专业评测、真实体验，帮你找到最适合的AI助手
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/tools"
                className="btn btn-primary"
              >
                🚀 浏览全部工具
              </Link>
              <Link
                href="/about"
                className="btn btn-secondary"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                了解我们
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section" style={{ background: 'var(--color-background-tertiary)' }}>
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{tools.length}+</div>
                <div className="stat-label">已评测工具</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{categories.length}+</div>
                <div className="stat-label">覆盖分类</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100万+</div>
                <div className="stat-label">服务用户</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5</div>
                <div className="stat-label">专业评测师</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span style={{ marginRight: '0.5rem' }}>🏷️</span>
                热门分类
              </h2>
              <p className="section-subtitle">按分类找到你需要的AI工具</p>
            </div>
            <div className="tag-cloud" style={{ justifyContent: 'center' }}>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="tag"
                  style={{
                    fontSize: '1rem',
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="section" style={{ background: 'var(--color-background-tertiary)' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span style={{ marginRight: '0.5rem' }}>⭐</span>
                精选推荐
              </h2>
              <p className="section-subtitle">我们亲测好用的优质AI工具</p>
            </div>
            <div className="grid grid-3" style={{ gap: '1.5rem' }}>
              {topTools.map((tool, idx) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className={`card hover-card ${idx === 0 ? 'card-featured' : ''}`}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    {idx === 0 && (
                      <div className="featured-badge">🔥 编辑推荐</div>
                    )}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div className="tool-emoji">{tool.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0 }}>
                            {tool.name}
                          </h3>
                          <span className="rating">
                            ★ {tool.review.rating}
                          </span>
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', margin: '0.75rem 0', lineHeight: '1.6', fontSize: '0.9375rem' }}>
                          {tool.description}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {tool.categories.slice(0, 2).map((category) => (
                            <span
                              key={category}
                              className="badge badge-primary"
                              style={{ fontSize: '0.75rem' }}
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
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link
                href="/tools"
                className="btn btn-primary"
              >
                查看全部工具 →
              </Link>
            </div>
          </div>
        </section>

        {/* Category Featured Sections */}
        <section className="section">
          <div className="container">
            <div style={{ marginBottom: '3rem' }}>
              <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>✍️</span>
                  AI写作工具
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'left' }}>提升写作效率的AI助手</p>
              </div>
              <div className="grid grid-3" style={{ gap: '1.25rem' }}>
                {writingTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="card hover-card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span className="tool-emoji" style={{ fontSize: '2.5rem' }}>{tool.logo}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--color-text)', margin: '0 0 0.25rem 0' }}>
                            {tool.name}
                          </h4>
                          <span className="rating" style={{ fontSize: '0.875rem' }}>
                            ★ {tool.review.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>🎨</span>
                  AI设计工具
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'left' }}>创意工作者的AI伙伴</p>
              </div>
              <div className="grid grid-3" style={{ gap: '1.25rem' }}>
                {designTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="card hover-card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span className="tool-emoji" style={{ fontSize: '2.5rem' }}>{tool.logo}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--color-text)', margin: '0 0 0.25rem 0' }}>
                            {tool.name}
                          </h4>
                          <span className="rating" style={{ fontSize: '0.875rem' }}>
                            ★ {tool.review.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>💻</span>
                  AI编程工具
                </h2>
                <p className="section-subtitle" style={{ textAlign: 'left' }}>开发者的AI助手</p>
              </div>
              <div className="grid grid-3" style={{ gap: '1.25rem' }}>
                {codingTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className="card hover-card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span className="tool-emoji" style={{ fontSize: '2.5rem' }}>{tool.logo}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--color-text)', margin: '0 0 0.25rem 0' }}>
                            {tool.name}
                          </h4>
                          <span className="rating" style={{ fontSize: '0.875rem' }}>
                            ★ {tool.review.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Content Automation Feature Section */}
        <section className="section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="container" style={{ color: 'white' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                ⚡ AI内容自动化
              </h2>
              <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
                让AI自动更新网站内容，用AI替代重复的内容生产，用自动化流程串起发布环节
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <FeatureCard
                href="/automation-admin"
                emoji="🎛️"
                title="管理面板"
                description="监控系统状态、查看活动日志、管理内容发布"
              />
              <FeatureCard
                href="/automation-test"
                emoji="✍️"
                title="发布文章"
                description="快速发布新文章，测试AI内容自动化功能"
              />
              <FeatureCard
                href="/automation-docs"
                emoji="📚"
                title="配置文档"
                description="查看详细的API文档和配置指南"
              />
              <FeatureCard
                href="/blog"
                emoji="📖"
                title="博客文章"
                description="查看所有通过AI自动化发布的文章"
              />
            </div>
          </div>
        </section>

        {/* Recent Updates Section */}
        <section className="section" style={{ background: 'var(--color-background-tertiary)' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span style={{ marginRight: '0.5rem' }}>🆕</span>
                最新更新
              </h2>
              <p className="section-subtitle">最近评测和更新的工具</p>
            </div>
            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
              {recentTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="card hover-card">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '2rem' }}>{tool.logo}</span>
                          <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', margin: 0 }}>
                              {tool.name}
                            </h3>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                              更新于 {tool.updatedAt}
                            </span>
                          </div>
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6' }}>
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span style={{ marginRight: '0.5rem' }}>💡</span>
                为什么选择我们
              </h2>
              <p className="section-subtitle">专业、真实、可信的AI工具评测</p>
            </div>
            <div className="grid grid-3" style={{ gap: '1.5rem' }}>
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  真实体验
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', margin: 0 }}>
                  所有评测都基于实际使用体验，不做虚假宣传
                </p>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  专业评测
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', margin: 0 }}>
                  由经验丰富的行业专家进行深度评测
                </p>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  客观公正
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', margin: 0 }}>
                  不接受厂商付费好评，保持评测独立性
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section" style={{ background: 'var(--gradient-primary)' }}>
          <div className="container" style={{ textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }}>
              准备好开始了吗？
            </h2>
            <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.7' }}>
              探索我们评测的AI工具，找到最适合你的AI助手
            </p>
            <Link
              href="/tools"
              className="btn"
              style={{
                background: 'white',
                color: 'var(--color-primary)',
                fontSize: '1.125rem',
                padding: '1rem 2.5rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}
            >
              🚀 开始探索
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              AI工具评测
            </span>
          </div>
          <p style={{ marginBottom: '0.5rem', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            © {new Date().getFullYear()} AI工具评测
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            专业、真实、可信的AI工具评测平台
          </p>
        </div>
      </footer>
    </>
  );
}
