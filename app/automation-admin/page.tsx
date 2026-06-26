'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AutomationLog } from '@/lib/automation-types';

interface StatusData {
  status: string;
  version: string;
  timestamp: string;
  stats: {
    sites: number;
    activeSites: number;
    totalPosts: number;
    recentLogs: number;
  };
  sites: Array<{
    id: string;
    name: string;
    url: string;
    active: boolean;
  }>;
}

interface LogsData {
  success: boolean;
  data: AutomationLog[];
}

// 文章类型
interface PostData {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  author?: string;
  tags?: string[];
  createdAt: string;
}

export default function AutomationAdminPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs' | 'posts'>('dashboard');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statusRes, logsRes] = await Promise.all([
        fetch('/api/automation/status'),
        fetch('/api/automation/logs?limit=20')
      ]);

      const statusData = await statusRes.json();
      const logsData = await logsRes.json();

      setStatus(statusData);
      if (logsData.success) {
        setLogs(logsData.data);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '18px' }}>加载中...</div>
      </div>
    );
  }

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)', textDecoration: 'none' }}>
            AI工具评测
          </Link>
          <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/blog" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>博客</Link>
            <Link href="/automation-docs" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>文档</Link>
            <Link href="/automation-test" style={{
              background: 'var(--color-primary)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              + 发布文章
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: '32px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '6px' }}>
                ⚡ AI内容自动化管理
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                监控系统状态、管理内容发布
              </p>
            </div>
            <button
              onClick={loadData}
              style={{
                background: 'var(--color-background-secondary)',
                border: '1px solid var(--color-border)',
                padding: '10px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔄 刷新数据
            </button>
          </div>

          {/* 标签页导航 */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '0'
          }}>
            {[
              { id: 'dashboard' as const, label: '📊 仪表盘', icon: '📊' },
              { id: 'posts' as const, label: '📝 文章管理', icon: '📝' },
              { id: 'logs' as const, label: '📋 活动日志', icon: '📋' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--color-text-secondary)',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  cursor: 'pointer',
                  fontSize: '14px',
                  borderRadius: '8px 8px 0 0'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'dashboard' && (
            <div>
              {/* 状态卡片 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
                  <div style={{ color: '#166534', fontSize: '14px', marginBottom: '8px' }}>系统状态</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>
                      {status?.status === 'online' ? '在线运行' : '离线'}
                    </span>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '8px' }}>已发布文章</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    {status?.stats.totalPosts || 0}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    活跃站点: {status?.stats.activeSites || 0}
                  </div>
                </div>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '8px' }}>配置站点</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    {status?.sites.length || 0}
                  </div>
                </div>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '8px' }}>API版本</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    {status?.version || '1.0'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* 站点列表 */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🌐 已配置站点
                  </div>
                  <div style={{ padding: '12px' }}>
                    {status?.sites.map(site => (
                      <div key={site.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px',
                        borderBottom: '1px solid var(--color-border)',
                        background: 'var(--color-background-secondary)',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{site.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{site.url}</div>
                        </div>
                        <div style={{
                          background: site.active ? '#dcfce7' : '#f3f4f6',
                          color: site.active ? '#166534' : '#4b5563',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {site.active ? '✅ 活跃' : '⏸️ 未启用'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作快捷方式 */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🚀 快捷操作
                  </div>
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link href="/blog" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      background: 'var(--color-background-secondary)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: 'var(--color-text)'
                    }}>
                      <span style={{ fontSize: '20px' }}>📖</span>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>查看博客文章</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>浏览所有发布的文章</div>
                      </div>
                    </Link>
                    <Link href="/automation-test" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      background: 'var(--color-background-secondary)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: 'var(--color-text)'
                    }}>
                      <span style={{ fontSize: '20px' }}>✍️</span>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>发布新文章</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>创建并发布新内容</div>
                      </div>
                    </Link>
                    <Link href="/automation-docs" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      background: 'var(--color-background-secondary)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: 'var(--color-text)'
                    }}>
                      <span style={{ fontSize: '20px' }}>📚</span>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>配置文档</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>查看API文档和配置指南</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>📝 文章列表</span>
                <Link href="/automation-test" style={{
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  + 发布新文章
                </Link>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-secondary)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                  <p>文章管理功能即将推出</p>
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>现在可以去 <Link href="/blog" style={{ color: 'var(--color-primary)' }}>博客页面</Link> 查看已发布的文章</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>
                📋 最近活动日志
              </div>
              <div style={{ padding: '16px' }}>
                {logs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-secondary)' }}>
                    暂无活动记录
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {logs.map(log => (
                      <div key={log.id} style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '14px',
                        background: 'var(--color-background-secondary)',
                        borderRadius: '8px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          marginTop: '6px',
                          flexShrink: 0,
                          background: getStatusColor(log.status)
                        }}></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold' }}>{log.action}</span>
                            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                              {new Date(log.timestamp).toLocaleString('zh-CN')}
                            </span>
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                            {log.details}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p>AI工具评测 © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
