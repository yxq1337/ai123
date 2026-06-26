import { getContentQualityScore } from '@/lib/contentCheck'
import type { Tool } from '@/lib/types'

interface ContentQualityBadgeProps {
  tool: Tool
  showDetails?: boolean
}

export function ContentQualityBadge({ tool, showDetails = false }: ContentQualityBadgeProps) {
  const score = getContentQualityScore(tool)
  const level = score >= 80 ? '优秀' : score >= 60 ? '良好' : score >= 40 ? '需改进' : '较差'
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : score >= 40 ? '#f97316' : '#ef4444'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: `${color}15`,
        borderRadius: '999px',
        border: `1px solid ${color}30`
      }}
    >
      <span
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: color,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        {score}
      </span>
      <span
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color
        }}
      >
        内容质量：{level}
      </span>

      {showDetails && (
        <QualityDetails tool={tool} score={score} />
      )}
    </div>
  )
}

function QualityDetails({ tool, score }: { tool: Tool, score: number }) {
  const details: { label: string; pass: boolean }[] = [
    { label: '人工审核', pass: tool.eeatMetadata.isHumanReviewed },
    { label: 'AI贡献合理', pass: tool.eeatMetadata.aiContributionPercent <= 50 },
    { label: '事实核查', pass: tool.eeatMetadata.factChecked },
    { label: '作者经验', pass: tool.eeatMetadata.authorExperience.length > 0 },
    { label: '案例验证', pass: tool.eeatMetadata.verifiedCaseStudies.length > 0 },
    { label: '描述完整', pass: tool.description.length >= 50 },
    { label: '体验详实', pass: tool.review.ourExperience.length >= 200 },
    { label: '优缺点分明', pass: tool.review.pros.length >= 2 && tool.review.cons.length >= 1 },
    { label: '有FAQ', pass: !!tool.faq && tool.faq.length > 0 },
  ]

  return (
    <details
      style={{
        marginTop: '8px'
      }}
    >
      <summary style={{ cursor: 'pointer', fontSize: '12px', color: '#6b7280' }}>
        查看详细
      </summary>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        paddingTop: '8px'
      }}>
        {details.map((item, index) => (
          <span
            key={index}
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: item.pass ? '#dcfce7' : '#fee2e2',
              color: item.pass ? '#16a34a' : '#dc2626'
            }}
          >
            {item.pass ? '✓' : '✗'} {item.label}
          </span>
        ))}
      </div>
    </details>
  )
}
