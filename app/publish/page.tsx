'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LONG_FORM_TEMPLATES } from '@/lib/ai-content-pro';

type Step = 'setup' | 'generating' | 'editing' | 'preview' | 'published';

type ArticleData = {
  title?: string;
  description?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  author?: string;
  wordCount?: number;
  readTimeMinutes?: number;
  originalityScore?: number;
  fullContent?: string;
  contentSections?: any[];
  images?: any[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export default function PublishPage() {
  const [step, setStep] = useState<Step>('setup');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [formData, setFormData] = useState({
    topic: '',
    category: 'AI工具',
    author: '张明远',
    wordCount: 1800,
    templateId: 'tool-review',
    includeImages: true
  });

  const updateProgress = (text: string, percent: number) => {
    setProgress(percent);
  };

  const generateArticle = async () => {
    setStep('generating');
    setLoading(true);
    setProgress(10);

    try {
      // 模拟分步生成过程
      updateProgress('正在分析主题...', 10);
      await new Promise(r => setTimeout(r, 800));

      updateProgress('生成内容框架...', 30);
      await new Promise(r => setTimeout(r, 800));

      updateProgress('创作正文内容...', 50);
      await new Promise(r => setTimeout(r, 1000));

      updateProgress('生成配图...', 70);
      await new Promise(r => setTimeout(r, 600));

      updateProgress('原创性检测...', 85);
      await new Promise(r => setTimeout(r, 600));

      updateProgress('SEO优化...', 95);
      await new Promise(r => setTimeout(r, 500));

      // 调用API生成内容
      const res = await fetch('/api/ai/generate-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setArticle({
          ...data.data,
          originalityScore: data.data?.originalityScore ?? 0,
        });
        updateProgress('完成！', 100);
        setTimeout(() => setStep('preview'), 500);
      } else {
        throw new Error(data.message);
      }

    } catch (error) {
      console.error('生成失败:', error);
      alert('文章生成失败，请重试');
      setStep('setup');
    } finally {
      setLoading(false);
    }
  };

  const publishArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article?.title,
          content: article?.fullContent,
          description: article?.description,
          category: article?.category,
          author: article?.author,
          tags: article?.tags,
          slug: article?.slug,
          isAIGenerated: true,
          aiContributionPercent: 90,
          originalityScore: article?.originalityScore ?? 0
        })
      });

      const data = await res.json();
      if (data.success) {
        setStep('published');
      }
    } catch (error) {
      console.error('发布失败:', error);
      alert('发布失败');
    } finally {
      setLoading(false);
    }
  };

  const regenerate = () => {
    setArticle(null);
    setStep('setup');
    setProgress(0);
  };

  return (
    <>
      <header style={{
        borderBottom: '2px solid #f0f0f0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <Link href="/" style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#667eea',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚡</span> AI内容工场
          </Link>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/blog" style={{ color: '#333', textDecoration: 'none' }}>博客</Link>
            <Link href="/automation-admin" style={{ color: '#333', textDecoration: 'none' }}>管理</Link>
          </nav>
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#fafafa' }}>
        {/* 步骤指示器 */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #eee',
          padding: '24px 20px'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
              {[
                { step: 'setup', label: '配置', emoji: '⚙️', done: ['preview', 'editing', 'published'].includes(step) },
                { step: 'generating', label: '生成', emoji: '✨', done: ['preview', 'editing', 'published'].includes(step) },
                { step: 'preview', label: '预览', emoji: '👀', done: ['published'].includes(step) },
                { step: 'published', label: '发布', emoji: '🚀', done: false }
              ].map((item, idx) => (
                <div key={item.step} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: isStepActive(item.step, step) || item.done ? 1 : 0.4
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: item.done ? '#10b981' : isStepActive(item.step, step) ? '#667eea' : '#e0e0e0',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 700
                  }}>
                    {item.done ? '✓' : item.emoji}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isStepActive(item.step, step) ? '#667eea' : '#666'
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

          {/* 步骤1：配置 */}
          {step === 'setup' && (
            <div style={{ display: 'grid', gap: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
                  🚀 创建您的 AI 文章
                </h1>
                <p style={{ fontSize: '16px', color: '#666', maxWidth: '500px', margin: '0 auto' }}>
                  配置主题、长度和风格，让 AI 为您创作 1500-2000 字的高质量文章
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #eee'
                }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>📝 基本信息</h2>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>
                        文章主题 *
                      </label>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData(p => ({ ...p, topic: e.target.value }))}
                        placeholder="例如：ChatGPT 实用技巧、Midjourney 进阶指南"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>分类</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            background: 'white'
                          }}
                        >
                          <option value="AI工具">AI工具</option>
                          <option value="教程指南">教程指南</option>
                          <option value="行业分析">行业分析</option>
                          <option value="效率提升">效率提升</option>
                          <option value="创意设计">创意设计</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>作者</label>
                        <select
                          value={formData.author}
                          onChange={(e) => setFormData(p => ({ ...p, author: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            background: 'white'
                          }}
                        >
                          <option value="张明远">张明远</option>
                          <option value="李小红">李小红</option>
                          <option value="王大力">王大力</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #eee'
                }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>🎨 内容设置</h2>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>
                        文章字数: <span style={{ color: '#667eea' }}>{formData.wordCount}字</span>
                      </label>
                      <input
                        type="range"
                        min="1500"
                        max="2500"
                        step="100"
                        value={formData.wordCount}
                        onChange={(e) => setFormData(p => ({ ...p, wordCount: Number(e.target.value) }))}
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#999' }}>
                        <span>1500字</span>
                        <span>2000字</span>
                        <span>2500字</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>内容模板</label>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {LONG_FORM_TEMPLATES.map(template => (
                          <button
                            key={template.id}
                            onClick={() => setFormData(p => ({ ...p, templateId: template.id }))}
                            style={{
                              padding: '12px 16px',
                              border: formData.templateId === template.id ? '2px solid #667eea' : '2px solid #e0e0e0',
                              borderRadius: '8px',
                              background: formData.templateId === template.id ? '#f0f4ff' : 'white',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>{template.name}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{template.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        id="includeImages"
                        checked={formData.includeImages}
                        onChange={(e) => setFormData(p => ({ ...p, includeImages: e.target.checked }))}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label htmlFor="includeImages" style={{ cursor: 'pointer', fontSize: '14px' }}>🖼️ 启用 AI 配图</label>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={generateArticle}
                  disabled={!formData.topic}
                  style={{
                    padding: '16px 48px',
                    fontSize: '18px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: !formData.topic ? 'not-allowed' : 'pointer',
                    opacity: !formData.topic ? 0.5 : 1,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  ✨ 开始生成文章
                </button>
                <p style={{ marginTop: '12px', fontSize: '14px', color: '#999' }}>
                  预计需要 5-10 秒生成完整内容
                </p>
              </div>
            </div>
          )}

          {/* 步骤2：生成中 */}
          {step === 'generating' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '80px', marginBottom: '24px' }}>✨</div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>AI 正在创作中...</h2>
              <p style={{ color: '#666', marginBottom: '32px', fontSize: '16px' }}>请稍候，我们正在生成高质量内容</p>

              {/* 进度条 */}
              <div style={{
                maxWidth: '400px',
                margin: '0 auto 24px',
                background: '#f0f0f0',
                borderRadius: '9999px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  borderRadius: '9999px',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* 提示词 */}
              <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '16px',
                background: '#f8f9ff',
                border: '1px solid #e0e7ff',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#4338ca'
              }}>
                <div style={{ marginBottom: '8px', fontWeight: 600 }}>📋 当前任务：</div>
                <div>正在为「{formData.topic}」创作 {formData.wordCount} 字深度文章...</div>
              </div>
            </div>
          )}

          {/* 步骤3：预览 */}
          {step === 'preview' && article && (
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>📖 文章预览</h1>
                <button
                  onClick={regenerate}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  🔄 重新生成
                </button>
              </div>

              {/* 信息面板 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #eee'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>文章字数</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#667eea' }}>{article.wordCount}字</div>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #eee'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>阅读时间</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#764ba2' }}>{article.readTimeMinutes}分钟</div>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #eee'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>原创性评分</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: (article.originalityScore ?? 0) >= 80 ? '#10b981' : (article.originalityScore ?? 0) >= 60 ? '#f59e0b' : '#ef4444' }}>
                    {article.originalityScore ?? 0}/100
                  </div>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #eee'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>配图数量</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>{article.images?.length || 0}张</div>
                </div>
              </div>

              {/* 文章预览 */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '40px',
                border: '1px solid #eee'
              }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', lineHeight: '1.2' }}>
                  {article.title}
                </h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', color: '#666' }}>
                  <span>👤 {article.author}</span>
                  <span>📂 {article.category}</span>
                  <span>🕐 {article.readTimeMinutes}分钟阅读</span>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                    {article.tags.map(tag => (
                      <span key={tag} style={{
                        background: '#f0f4ff',
                        color: '#4338ca',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: 600
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 配图预览 */}
                {article.images && article.images.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {article.images.map((img, idx) => (
                      <div key={img.id} style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px',
                        height: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '32px'
                      }}>
                        <div>🖼️</div>
                        <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>配图 {idx + 1}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 内容预览 */}
                <div style={{
                  lineHeight: '1.8',
                  fontSize: '16px',
                  color: '#333',
                  maxHeight: '500px',
                  overflow: 'auto',
                  paddingRight: '16px'
                }}>
                  <pre style={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    margin: 0
                  }}>
                    {article.fullContent}
                  </pre>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button
                  onClick={regenerate}
                  style={{
                    padding: '14px 32px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                >
                  🔄 重新生成
                </button>
                <button
                  onClick={publishArticle}
                  disabled={loading}
                  style={{
                    padding: '14px 48px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    fontSize: '16px',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? '发布中...' : '🚀 发布文章'}
                </button>
              </div>
            </div>
          )}

          {/* 步骤4：发布成功 */}
          {step === 'published' && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '100px', marginBottom: '24px' }}>🎉</div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>发布成功！</h2>
              <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
                您的文章已成功发布到博客
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/blog"
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  📖 查看博客
                </Link>
                <button
                  onClick={regenerate}
                  style={{
                    padding: '14px 32px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  ✍️ 再发一篇
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}

function isStepActive(current: string, actual: Step): boolean {
  const order: Step[] = ['setup', 'generating', 'editing', 'preview', 'published'];
  return order.indexOf(current as Step) <= order.indexOf(actual);
}
