'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AutomationTestPage() {
  const [title, setTitle] = useState('AI如何改变内容创作');
  const [content, setContent] = useState('人工智能正在彻底改变内容创作的方式。通过AI工具，我们可以快速生成高质量的文章、图片和视频，大幅提升工作效率。\n\n本文将介绍如何使用AI内容自动化工具来管理您的网站内容。');
  const [author, setAuthor] = useState('张明远');
  const [category, setCategory] = useState('AI工具');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const body = {
        apiKey: 'demo-api-key-12345',
        siteId: 'demo-site',
        post: {
          title,
          content,
          excerpt: content.substring(0, 100),
          category,
          author,
          tags: ['AI', '自动化', '内容创作']
        },
        options: {
          autoPublish: true,
          imageLocalization: true,
          seoOptimization: true
        }
      };

      const response = await fetch('/api/automation/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', textDecoration: 'none' }}>
            AI工具评测
          </Link>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <Link href="/automation-docs" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>配置文档</Link>
            <Link href="/automation-admin" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>管理面板</Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>
              🧪 API测试工具
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              在这里直接测试AI内容自动化API
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <Link href="/automation-docs" style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text)' }}>
              📖 查看配置文档
            </Link>
            <Link href="/automation-admin" style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text)' }}>
              🎛️ 查看管理面板
            </Link>
          </div>

          <form onSubmit={handleSubmit} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>文章标题</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>作者</label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
              >
                <option value="张明远">张明远</option>
                <option value="李小红">李小红</option>
                <option value="王大力">王大力</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
              >
                <option value="AI工具">AI工具</option>
                <option value="教程">教程</option>
                <option value="评测">评测</option>
                <option value="新闻">新闻</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>文章内容</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? '发布中...' : '🚀 发布文章'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626' }}>
              ❌ 错误: {error}
            </div>
          )}

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: result.success ? '#f0fdf4' : '#fef2f2', border: '1px solid ' + (result.success ? '#86efac' : '#fecaca'), borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>
                {result.success ? '✅ 发布成功!' : '❌ 发布失败'}
              </h3>
              <p style={{ marginBottom: '12px' }}>{result.message}</p>
              {result.postId && <p>文章ID: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{result.postId}</code></p>}
              {result.postUrl && <p>访问地址: <a href={result.postUrl} style={{ color: 'var(--color-primary)' }}>{result.postUrl}</a></p>}
              <div style={{ marginTop: '16px' }}>
                <Link href="/automation-admin" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                  → 去管理面板查看日志
                </Link>
              </div>
            </div>
          )}

          <div style={{ marginTop: '32px', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>📋 使用说明</h3>
            <ol style={{ marginLeft: '20px', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
              <li>填写文章信息（标题、内容、作者等）</li>
              <li>点击"发布文章"按钮</li>
              <li>查看返回结果</li>
              <li>去管理面板查看活动日志</li>
            </ol>
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
