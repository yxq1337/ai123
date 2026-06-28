'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CONTENT_TEMPLATES } from '@/lib/content-types';

type ContentType = 'blog' | 'tutorial' | 'comparison' | 'review' | 'news';

export default function AutomationPublishPage() {
  const [step, setStep] = useState<'topic' | 'generate' | 'edit' | 'publish'>('topic');
  const [loading, setLoading] = useState(false);
  const [hotTopics, setHotTopics] = useState<any[]>([]);
  const [contentIdeas, setContentIdeas] = useState<any[]>([]);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  // 表单状态
  const [formData, setFormData] = useState({
    topic: '',
    category: 'AI工具',
    contentType: 'blog' as ContentType,
    author: '张明远',
    keywords: '',
    title: '',
    content: '',
    description: '',
    tags: '',
    tone: 'professional' as 'professional' | 'casual' | 'educational'
  });

  // 获取热点话题
  useEffect(() => {
    if (step === 'topic') {
      fetchHotTopics();
    }
  }, [step]);

  const fetchHotTopics = async () => {
    try {
      const res = await fetch('/api/ai/generate?action=hot-topics');
      const data = await res.json();
      if (data.success) {
        setHotTopics(data.data);
      }
    } catch (e) {
      console.error('获取热点失败', e);
    }
  };

  const generateContentIdeas = async () => {
    if (!formData.topic) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/ai/generate?action=content-ideas&topic=${encodeURIComponent(formData.topic)}`);
      const data = await res.json();
      if (data.success) {
        setContentIdeas(data.data);
        setStep('generate');
      }
    } catch (e) {
      console.error('生成内容创意失败', e);
    } finally {
      setLoading(false);
    }
  };

  const generateFullContent = async (idea?: any) => {
    setLoading(true);
    try {
      const payload = {
        topic: idea?.title || formData.topic,
        category: formData.category,
        author: formData.author,
        contentType: formData.contentType,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
        tone: formData.tone
      };

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedContent(data.data);
        setFormData(prev => ({
          ...prev,
          title: data.data.title || '',
          content: data.data.content || '',
          description: data.data.excerpt || data.data.description || ''
        }));
        setStep('edit');
      }
    } catch (e) {
      console.error('生成内容失败', e);
    } finally {
      setLoading(false);
    }
  };

  const publishContent = async () => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        description: formData.description,
        category: formData.category,
        author: formData.author,
        tags: formData.tags.split(',').map(k => k.trim()).filter(Boolean),
        isAIGenerated: true,
        aiContributionPercent: 85
      };

      const res = await fetch('/api/content/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setStep('publish');
      }
    } catch (e) {
      console.error('发布失败', e);
    } finally {
      setLoading(false);
    }
  };

  const useTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      contentType: template.contentType,
      category: template.suggestedCategories[0] || prev.category
    }));
  };

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', textDecoration: 'none' }}>
            AI工具评测
          </Link>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <Link href="/blog" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>博客</Link>
            <Link href="/automation-admin" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>管理</Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>
              🚀 AI内容自动化发布
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              从选题到发布，AI全程协助
            </p>
          </div>

          {/* 步骤指示器 */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {[
              { id: 'topic', label: '1. 选题' },
              { id: 'generate', label: '2. 生成' },
              { id: 'edit', label: '3. 编辑' },
              { id: 'publish', label: '4. 发布' }
            ].map((s) => (
              <div key={s.id} style={{
                padding: '8px 16px',
                background: step === s.id ? 'var(--color-primary)' : 'var(--color-background-secondary)',
                color: step === s.id ? 'white' : 'var(--color-text-secondary)',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {s.label}
              </div>
            ))}
          </div>

          {/* 步骤1: 选题 */}
          {step === 'topic' && (
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* 表单区域 */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>📝 输入主题</h2>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>主题 *</label>
                    <input
                      type="text"
                      value={formData.topic}
                      onChange={(e) => setFormData(p => ({ ...p, topic: e.target.value }))}
                      placeholder="例如：2026年AI写作工具对比"
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>分类</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                        style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                      >
                        <option value="AI工具">AI工具</option>
                        <option value="AI趋势">AI趋势</option>
                        <option value="教程">教程</option>
                        <option value="评测">评测</option>
                        <option value="效率提升">效率提升</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>内容类型</label>
                      <select
                        value={formData.contentType}
                        onChange={(e) => setFormData(p => ({ ...p, contentType: e.target.value as ContentType }))}
                        style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                      >
                        <option value="blog">博客文章</option>
                        <option value="tutorial">教程</option>
                        <option value="comparison">对比评测</option>
                        <option value="review">工具评测</option>
                        <option value="news">新闻动态</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>关键词（逗号分隔）</label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData(p => ({ ...p, keywords: e.target.value }))}
                      placeholder="AI写作, 效率工具, ChatGPT"
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>作者</label>
                    <select
                      value={formData.author}
                      onChange={(e) => setFormData(p => ({ ...p, author: e.target.value }))}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                    >
                      <option value="张明远">张明远</option>
                      <option value="李小红">李小红</option>
                      <option value="王大力">王大力</option>
                    </select>
                  </div>

                  <button
                    onClick={generateContentIdeas}
                    disabled={loading || !formData.topic}
                    style={{
                      padding: '14px 24px',
                      background: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: loading || !formData.topic ? 'not-allowed' : 'pointer',
                      opacity: loading || !formData.topic ? 0.6 : 1,
                      width: 'fit-content'
                    }}
                  >
                    {loading ? '生成中...' : '✨ 生成内容创意'}
                  </button>
                </div>
              </div>

              {/* 热点话题推荐 */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🔥 热点话题推荐</h2>
                {hotTopics.length > 0 ? (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {hotTopics.map((topic) => (
                      <div key={topic.id} style={{
                        padding: '16px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                        onClick={() => {
                          setFormData(p => ({ ...p, topic: topic.title, category: topic.category }));
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{topic.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>{topic.description}</p>
                          </div>
                          <span style={{
                            background: '#f0fdf4',
                            color: '#166534',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}>
                            {topic.trendScore}分
                          </span>
                        </div>
                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {topic.keywords.map((kw: string) => (
                            <span key={kw} style={{
                              background: 'var(--color-background-secondary)',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '12px'
                            }}>
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-text-secondary)' }}>加载中...</p>
                )}
              </div>

              {/* 模板推荐 */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📋 内容模板</h2>
                <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  {CONTENT_TEMPLATES.map((template) => (
                    <div key={template.id} style={{
                      padding: '16px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                      onClick={() => useTemplate(template)}
                    >
                      <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{template.name}</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '12px' }}>{template.description}</p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {template.suggestedCategories.map((cat) => (
                          <span key={cat} style={{
                            background: 'var(--color-background-secondary)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 步骤2: 生成内容 */}
          {step === 'generate' && (
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>💡 内容创意</h2>
                  <button
                    onClick={() => setStep('topic')}
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    ← 返回选题
                  </button>
                </div>

                {contentIdeas.length > 0 ? (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {contentIdeas.map((idea, index) => (
                      <div key={idea.id} style={{
                        padding: '20px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                          <div>
                            <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>{idea.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{idea.description}</p>
                          </div>
                          <span style={{
                            background: '#f0fdf4',
                            color: '#166534',
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}>
                            {idea.estimatedValue}分
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                          <span style={{
                            background: 'var(--color-background-secondary)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {idea.contentType}
                          </span>
                          {idea.seoKeywords.map((kw: string) => (
                            <span key={kw} style={{
                              background: 'var(--color-background-secondary)',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '12px'
                            }}>
                              #{kw}
                            </span>
                          ))}
                        </div>
                        <div style={{ marginTop: '16px' }}>
                          <button
                            onClick={() => generateFullContent(idea)}
                            disabled={loading}
                            style={{
                              padding: '10px 20px',
                              background: 'var(--color-primary)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontWeight: 'bold',
                              cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {loading ? '生成中...' : '🚀 生成完整文章'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-text-secondary)' }}>暂无内容创意</p>
                )}
              </div>
            </div>
          )}

          {/* 步骤3: 编辑内容 */}
          {step === 'edit' && (
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>✏️ 编辑内容</h2>
                  <button
                    onClick={() => setStep('topic')}
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    ← 重新开始
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>标题</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>摘要</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>文章内容</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                      rows={16}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit', lineHeight: '1.6' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>标签（逗号分隔）</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData(p => ({ ...p, tags: e.target.value }))}
                      placeholder="AI工具, 写作, 效率"
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '16px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button
                      onClick={publishContent}
                      disabled={loading || !formData.title || !formData.content}
                      style={{
                        padding: '14px 28px',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: loading || !formData.title || !formData.content ? 'not-allowed' : 'pointer',
                        opacity: loading || !formData.title || !formData.content ? 0.6 : 1
                      }}
                    >
                      {loading ? '发布中...' : '✅ 发布文章'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 步骤4: 发布成功 */}
          {step === 'publish' && (
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>发布成功！</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                您的文章已成功发布到博客
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/blog"
                  style={{
                    padding: '12px 24px',
                    background: 'var(--color-primary)',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  查看博客列表
                </Link>
                <button
                  onClick={() => {
                    setStep('topic');
                    setFormData({
                      topic: '',
                      category: 'AI工具',
                      contentType: 'blog',
                      author: '张明远',
                      keywords: '',
                      title: '',
                      content: '',
                      description: '',
                      tags: '',
                      tone: 'professional'
                    });
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  发布新文章
                </button>
              </div>
            </div>
          )}
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
