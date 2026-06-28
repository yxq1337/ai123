import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '页面未找到 | AI工具评测',
  description: '这个页面不存在或已经移动，请返回首页继续浏览 AI 工具评测、分类和推荐内容。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '48px 16px' }}>
      <div style={{ maxWidth: '560px', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '12px' }}>404</p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>页面未找到</h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '28px' }}>
          你访问的页面不存在，可能已经移动或被删除。可以回到首页继续查看最新 AI 工具评测。
        </p>
        <Link href="/" className="btn btn-primary">返回首页</Link>
      </div>
    </main>
  );
}
