import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI内容自动化 - API文档 & 配置指南',
  description: '配置AI内容自动化工具与本网站的连接，实现自动内容发布'
};

export default function AutomationDocsPage() {
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
          </nav>
        </div>
      </header>

      <main style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
          <article>
            <header style={{ marginBottom: '48px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                ⚡ AI内容自动化 - API文档 & 配置指南
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>
                配置AI内容自动化工具与本网站的连接，实现全自动内容发布
              </p>
            </header>

            <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  快速开始
                </h2>
                <div style={{ background: 'var(--color-background-secondary)', padding: '24px', borderRadius: '12px' }}>
                  <ol style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>获取您的API密钥和站点ID</li>
                    <li>在AI内容自动化工具中添加本站点</li>
                    <li>配置内容策略和发布计划</li>
                    <li>开启云端自动运行</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  📋 连接配置
                </h2>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--color-background-secondary)', padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                    <strong>站点配置信息</strong>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'grid', gap: '16px' }}>
                      <div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '4px' }}>API端点</div>
                        <div style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '8px 12px', borderRadius: '4px' }}>
                          /api/automation/publish
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '4px' }}>站点ID</div>
                        <div style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '8px 12px', borderRadius: '4px' }}>
                          demo-site
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '4px' }}>API密钥</div>
                        <div style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '8px 12px', borderRadius: '4px' }}>
                          demo-api-key-12345
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', padding: '12px', background: '#fff7ed', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                      <strong>⚠️ 注意：</strong>这是演示配置。生产环境应使用环境变量管理密钥，并从安全的配置系统获取。
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  🔌 API接口说明
                </h2>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--color-background-secondary)', padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ background: '#10b981', color: 'white', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>POST</span>
                    <code style={{ fontFamily: 'monospace' }}>/api/automation/publish</code>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>请求参数</h3>
                    <pre style={{ background: '#1f2937', color: '#e5e7eb', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}>
{`{
  "apiKey": "demo-api-key-12345",
  "siteId": "demo-site",
  "post": {
    "title": "文章标题",
    "content": "文章内容...",
    "excerpt": "文章摘要",
    "slug": "custom-slug",
    "category": "AI工具",
    "tags": ["SEO", "自动化"],
    "author": "张明远",
    "seo": {
      "title": "SEO标题",
      "description": "SEO描述",
      "keywords": ["关键词1", "关键词2"]
    }
  },
  "options": {
    "autoPublish": true,
    "imageLocalization": true,
    "seoOptimization": true
  }
}`}
                    </pre>

                    <h3 style={{ fontWeight: 'bold', marginBottom: '12px', marginTop: '24px' }}>响应示例</h3>
                    <pre style={{ background: '#1f2937', color: '#e5e7eb', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}>
{`// 成功响应
{
  "success": true,
  "message": "文章发布成功",
  "postId": "post-1234567890",
  "postUrl": "https://example.com/blog/article-slug"
}

// 错误响应
{
  "success": false,
  "message": "API密钥验证失败",
  "error": "invalid_api_key"
}`}
                    </pre>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  ⚙️ 配置步骤详解
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'var(--color-primary)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>在工具后台添加站点</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>打开AI内容自动化工具，进入"站点管理"，点击"添加新站点"，输入网站名称和URL。</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'var(--color-primary)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>配置API连接</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>在站点配置中填入API端点、站点ID和API密钥。点击"测试连接"确认配置正确。</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'var(--color-primary)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>设置内容策略</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>配置目标关键词、原创模式（深度原创/智能改写）、文章长度、SEO优化选项等。</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'var(--color-primary)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>4</div>
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>开启云端运行</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>配置发布计划（每天发布几篇、什么时间发布），然后开启"云端自动运行"模式。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  ❓ 常见问题
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px 20px' }}>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>需要一直开着电脑吗？</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>不需要！开启"云端自动运行"后，系统在云端服务器24小时不间断工作，即使你的电脑关机也完全不影响内容的生成和发布。</p>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px 20px' }}>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>内容质量如何保证？</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>工具提供"深度原创"和"文章改写"双模式，可以设置原创度检测和质量阈值。建议初期进行人工审核，确认质量后再完全自动化。</p>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px 20px' }}>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>会被搜索引擎惩罚吗？</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>工具内置原创度检测、内容去重、智能改写等功能，确保每篇文章都是独特的。我们的用户实测显示，正常使用不会有惩罚，反而因为持续更新获得更好的收录。</p>
                  </div>
                </div>
              </section>

              <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', padding: '32px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>🚀 准备好了吗？</h2>
                <p style={{ marginBottom: '24px', opacity: 0.9 }}>开始使用AI内容自动化工具，让您的内容运营效率提升800%</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/tools/ai-content-automation" style={{ background: 'white', color: '#667eea', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    查看工具详情
                  </Link>
                  <Link href="/reviews/ai-content-automation" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)' }}>
                    阅读深度评测
                  </Link>
                </div>
              </section>

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
