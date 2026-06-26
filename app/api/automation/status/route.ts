import { NextRequest, NextResponse } from 'next/server';
import { automationStore } from '@/lib/automation-store';

export async function GET(request: NextRequest) {
  try {
    const siteConfigs = await automationStore.getAllSiteConfigs();
    const recentLogs = await automationStore.getLogs(undefined, 10);
    const posts = await automationStore.getAllPosts();

    return NextResponse.json({
      status: 'online',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      stats: {
        sites: siteConfigs.length,
        activeSites: siteConfigs.filter(s => s.active).length,
        totalPosts: posts.length,
        recentLogs: recentLogs.length
      },
      sites: siteConfigs.map(site => ({
        id: site.id,
        name: site.name,
        url: site.url,
        active: site.active
      }))
    });
  } catch (error) {
    console.error('[Automation] Status API错误:', error);
    return NextResponse.json({
      status: 'error',
      message: '获取状态失败'
    }, { status: 500 });
  }
}
