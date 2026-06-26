export function VoiceSearchFAQ({ faq }: { faq: { question: string; answer: string }[] }) {
  if (!faq || faq.length === 0) return null

  return (
    <div
      itemScope
      itemType="https://schema.org/FAQPage"
      style={{ marginTop: '2rem' }}
    >
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        color: 'var(--color-text)',
      }}>
        🔊 常见问题
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faq.map((item, idx) => (
          <div
            key={idx}
            itemProp="mainEntity"
            itemScope
            itemType="https://schema.org/Question"
            style={{
              padding: '1.25rem',
              background: 'var(--color-background-tertiary)',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              itemProp="name"
              style={{
                fontSize: '1.125rem',
                margin: '0 0 0.75rem 0',
                color: 'var(--color-text)',
                fontWeight: 600,
              }}
            >
              ❓ {item.question}
            </h3>
            <div
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p
                itemProp="text"
                style={{
                  lineHeight: '1.7',
                  margin: 0,
                  color: 'var(--color-text-secondary)',
                }}
              >
                💡 {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
