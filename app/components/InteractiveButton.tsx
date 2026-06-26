'use client'

import { useCallback, useRef, useEffect } from 'react'

interface InteractiveButtonProps {
  onClick?: () => void
  href?: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  ariaLabel?: string
  role?: string
}

export function InteractiveButton({
  onClick,
  href,
  children,
  style,
  className,
  disabled = false,
  ariaLabel,
  role
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const lastInteractionRef = useRef<number>(0)

  const handleClick = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    const now = Date.now()
    if (now - lastInteractionRef.current < 100) {
      e.preventDefault()
      return
    }
    lastInteractionRef.current = now

    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }, [onClick])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e)
    }
  }, [handleClick])

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleInteraction = () => {
      button.classList.add('active')
    }

    const handleInteractionEnd = () => {
      button.classList.remove('active')
    }

    button.addEventListener('pointerdown', handleInteraction, { passive: true })
    button.addEventListener('pointerup', handleInteractionEnd, { passive: true })
    button.addEventListener('pointerleave', handleInteractionEnd, { passive: true })

    return () => {
      button.removeEventListener('pointerdown', handleInteraction)
      button.removeEventListener('pointerup', handleInteractionEnd)
      button.removeEventListener('pointerleave', handleInteractionEnd)
    }
  }, [])

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`interactive-link ${className || ''}`}
        style={{
          ...style,
          cursor: disabled ? 'not-allowed' : 'pointer',
          touchAction: 'manipulation',
          opacity: disabled ? 0.5 : 1
        }}
        aria-label={ariaLabel}
        role={role}
        tabIndex={disabled ? -1 : 0}
        onClick={!disabled ? handleClick : undefined}
        onKeyDown={!disabled ? handleKeyDown : undefined}
        data-inp-optimized="true"
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      className={`interactive-button ${className || ''}`}
      style={{
        ...style,
        cursor: disabled ? 'not-allowed' : 'pointer',
        touchAction: 'manipulation',
        border: 'none',
        background: 'transparent'
      }}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={!disabled ? handleClick : undefined}
      onKeyDown={!disabled ? handleKeyDown : undefined}
      data-inp-optimized="true"
    >
      {children}
    </button>
  )
}

export function SkipLink({ targetId = 'main-content', label = '跳转到主要内容' }: { targetId?: string, label?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.setAttribute('tabindex', '-1')
      element.focus()
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '0 0 8px 8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        zIndex: '1000',
        transition: 'top 0.2s ease'
      }}
      className="skip-link"
      onFocus={(e) => {
        e.currentTarget.style.top = '0'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px'
      }}
    >
      {label}
    </a>
  )
}
