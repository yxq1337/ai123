
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们 - AI工具评测',
  description: '了解AI工具评测网站，我们致力于提供真实、专业的AI工具评测。'
}

export default function AboutPage() {
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

      <main style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '32px', textAlign: 'center' }}>
            关于我们
          </h1>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '16px' }}>
              我们的使命
            </h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              AI工具评测致力于帮助用户发现和了解最优秀的AI工具。在这个AI技术飞速发展的时代，我们相信每个人都应该能够轻松找到适合自己需求的AI助手。
            </p>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
              我们不追求数量，而是追求质量。每一款工具，我们都会亲自测试、深度体验，然后给出真实、客观的评测。
            </p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '16px' }}>
              我们的承诺
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div style={{
                padding: '24px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  真实体验
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  每篇评测都基于我们的真实使用体验，不是简单的功能罗列。
                </p>
              </div>
              <div style={{
                padding: '24px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  客观中立
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  我们保持客观中立，不偏不倚，真实呈现每款工具的优缺点。
                </p>
              </div>
              <div style={{
                padding: '24px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  持续更新
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  AI技术日新月异，我们会持续更新评测内容，保持时效性。
                </p>
              </div>
              <div style={{
                padding: '24px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  用户至上
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  我们关注用户需求，努力提供真正有价值的信息和建议。
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '16px' }}>
              联系我们
            </h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              如果你有任何问题、建议，或者希望我们评测某款AI工具，欢迎随时联系我们！
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              联系我们
            </Link>
          </section>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--color-border)', padding: '40px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p style={{ marginBottom: '16px' }}>AI工具评测 © {new Date().getFullYear()}</p>
          <p>专业、真实、可信的AI工具评测平台</p>
        </div>
      </footer>
    </>
  )
}
