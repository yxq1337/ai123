import { getTools, getCategories } from '@/lib/api';
import Link from 'next/link';
import { OrganizationSchema } from './components/SchemaOrg';
import { SkipLink } from './components/InteractiveButton';
import { FeatureCard } from './components/FeatureCard';

export default async function HomePage() {
  const tools = await getTools('en');
  const categories = await getCategories('en');

  const topTools = [...tools].sort((a, b) => b.review.rating - a.review.rating).slice(0, 6);
  const recentTools = [...tools].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4);

  const writingTools = tools.filter(t => t.categories.includes('写作')).slice(0, 3);
  const designTools = tools.filter(t => t.categories.includes('设计') || t.categories.includes('图像')).slice(0, 3);
  const codingTools = tools.filter(t => t.categories.includes('编程')).slice(0, 3);

  return (
    <>
      <OrganizationSchema />
      <SkipLink />

      {/* 头部 */}
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            <span style={{ fontSize: '1.75rem' }}>◈</span>
            <span>AI 工具图鉴</span>
          </Link>
          <nav className="nav">
            <Link href="/" className="nav-link active">首页</Link>
            <Link href="/tools" className="nav-link">全部工具</Link>
            <Link href="/about" className="nav-link">关于</Link>
            <Link href="/contact" className="nav-link">联系</Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* Hero 区域 - Cloudflare 风格 */}
        <section className="hero" style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'white',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* 装饰性网格背景 */}
          <div className="decorative-grid"></div>

          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center'
            }}>
              {/* 左侧 - 文字内容 */}
              <div style={{
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  color: 'var(--color-text)'
                }}>
                  发现<br />
                  <span style={{ color: 'var(--color-primary)' }}>真正</span><br />
                  有用的<br />
                  AI 工具
                </div>

                <div className="geometric-line" style={{ margin: '2rem 0', width: '100px' }}></div>

                <p style={{
                  fontSize: '1.25rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-muted)',
                  marginBottom: '2.5rem'
                }}>
                  不是列表的堆砌，是真实使用体验的筛选。<br />
                  每一个工具都经过深度评测，每一个评分都有理由。
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/tools" className="btn btn-primary" style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 600,
                    padding: '1rem 2.5rem',
                    fontSize: '1.125rem'
                  }}>
                    浏览全部工具 →
                  </Link>
                  <Link href="/about" className="btn btn-secondary" style={{
                    border: '2px solid var(--color-text)',
                    color: 'var(--color-text)',
                    fontWeight: 600,
                    padding: '1rem 2.5rem',
                    fontSize: '1.125rem'
                  }}>
                    了解我们的方法
                  </Link>
                </div>
              </div>

              {/* 右侧 - 转动的橙色小球 */}
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* 转动的橙色小球 */}
                <div
                  className="spinning-orb"
                  style={{
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: `
                      radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 8%, transparent 20%),
                      radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, #FFB86C 0%, #F6821D 40%, #E66100 70%, #C44D00 100%)
                    `,
                    position: 'relative',
                    boxShadow: `
                      0 0 80px rgba(246, 130, 29, 0.4),
                      0 20px 60px rgba(0, 0, 0, 0.3),
                      inset 0 -10px 30px rgba(0, 0, 0, 0.2),
                      inset 0 10px 30px rgba(255, 255, 255, 0.3)
                    `
                  }}
                >
                  {/* 高光效果 */}
                  <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '15%',
                    width: '30%',
                    height: '20%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)',
                    filter: 'blur(3px)'
                  }} />

                  {/* 几何装饰线 */}
                  <svg style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.6
                  }} viewBox="0 0 100 100">
                    {/* 同心圆形 */}
                    <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" fill="none">
                      <circle cx="50" cy="50" r="8" />
                      <circle cx="50" cy="50" r="16" />
                      <circle cx="50" cy="50" r="24" />
                      <circle cx="50" cy="50" r="32" />
                      <circle cx="50" cy="50" r="40" />
                    </g>

                    {/* 三角形网格 */}
                    <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" fill="none">
                      <polygon points="50,10 66,40 34,40" />
                      <polygon points="50,90 66,60 34,60" />
                      <polygon points="10,50 40,34 40,66" />
                      <polygon points="90,50 60,34 60,66" />

                      <polygon points="50,10 82,50 50,90 18,50" />
                      <polygon points="50,20 70,50 50,80 30,50" />
                      <polygon points="50,30 60,50 50,70 40,50" />
                    </g>

                    {/* 小星点装饰 */}
                    <g fill="rgba(255,255,255,0.3)">
                      <circle cx="50" cy="12" r="0.8" />
                      <circle cx="80" cy="50" r="0.8" />
                      <circle cx="50" cy="88" r="0.8" />
                      <circle cx="20" cy="50" r="0.8" />
                      <circle cx="28" cy="28" r="0.6" />
                      <circle cx="72" cy="28" r="0.6" />
                      <circle cx="72" cy="72" r="0.6" />
                      <circle cx="28" cy="72" r="0.6" />
                    </g>

                    {/* 斜线装饰 */}
                    <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none">
                      <line x1="50" y1="5" x2="50" y2="95" />
                      <line x1="5" y1="50" x2="95" y2="50" />
                      <line x1="15" y1="15" x2="85" y2="85" />
                      <line x1="85" y1="15" x2="15" y2="85" />
                    </g>
                  </svg>
                </div>

                {/* 环绕小球的工具图标 */}
                <div style={{
                  position: 'absolute',
                  inset: '-50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {['🤖', '🎨', '⚡', '🎬', '📝', '💻'].map((emoji, idx) => (
                    <div
                      key={idx}
                      className="float"
                      style={{
                        position: 'absolute',
                        fontSize: '2.5rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                        animationDelay: `${idx * 0.3}s`,
                        transform: `rotate(${idx * 60}deg) translateX(220px) rotate(${-idx * 60}deg)`,
                        opacity: 0.9
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 统计数据区域 */}
        <section className="section" style={{
          background: 'var(--color-background-dark)',
          borderTop: '3px solid var(--color-primary)',
          borderBottom: '3px solid var(--color-primary)'
        }}>
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item" style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'center'
              }}>
                <div className="stat-number" style={{
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)'
                }}>{tools.length}</div>
                <div className="stat-label" style={{ color: 'var(--color-text-muted)' }}>已评测工具</div>
              </div>
              <div className="stat-item" style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'center'
              }}>
                <div className="stat-number" style={{
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)'
                }}>{categories.length}</div>
                <div className="stat-label" style={{ color: 'var(--color-text-muted)' }}>覆盖分类</div>
              </div>
              <div className="stat-item" style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'center'
              }}>
                <div className="stat-number" style={{
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)'
                }}>100K+</div>
                <div className="stat-label" style={{ color: 'var(--color-text-muted)' }}>月活用户</div>
              </div>
              <div className="stat-item" style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'center'
              }}>
                <div className="stat-number" style={{
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)'
                }}>5</div>
                <div className="stat-label" style={{ color: 'var(--color-text-muted)' }}>评测师</div>
              </div>
            </div>
          </div>
        </section>

        {/* 分类区域 */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 3fr',
              gap: '4rem',
              alignItems: 'start'
            }}>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.5rem'
                }}>02</div>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  marginBottom: '0.5rem'
                }}>
                  按类探索
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  找到最适合你工作流的工具
                </p>
              </div>

              <div className="tag-cloud" style={{ paddingTop: '2rem' }}>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${category}`}
                    className="tag tag-orange"
                    style={{
                      fontSize: '1rem',
                      padding: '0.75rem 1.5rem',
                      border: '2px solid var(--color-border)',
                      background: 'white'
                    }}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          maxWidth: '600px',
          margin: '0 auto'
        }}></div>

        {/* 分类特选 - 交错布局 */}
        <section className="section">
          <div className="container">
            {/* 写作工具 */}
            <div style={{ marginBottom: '5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.5rem'
                  }}>03</div>
                  <h2 style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.75rem'
                  }}>
                    AI 写作工具
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    从灵感迸发至完稿润色，提升写作效率
                  </p>
                  <Link href="/categories/写作" className="btn btn-secondary" style={{
                    border: '2px solid var(--color-primary)',
                    color: 'var(--color-primary)'
                  }}>
                    查看全部写作工具 →
                  </Link>
                </div>

                <div style={{
                  display: 'grid',
                  gap: '1rem'
                }}>
                  {writingTools.map((tool, idx) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="card card-hover-orange"
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                          padding: '1rem 1.25rem',
                          border: '2px solid var(--color-border)',
                          transform: idx === 1 ? 'translateX(-2rem)' : undefined
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>{tool.logo}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            marginBottom: '0.25rem'
                          }}>
                            {tool.name}
                          </h4>
                          <div className="rating" style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-primary)'
                          }}>
                            ★ {tool.review.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 设计工具 */}
            <div style={{ marginBottom: '5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center'
              }}>
                <div style={{ order: 2 }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.5rem'
                  }}>04</div>
                  <h2 style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.75rem'
                  }}>
                    AI 设计工具
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    创意工作者的得力伙伴
                  </p>
                  <Link href="/categories/设计" className="btn btn-secondary" style={{
                    border: '2px solid var(--color-primary)',
                    color: 'var(--color-primary)'
                  }}>
                    查看全部设计工具 →
                  </Link>
                </div>

                <div style={{ order: 1, display: 'grid', gap: '1rem' }}>
                  {designTools.map((tool, idx) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="card card-hover-orange"
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                          padding: '1rem 1.25rem',
                          border: '2px solid var(--color-border)',
                          transform: idx === 1 ? 'translateX(2rem)' : undefined
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>{tool.logo}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            marginBottom: '0.25rem'
                          }}>
                            {tool.name}
                          </h4>
                          <div className="rating" style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-primary)'
                          }}>
                            ★ {tool.review.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 编程工具 */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.5rem'
                  }}>05</div>
                  <h2 style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.75rem'
                  }}>
                    AI 编程工具
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    开发者的智能助手
                  </p>
                  <Link href="/categories/编程" className="btn btn-secondary" style={{
                    border: '2px solid var(--color-primary)',
                    color: 'var(--color-primary)'
                  }}>
                    查看全部编程工具 →
                  </Link>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {codingTools.map((tool, idx) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="card card-hover-orange"
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                          padding: '1rem 1.25rem',
                          border: '2px solid var(--color-border)',
                          transform: idx === 1 ? 'translateX(-2rem)' : undefined
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>{tool.logo}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            marginBottom: '0.25rem'
                          }}>
                            {tool.name}
                          </h4>
                          <div className="rating" style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-primary)'
                          }}>
                            ★ {tool.review.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          maxWidth: '600px',
          margin: '0 auto'
        }}></div>

        {/* 自动化功能区域 - 深色区块 */}
        <section className="section" style={{
          background: 'var(--color-background-dark)',
          borderTop: '3px solid var(--color-primary)',
          borderBottom: '3px solid var(--color-primary)'
        }}>
          <div className="container" style={{ color: 'var(--color-text-inverse)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-mono)',
                marginBottom: '0.5rem'
              }}>06</div>
              <h2 style={{
                fontSize: '2.5rem',
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-inverse)',
                marginBottom: '0.75rem'
              }}>
                AI 内容自动化
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--color-text-muted)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.7
              }}>
                让 AI 自动更新网站内容，用 AI 替代重复的内容生产，用自动化流程串起发布环节
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              <FeatureCard
                href="/automation-admin"
                emoji="⚙️"
                title="管理面板"
                description="监控系统状态、查看活动日志、管理内容发布"
              />
              <FeatureCard
                href="/automation-test"
                emoji="✍️"
                title="发布文章"
                description="快速发布新文章，测试 AI 内容自动化功能"
              />
              <FeatureCard
                href="/automation-docs"
                emoji="📚"
                title="配置文档"
                description="查看详细的 API 文档和配置指南"
              />
              <FeatureCard
                href="/blog"
                emoji="📖"
                title="博客文章"
                description="查看所有通过 AI 自动化发布的文章"
              />
            </div>
          </div>
        </section>

        {/* 最新更新 */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 3fr',
              gap: '4rem',
              alignItems: 'start'
            }}>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.5rem'
                }}>07</div>
                <h2 style={{
                  fontSize: '2.25rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  marginBottom: '0.5rem'
                }}>
                  最新更新
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  最近评测和更新的工具
                </p>
              </div>

              <div style={{
                display: 'grid',
                gap: '1rem',
                paddingTop: '2rem'
              }}>
                {recentTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="card card-hover-orange" style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      border: '2px solid var(--color-border)'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ fontSize: '2rem' }}>{tool.logo}</span>
                          <div>
                            <h3 style={{
                              fontSize: '1.125rem',
                              fontWeight: 700,
                              margin: 0
                            }}>
                              {tool.name}
                            </h3>
                            <span style={{
                              fontSize: '0.8125rem',
                              color: 'var(--color-text-muted)',
                              fontFamily: 'var(--font-mono)'
                            }}>
                              {tool.updatedAt}
                            </span>
                          </div>
                        </div>
                        <p style={{
                          color: 'var(--color-text-muted)',
                          margin: 0,
                          lineHeight: 1.6
                        }}>
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 我们的方法 */}
        <section className="section" style={{ background: 'var(--color-primary)' }}>
          <div className="container" style={{ color: 'var(--color-text-inverse)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'white',
                opacity: 0.8,
                fontFamily: 'var(--font-mono)',
                marginBottom: '0.5rem'
              }}>08</div>
              <h2 style={{
                fontSize: '2.5rem',
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-inverse)',
                marginBottom: '2.5rem'
              }}>
                为什么选择我们？
              </h2>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--color-text-inverse)',
                    fontFamily: 'var(--font-display)'
                  }}>
                    ✅ 真实体验
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>
                    所有评测都基于实际使用体验，不做虚假宣传
                  </p>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--color-text-inverse)',
                    fontFamily: 'var(--font-display)'
                  }}>
                    🎯 专业评测
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>
                    由经验丰富的行业专家进行深度评测
                  </p>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--color-text-inverse)',
                    fontFamily: 'var(--font-display)'
                  }}>
                    🔒 客观公正
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>
                    不接受厂商付费好评，保持评测独立性
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 区域 */}
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              marginBottom: '1rem'
            }}>
              准备好开始了吗？
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7
            }}>
              探索我们评测的 AI 工具，找到最适合你的 AI 助手
            </p>
            <Link href="/tools" className="btn btn-primary" style={{
              background: 'var(--color-primary)',
              color: 'white',
              fontSize: '1.125rem',
              padding: '1.25rem 3rem',
              fontWeight: 600
            }}>
              开始探索 →
            </Link>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="footer" style={{
        borderTop: '3px solid var(--color-primary)',
        background: 'var(--color-background-dark)'
      }}>
        <div className="footer-content">
          <div style={{
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>◈</span>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-inverse)'
            }}>
              AI 工具图鉴
            </span>
          </div>
          <p style={{ marginBottom: '0.5rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} AI 工具图鉴
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            专业、真实、可信的 AI 工具评测平台
          </p>
        </div>
      </footer>
    </>
  );
}
