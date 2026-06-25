import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '联系方式 - AI工具评测',
  description: '联系我们，提出建议或推荐AI工具。'
}

export default function ContactPage() {
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
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '16px', textAlign: 'center' }}>
            联系我们
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', marginBottom: '40px', textAlign: 'center' }}>
            欢迎提出建议、反馈问题，或推荐你喜欢的AI工具
          </p>

          <div style={{
            backgroundColor: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '24px'
            }}>
              📧
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '16px' }}>
              发送邮件给我们
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
              你可以通过以下邮箱联系我们：
            </p>
            <div style={{
              fontSize: '20px',
              color: 'var(--color-primary)',
              fontWeight: 'bold',
              marginTop: '24px'
            }}>
              contact@yourdomain.com
            </div>
          </div>
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
