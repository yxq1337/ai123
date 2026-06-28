import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { getTools } from '@/lib/api';

export const metadata: Metadata = {
  title: 'AI内容自动化工具 vs 其他AI写作工具 - 完整对比 | AI工具评测',
  description: '详细对比AI内容自动化工具与ChatGPT、Claude、Notion AI、Jasper等工具的功能、性价比、使用场景。',
  alternates: {
    canonical: '/comparisons/ai-content-automation-vs-others/',
  },
};

export default async function ComparisonPage() {
  const tools = await getTools('en');

  const comparisonTools = tools.filter(t =>
    ['chatgpt', 'claude', 'notion-ai', 'ai-content-automation'].includes(t.slug)
  );

  const comparisonData = [
    {
      category: '核心定位',
      'ai-content-automation': '全流程自动化内容生产与发布',
      'chatgpt': '通用大语言模型对话工具',
      'claude': '安全、可靠的AI助手，长文本处理强',
      'notion-ai': 'Notion内置的AI写作助手'
    },
    {
      category: '自动化程度',
      'ai-content-automation': '⭐⭐⭐⭐⭐ 全自动',
      'chatgpt': '⭐⭐ 需要人工操作',
      'claude': '⭐⭐ 需要人工操作',
      'notion-ai': '⭐⭐⭐ 半自动化'
    },
    {
      category: '内容采集',
      'ai-content-automation': '✅ 支持自动采集素材',
      'chatgpt': '❌ 需要手动提供',
      'claude': '❌ 需要手动提供',
      'notion-ai': '❌ 需要手动提供'
    },
    {
      category: 'SEO优化',
      'ai-content-automation': '✅ 深度SEO优化功能',
      'chatgpt': '⚠️ 基础SEO建议',
      'claude': '⚠️ 基础SEO建议',
      'notion-ai': '❌ 无专门SEO功能'
    },
    {
      category: '图片处理',
      'ai-content-automation': '✅ 自动配图 + 本地化',
      'chatgpt': '✅ DALL-E集成',
      'claude': '✅ 图片理解能力',
      'notion-ai': '❌ 无图片功能'
    },
    {
      category: '自动发布',
      'ai-content-automation': '✅ 直接发布到网站',
      'chatgpt': '❌ 需要手动复制',
      'claude': '❌ 需要手动复制',
      'notion-ai': '❌ 在Notion内使用'
    },
    {
      category: '多网站管理',
      'ai-content-automation': '✅ 支持多个网站',
      'chatgpt': '❌ 不支持',
      'claude': '❌ 不支持',
      'notion-ai': '❌ 不支持'
    },
    {
      category: '云端运行',
      'ai-content-automation': '✅ 电脑关机也能运行',
      'chatgpt': '❌ 需要用户在线',
      'claude': '❌ 需要用户在线',
      'notion-ai': '❌ 需要用户在线'
    },
    {
      category: '内容原创模式',
      'ai-content-automation': '✅ 深度原创 + 智能改写',
      'chatgpt': '✅ 原创内容生成',
      'claude': '✅ 原创内容生成',
      'notion-ai': '✅ 改写和扩展'
    },
    {
      category: '实时性',
      'ai-content-automation': '✅ 可设置定时发布',
      'chatgpt': '⚠️ 有知识截止日期',
      'claude': '⚠️ 有知识截止日期',
      'notion-ai': '⚠️ 有知识截止日期'
    }
  ];

  const useCases = [
    {
      scenario: '内容网站站长',
      'ai-content-automation': '🏆 最佳选择',
      'chatgpt': '⭐ 可用',
      'claude': '⭐ 可用',
      'notion-ai': '✨ 辅助写作'
    },
    {
      scenario: 'SEO优化师',
      'ai-content-automation': '🏆 最佳选择',
      'chatgpt': '⭐ 可用',
      'claude': '⭐ 可用',
      'notion-ai': '✨ 辅助写作'
    },
    {
      scenario: '企业博客运营',
      'ai-content-automation': '✨ 高效方案',
      'chatgpt': '⭐ 可用',
      'claude': '⭐ 可用',
      'notion-ai': '🏆 最佳选择'
    },
    {
      scenario: '内容矩阵玩家',
      'ai-content-automation': '🏆 最佳选择',
      'chatgpt': '⭐ 可用',
      'claude': '⭐ 可用',
      'notion-ai': '⚠️ 不太适合'
    },
    {
      scenario: '单篇深度文章',
      'ai-content-automation': '✨ 辅助创作',
      'chatgpt': '🏆 最佳选择',
      'claude': '🏆 最佳选择',
      'notion-ai': '⭐ 可用'
    },
    {
      scenario: '创意写作',
      'ai-content-automation': '⚠️ 不太适合',
      'chatgpt': '🏆 最佳选择',
      'claude': '🏆 最佳选择',
      'notion-ai': '⭐ 可用'
    }
  ];

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
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
          <article>
            <header style={{ marginBottom: '48px' }}>
              <Link href="/tools/ai-content-automation" style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                ← 返回工具详情
              </Link>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                margin: '16px 0'
              }}>
                AI内容自动化工具 vs 其他AI写作工具
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', margin: 0 }}>
                全面对比：功能、性价比、适用场景、优势劣势分析
              </p>
            </header>

            <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)' }}>
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  📊 核心功能对比
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '800px'
                  }}>
                    <thead>
                      <tr style={{ background: 'var(--color-background-secondary)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid var(--color-border)' }}>
                          对比项
                        </th>
                        {comparisonTools.map(tool => (
                          <th key={tool.id} style={{
                            textAlign: 'center',
                            padding: '12px 16px',
                            borderBottom: '2px solid var(--color-border)',
                            fontWeight: 'bold',
                            verticalAlign: 'middle'
                          }}>
                            <div style={{ marginBottom: '8px' }}>{tool.logo}</div>
                            <div>{tool.name}</div>
                            <div style={{
                              fontSize: '12px',
                              color: 'var(--color-accent)',
                              fontWeight: 'bold'
                            }}>
                              ★ {tool.review.rating}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, idx) => (
                        <tr key={idx} style={{
                          background: idx % 2 === 0 ? 'white' : 'var(--color-background-secondary)'
                        }}>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', fontWeight: '600' }}>
                            {row.category}
                          </td>
                          {comparisonTools.map(tool => (
                            <td key={tool.id} style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid var(--color-border)',
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}>
                              {row[tool.slug as keyof typeof row] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  🎯 适用场景对比
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '800px'
                  }}>
                    <thead>
                      <tr style={{ background: 'var(--color-background-secondary)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid var(--color-border)' }}>
                          使用场景
                        </th>
                        {comparisonTools.map(tool => (
                          <th key={tool.id} style={{
                            textAlign: 'center',
                            padding: '12px 16px',
                            borderBottom: '2px solid var(--color-border)'
                          }}>
                            {tool.logo} {tool.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {useCases.map((row, idx) => (
                        <tr key={idx} style={{
                          background: idx % 2 === 0 ? 'white' : 'var(--color-background-secondary)'
                        }}>
                          <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', fontWeight: '600' }}>
                            {row.scenario}
                          </td>
                          {comparisonTools.map(tool => (
                            <td key={tool.id} style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid var(--color-border)',
                              textAlign: 'center'
                            }}>
                              {row[tool.slug as keyof typeof row] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  💡 各工具的独特优势
                </h2>

                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      ⚡ AI内容自动化工具
                    </h3>
                    <p style={{ margin: 0, color: '#78350f' }}>
                      <strong>独特价值：</strong>这是唯一一款把"内容生产"做成"流水线"的工具。如果你需要持续、稳定、大量地产出内容，它的优势是碾压级的——从采集、改写到SEO优化、自动配图、自动发布，全流程自动化，电脑关机也能运行。
                    </p>
                  </div>

                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      🤖 ChatGPT
                    </h3>
                    <p style={{ margin: 0, color: '#1e3a5f' }}>
                      <strong>独特价值：</strong>生态最完善的通用AI工具。从创意构思、代码编写、数据分析到对话式交互，它的能力最均衡。插件生态也让它能做很多特别的事情。
                    </p>
                  </div>

                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      🎯 Claude
                    </h3>
                    <p style={{ margin: 0, color: '#3730a3' }}>
                      <strong>独特价值：</strong>长文本处理能力最强，输出更安全、更可靠。处理超长文档、合同、论文时，Claude是最佳选择。对中文的理解也很出色。
                    </p>
                  </div>

                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      📝 Notion AI
                    </h3>
                    <p style={{ margin: 0, color: '#374151' }}>
                      <strong>独特价值：</strong>在Notion工作流内的无缝体验。如果你已经用Notion做笔记、写文档、管理项目，Notion AI的集成度是最好的——不需要切换窗口，上下文衔接完美。
                    </p>
                  </div>
                </div>
              </section>

              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  🤝 最佳组合建议
                </h2>

                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px',
                  background: 'var(--color-background-secondary)'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                    🚀 对于内容创业者
                  </h3>
                  <p style={{ margin: 0 }}>
                    <strong>推荐组合：</strong>AI内容自动化工具 + Claude
                  </p>
                  <p style={{ margin: '12px 0 0 0' }}>
                    <strong>理由：</strong>用AI内容自动化工具处理日常更新和批量内容生产；用Claude处理深度内容、长文档、策略性内容；二者配合，既有量的保证，又有质的把关。
                  </p>
                </div>

                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px',
                  background: 'var(--color-background-secondary)',
                  marginTop: '20px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                    🏢 对于企业/团队
                  </h3>
                  <p style={{ margin: 0 }}>
                    <strong>推荐组合：</strong>AI内容自动化工具 + Notion AI + ChatGPT
                  </p>
                  <p style={{ margin: '12px 0 0 0' }}>
                    <strong>理由：</strong>用Notion AI做内部协作和文档处理；用ChatGPT做创意和头脑风暴；用AI内容自动化工具做官网博客和内容营销的持续更新。
                  </p>
                </div>
              </section>

              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  🎯 如何做选择？决策树
                </h2>

                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ marginBottom: '16px', paddingLeft: '20px', borderLeft: '3px solid var(--color-primary)' }}>
                    <strong>你是否需要持续更新多个网站？</strong><br />
                    是 → <strong>AI内容自动化工具</strong> 🏆
                  </div>
                  <div style={{ marginBottom: '16px', paddingLeft: '20px', borderLeft: '3px solid #10b981' }}>
                    <strong>你是否每天要发3篇以上内容？</strong><br />
                    是 → <strong>AI内容自动化工具</strong> 🏆
                  </div>
                  <div style={{ marginBottom: '16px', paddingLeft: '20px', borderLeft: '3px solid #3b82f6' }}>
                    <strong>你主要写深度、创意、专业内容？</strong><br />
                    是 → <strong>ChatGPT / Claude</strong> 🏆
                  </div>
                  <div style={{ marginBottom: '16px', paddingLeft: '20px', borderLeft: '3px solid #6b7280' }}>
                    <strong>你的工作流主要在Notion里？</strong><br />
                    是 → <strong>Notion AI</strong> 🏆
                  </div>
                </div>
              </section>

              <footer style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: '1px solid var(--color-border)',
                textAlign: 'center'
              }}>
                <Link href="/tools/ai-content-automation" style={{
                  display: 'inline-block',
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  → 查看AI内容自动化工具详情
                </Link>
              </footer>
            </div>
          </article>
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
