import { useState, useEffect } from 'react'

/**
 * HeavyGrain — procedural stochastic film grain generator.
 * Creates an authentic, tactile risograph / film noise texture matching the reference design.
 */
function HeavyGrain() {
  const [grainUrl, setGrainUrl] = useState('')

  useEffect(() => {
    const size = 180
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const imgData = ctx.createImageData(size, size)
    const data = imgData.data

    for (let i = 0; i < data.length; i += 4) {
      const r1 = Math.random()
      const r2 = Math.random()
      const val = Math.floor(((r1 + r2) / 2) * 255)
      
      const contrast = val > 128 ? Math.min(255, val + 32) : Math.max(0, val - 32)
      
      data[i] = contrast
      data[i + 1] = contrast
      data[i + 2] = contrast
      data[i + 3] = Math.floor(Math.random() * 95 + 55)
    }

    ctx.putImageData(imgData, 0, 0)
    setGrainUrl(canvas.toDataURL())
  }, [])

  if (!grainUrl) return null

  return (
    <>
      {/* 1. Primary Grain (Overlay) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* 2. Soft Ink Tooth (Color-Burn) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'color-burn',
          opacity: 0.26,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* 3. Subtle Highlights (Screen) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'screen',
          opacity: 0.20,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  )
}

/**
 * Footer Component:
 * - Compact height with balanced padding
 * - Headline strictly rendered across 3 lines:
 *     Line 1: Open to joining
 *     Line 2: a creative team
 *     Line 3: Apprenticeship · October 2026
 * - Explore & Contact navigation columns
 * - Legal notice & copyright
 */
export default function Footer() {
  const exploreLinks = ['Journey', 'Toolkit', 'Projects', 'Playground', 'Contact']
  const contactLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub',   href: 'https://github.com' },
    { label: 'Email',    href: 'mailto:contact@uid.design' },
  ]

  return (
    <footer
      style={{
        padding: '0 14px 14px',
        boxSizing: 'border-box',
        width: '100%',
        background: '#eee7df',
      }}
    >
      {/* ── Main Rounded Footer Card ── */}
      <div
        style={{
          width: '100%',
          borderRadius: '26px',
          overflow: 'hidden',
          position: 'relative',
          padding: 'clamp(36px, 5.8vw, 78px) clamp(20px, 4vw, 64px) clamp(32px, 4.8vw, 54px)',
          boxSizing: 'border-box',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.06)',
          background: `
            radial-gradient(ellipse at 10% 45%, rgba(235, 44, 22, 1) 0%, rgba(240, 70, 30, 0.96) 26%, transparent 55%),
            radial-gradient(ellipse at 88% 96%, rgba(245, 150, 115, 0.9) 0%, rgba(240, 140, 105, 0.45) 24%, transparent 50%),
            radial-gradient(ellipse at 85% 15%, rgba(185, 130, 245, 0.65) 0%, transparent 45%),
            linear-gradient(105deg, #eb2c16 0%, #e2351f 16%, #7a4eb8 40%, #764db5 68%, #855ec7 100%)
          `,
        }}
      >
        {/* Heavy Multi-Pass Film Noise Grain */}
        <HeavyGrain />

        {/* Content Container */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* ── Top Row: Headline + Nav Columns ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '24px 48px',
            }}
          >
            {/* Left Main Headline — Strictly 3 lines */}
            <div style={{ maxWidth: '680px', flex: '1 1 260px' }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(20px, 3.2vw, 44px)',
                  fontWeight: 600,
                  lineHeight: 1.18,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                <span style={{ display: 'block' }}>
                  Open to joining
                </span>
                <span style={{ display: 'block' }}>
                  a creative team
                </span>
                <span style={{ display: 'block' }}>
                  Apprenticeship · October 2026
                </span>
              </h2>
            </div>

            {/* Right Nav Links Columns */}
            <div
              style={{
                display: 'flex',
                gap: 'clamp(36px, 5vw, 80px)',
                flexWrap: 'wrap',
              }}
            >
              {/* Explore Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(16px, 1.6vw, 20px)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    marginBottom: 2,
                  }}
                >
                  Explore
                </span>
                {exploreLinks.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.72)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.transform = 'translateX(2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Contact Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(16px, 1.6vw, 20px)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    marginBottom: 2,
                  }}
                >
                  Contact
                </span>
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.72)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.transform = 'translateX(2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Row: Legal notice & Copyright ── */}
          <div
            style={{
              marginTop: 'clamp(46px, 5.5vw, 76px)',
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              fontSize: 13,
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            <a
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
            >
              Legal notice
            </a>

            <span>© 2026 Guillaume Zhu</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
