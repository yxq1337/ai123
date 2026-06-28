import { NextResponse } from 'next/server';
import { automationStore } from '@/lib/automation-store';

export async function GET() {
  try {
    const logs = await automationStore.getLogs(undefined, 50);

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
