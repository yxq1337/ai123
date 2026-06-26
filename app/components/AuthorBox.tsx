import Link from 'next/link'

interface Author {
  name: string
  title: string
  bio: string
  avatar: string
  expertise: string[]
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export function AuthorBox({ author }: { author: Author }) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '1.5rem',
      background: 'var(--color-background-tertiary)',
      borderRadius: '1rem',
      marginTop: '2rem',
      border: '1px solid var(--color-border)',
    }}>
      <div>
        <img
          src={author.avatar}
          alt={author.name}
          width={80}
          height={80}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Link
          href={`/authors/${encodeURIComponent(author.name)}`}
          style={{ textDecoration: 'none' }}
        >
          <h3 style={{
            margin: '0 0 0.25rem 0',
            fontSize: '1.125rem',
            color: 'var(--color-primary)',
          }}>
            {author.name}
          </h3>
        </Link>
        <p style={{
          margin: '0 0 0.5rem 0',
          color: 'var(--color-text-secondary)',
          fontSize: '0.9375rem',
        }}>
          {author.title}
        </p>
        <p style={{
          margin: '0 0 1rem 0',
          lineHeight: '1.6',
          color: 'var(--color-text)',
        }}>
          {author.bio}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {author.expertise.map((exp) => (
            <span
              key={exp}
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
              }}
            >
              {exp}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
