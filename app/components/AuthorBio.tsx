import type { Author, EEAATMetaData } from '@/lib/types'
import { siteConfig, getAuthorByName } from '@/data/site'

interface AuthorBioProps {
  authorName: string
  eeatMetadata?: EEAATMetaData
}

export function AuthorBio({ authorName, eeatMetadata }: AuthorBioProps) {
  const author = getAuthorByName(authorName) || siteConfig.founder

  return (
    <section
      className="author-bio-section"
      aria-labelledby="author-heading"
      style={{
        marginTop: '48px',
        padding: '32px',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--color-border)'
      }}
    >
      <h2
        id="author-heading"
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: 'var(--color-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '20px' }}>✍️</span>
        作者背书
      </h2>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div
          className="author-avatar"
          aria-hidden="true"
          style={{
            fontSize: '64px',
            flexShrink: 0
          }}
        >
          {author.avatar}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                margin: 0
              }}
            >
              {author.name}
            </h3>
            {author.verified && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                aria-label="已验证作者"
              >
                ✓ 已验证
              </span>
            )}
          </div>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              marginBottom: '12px',
              marginTop: 0
            }}
          >
            {author.title} · {author.experienceYears}年经验
          </p>

          <p
            style={{
              color: 'var(--color-text)',
              fontSize: '15px',
              lineHeight: '1.7',
              marginBottom: '16px'
            }}
          >
            {author.bio}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {author.expertise.map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: 'white',
                  color: 'var(--color-text-secondary)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  border: '1px solid var(--color-border)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {eeatMetadata && (
            <div
              className="eeat-metadata"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: eeatMetadata.isHumanReviewed ? '#10b981' : 'var(--color-text-muted)'
              }}>
                <span>{eeatMetadata.isHumanReviewed ? '✅' : '⚠️'}</span>
                <span style={{ fontSize: '13px' }}>
                  {eeatMetadata.isHumanReviewed ? '已人工审核' : '待人工审核'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-secondary)'
              }}>
                <span>🤖</span>
                <span style={{ fontSize: '13px' }}>
                  AI贡献率: {eeatMetadata.aiContributionPercent}%
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: eeatMetadata.factChecked ? '#10b981' : 'var(--color-text-muted)'
              }}>
                <span>{eeatMetadata.factChecked ? '✓' : '?'}</span>
                <span style={{ fontSize: '13px' }}>
                  {eeatMetadata.factChecked ? '已事实核查' : '待事实核查'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-secondary)'
              }}>
                <span>📅</span>
                <span style={{ fontSize: '13px' }}>
                  最后验证: {eeatMetadata.lastVerifiedDate}
                </span>
              </div>
            </div>
          )}

          {eeatMetadata?.authorExperience && eeatMetadata.authorExperience.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                相关经验
              </h4>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'var(--color-text-secondary)',
                fontSize: '14px'
              }}>
                {eeatMetadata.authorExperience.map((exp, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {eeatMetadata?.verifiedCaseStudies && eeatMetadata.verifiedCaseStudies.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                验证案例
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {eeatMetadata.verifiedCaseStudies.map((caseStudy, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--color-primary)',
                      margin: '0 0 6px 0'
                    }}>
                      📊 {caseStudy.title}
                    </h5>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      margin: '0 0 6px 0',
                      lineHeight: '1.5'
                    }}>
                      {caseStudy.description}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#10b981',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      结果: {caseStudy.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
