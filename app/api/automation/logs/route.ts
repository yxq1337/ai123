import { NextRequest, NextResponse } from 'next/server';
import { automationStore } from '@/lib/automation-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('siteId') || undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    const logs = await automationStore.getLogs(siteId, limit);

    return NextResponse.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('[Automation] Logs API错误:', error);
    return NextResponse.json({
      success: false,
      message: '获取日志失败'
    }, { status: 500 });
  }
}
