'use client'

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
      className="author-bio"
      aria-labelledby="author-heading"
    >
      <h2
        id="author-heading"
        style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          marginBottom: '1.25rem',
          color: 'var(--color-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>✍️</span>
        关于作者
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div
          className="author-avatar"
          aria-hidden="true"
          style={{
            fontSize: '4rem',
            flexShrink: 0,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
          }}
        >
          {author.avatar}
        </div>

        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                margin: 0,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {author.name}
            </h3>
            {author.verified && (
              <span
                className="badge badge-success"
              >
                ✓ 已认证专家
              </span>
            )}
          </div>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1rem',
              marginBottom: '0.75rem',
              fontWeight: '600'
            }}
          >
            {author.title} · {author.experienceYears}年经验
          </p>

          <p
            style={{
              color: 'var(--color-text)',
              fontSize: '1rem',
              lineHeight: '1.75',
              marginBottom: '1rem'
            }}
          >
            {author.bio}
          </p>

          {/* Credentials */}
          {author.credentials && author.credentials.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                🎓 专业资质
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {author.credentials.map((cred, idx) => (
                  <span
                    key={idx}
                    className="badge badge-primary"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expertise */}
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              color: 'var(--color-text)',
              marginBottom: '0.5rem'
            }}>
              💡 专业领域
            </h4>
            <div className="tag-cloud">
              {author.expertise.map((skill, idx) => (
                <span
                  key={idx}
                  className="tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Publications */}
          {author.publications && author.publications.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                📚 出版作品
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem'
              }}>
                {author.publications.map((pub, idx) => (
                  <li key={idx} style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    paddingLeft: '1rem',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--color-primary)'
                    }}>
                      •
                    </span>
                    {pub}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Speaking Engagements */}
          {author.speakingEngagements && author.speakingEngagements.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                🎤 演讲活动
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {author.speakingEngagements.map((talk, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--color-secondary)',
                      borderRadius: '999px',
                      fontWeight: '500'
                    }}
                  >
                    {talk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EEAT Metadata */}
          {eeatMetadata && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                paddingTop: '1rem',
                marginTop: '1rem',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: eeatMetadata.isHumanReviewed ? 'var(--color-success)' : 'var(--color-text-muted)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                <span>{eeatMetadata.isHumanReviewed ? '✅' : '⚠️'}</span>
                <span>
                  {eeatMetadata.isHumanReviewed ? '人工审核通过' : '待人工审核'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                <span>🤖</span>
                <span>
                  AI贡献率: {eeatMetadata.aiContributionPercent}%
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: eeatMetadata.factChecked ? 'var(--color-success)' : 'var(--color-text-muted)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                <span>{eeatMetadata.factChecked ? '✓' : '?'}</span>
                <span>
                  {eeatMetadata.factChecked ? '事实核查完成' : '待事实核查'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                <span>📅</span>
                <span>
                  最后验证: {eeatMetadata.lastVerifiedDate}
                </span>
              </div>
            </div>
          )}

          {/* Author's Case Studies */}
          {author.caseStudies && author.caseStudies.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: 'var(--color-text)',
                marginBottom: '0.75rem'
              }}>
                🏆 代表案例
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {author.caseStudies.map((caseStudy, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <h5 style={{
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      margin: '0 0 0.375rem 0'
                    }}>
                      {caseStudy.title}
                    </h5>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-secondary)',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.5'
                    }}>
                      {caseStudy.description}
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-success)',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      成果: {caseStudy.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EEAT's Verified Case Studies */}
          {eeatMetadata?.verifiedCaseStudies && eeatMetadata.verifiedCaseStudies.length > 0 && !author.caseStudies && (
            <div style={{ marginTop: '1.25rem' }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: 'var(--color-text)',
                marginBottom: '0.75rem'
              }}>
                📊 验证案例
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {eeatMetadata.verifiedCaseStudies.map((caseStudy, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <h5 style={{
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      margin: '0 0 0.375rem 0'
                    }}>
                      {caseStudy.title}
                    </h5>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-secondary)',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.5'
                    }}>
                      {caseStudy.description}
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-success)',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      成果: {caseStudy.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {Object.keys(author.social).length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      padding: '0.5rem 1rem',
                      background: 'var(--color-background-secondary)',
                      borderRadius: '0.5rem',
                      transition: 'all var(--transition-base)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-primary)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-background-secondary)';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <span>𝕏</span>
                    Twitter
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      padding: '0.5rem 1rem',
                      background: 'var(--color-background-secondary)',
                      borderRadius: '0.5rem',
                      transition: 'all var(--transition-base)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0077b5';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-background-secondary)';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <span>in</span>
                    LinkedIn
                  </a>
                )}
                {author.social.github && (
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      padding: '0.5rem 1rem',
                      background: 'var(--color-background-secondary)',
                      borderRadius: '0.5rem',
                      transition: 'all var(--transition-base)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#333';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-background-secondary)';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <span>⚡</span>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
