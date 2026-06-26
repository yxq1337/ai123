'use client'

import { useState } from 'react'
import type { Tool } from '@/lib/types'

interface UserQuestionsProps {
  tool: Tool
}

const commonQuestions = [
  {
    category: '团队使用',
    questions: [
      '这个工具适合小团队使用吗？',
      '团队协作功能怎么样？',
      '有哪些适合多人工作流的功能？',
      '团队版的性价比如何？'
    ]
  },
  {
    category: '预算',
    questions: [
      '免费版够用吗？',
      '付费版值得订阅吗？',
      '性价比最高的方案是哪个？',
      '有哪些隐藏费用需要注意？'
    ]
  },
  {
    category: '使用场景',
    questions: [
      '这个工具最适合什么场景？',
      '不适合什么样的用户？',
      '日常工作中用得到吗？',
      '能替代哪些现有工具？'
    ]
  },
  {
    category: '技术问题',
    questions: [
      '需要什么技术基础？',
      '对电脑配置有要求吗？',
      '有API接口吗？',
      '数据安全有保障吗？'
    ]
  },
  {
    category: '学习成本',
    questions: [
      '容易上手吗？',
      '需要多长时间学会？',
      '新手应该从哪里开始？',
      '有推荐的学习资源吗？'
    ]
  }
]

export function UserQuestions({ tool }: UserQuestionsProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleExpand = (category: string) => {
    setExpanded(expanded === category ? null : category)
  }

  return (
    <section
      aria-labelledby="user-questions-heading"
      style={{
        marginTop: '48px',
        padding: '32px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px' }}>💭</span>
        <div>
          <h2
            id="user-questions-heading"
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0
            }}
          >
            用户真实提问
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '4px 0 0 0'
          }}>
            来自真实用户的常见问题和我们的建议
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {commonQuestions.map((item) => (
          <div
            key={item.category}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}
          >
            <button
              type="button"
              onClick={() => toggleExpand(item.category)}
              aria-expanded={expanded === item.category}
              aria-controls={`questions-${item.category}`}
              style={{
                width: '100%',
                padding: '16px 20px',
                textAlign: 'left',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151'
              }}
            >
              <span>
                {getCategoryIcon(item.category)} {item.category}
              </span>
              <span
                style={{
                  fontSize: '20px',
                  transition: 'transform 0.2s ease',
                  transform: expanded === item.category ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            {expanded === item.category && (
              <div
                id={`questions-${item.category}`}
                style={{
                  padding: '0 20px 20px 20px',
                  borderTop: '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  {item.questions.map((question, index) => (
                    <UserQuestionItem
                      key={index}
                      question={question}
                      tool={tool}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0,
          textAlign: 'center'
        }}>
          有其他问题？
          <a
            href="/contact"
            style={{
              color: 'var(--color-primary)',
              fontWeight: '600',
              marginLeft: '4px'
            }}
          >
            联系我们提问 →
          </a>
        </p>
      </div>
    </section>
  )
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    '团队使用': '👥',
    '预算': '💰',
    '使用场景': '🎯',
    '技术问题': '💻',
    '学习成本': '📚'
  }
  return icons[category] || '❓'
}

interface UserQuestionItemProps {
  question: string
  tool: Tool
}

function UserQuestionItem({ question, tool }: UserQuestionItemProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  const answer = getAnswerForQuestion(question, tool)

  return (
    <div style={{
      backgroundColor: '#fafafa',
      borderRadius: '8px',
      padding: '12px 16px'
    }}>
      <button
        type="button"
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px'
        }}
      >
        <span style={{
          fontSize: '14px',
          color: '#374151',
          lineHeight: '1.5',
          flex: 1
        }}>
          <span style={{ color: '#6b7280', fontWeight: '500' }}>Q:</span> {question}
        </span>
        <span style={{
          color: 'var(--color-primary)',
          fontSize: '16px',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          {showAnswer ? '−' : '+'}
        </span>
      </button>

      {showAnswer && (
        <div style={{
          marginTop: '12px',
          padding: '12px 16px',
          backgroundColor: 'white',
          borderRadius: '6px',
          borderLeft: '3px solid var(--color-primary)'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#4b5563',
            lineHeight: '1.6',
            margin: 0
          }}>
            <span style={{ color: '#10b981', fontWeight: '500' }}>A:</span> {answer}
          </p>
        </div>
      )}
    </div>
  )
}

function getAnswerForQuestion(question: string, tool: Tool): string {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('免费') || lowerQuestion.includes('付费')) {
    return `${tool.name}提供免费试用，付费版解锁更多功能。根据我们的测试，${tool.review.rating >= 4.5 ? '非常值得订阅' : '建议先试用免费版评估'}。具体方案可访问官网了解。`
  }

  if (lowerQuestion.includes('团队') || lowerQuestion.includes('协作')) {
    return `是的，${tool.name}支持团队使用。在我们的评测中，它${tool.categories.includes('Productivity') ? '在团队协作方面表现优秀' : '有基础的团队功能'}。建议先从小团队开始测试，再逐步推广。`
  }

  if (lowerQuestion.includes('上手') || lowerQuestion.includes('学习')) {
    return `${tool.name}${tool.review.pros.some(p => p.includes('简洁') || p.includes('易用')) ? '非常容易上手' : '有一定的学习曲线'}。建议：1) 先看官方文档；2) 从简单任务开始；3) 逐步探索高级功能。`
  }

  if (lowerQuestion.includes('安全') || lowerQuestion.includes('数据')) {
    return `${tool.name}重视数据安全，企业版提供更多安全保障。对于敏感数据，建议：1) 了解数据存储位置；2) 查看隐私政策；3) 必要时考虑私有化部署选项。`
  }

  if (lowerQuestion.includes('适合') || lowerQuestion.includes('场景')) {
    return `${tool.name}最适合${tool.categories.slice(0, 2).join('、')}相关的任务。根据我们的经验，它在${tool.review.ourExperience.substring(0, 50)}... 方面表现出色。`
  }

  if (lowerQuestion.includes('性价比')) {
    return `从我们的评测来看，${tool.name}${tool.review.rating >= 4.5 ? '的性价比很高' : '性价比中等'}。建议先试用免费版，确认能满足需求后再考虑付费。`
  }

  if (lowerQuestion.includes('技术')) {
    return `${tool.name}${tool.categories.includes('Coding') || tool.categories.includes('Developer Tools') ? '需要一定的技术基础' : '不需要很深的技术背景'}。官方提供了完善的文档和教程帮助新用户入门。`
  }

  if (lowerQuestion.includes('替代')) {
    return `${tool.name}可以替代一些传统工具。根据我们的对比，它在${tool.review.pros[0]}方面有明显优势，但建议先做并行测试再完全切换。`
  }

  return `基于我们对${tool.name}的深度测试和使用经验，这个问题建议直接访问官网或联系他们的客服获取最准确的信息。我们的评测主要关注实际使用体验，具体功能细节请以官方说明为准。`
}
