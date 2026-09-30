import { useRef, useEffect } from 'react'

/**
 * Static Canvas Gradient Background
 * Renders Guillaume Zhu's signature fiery palette:
 * Vibrant poppy red-orange (#eb2c16) blending into glowing magenta (#d7269e) and violet.
 */
function GradientCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const drawGradient = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width || window.innerWidth
      canvas.height = rect.height || window.innerHeight

      const W = canvas.width
      const H = canvas.height

      // Base fill: vibrant poppy red-orange
      ctx.fillStyle = '#eb2c16'
      ctx.fillRect(0, 0, W, H)

      const blob = (x, y, r, colorStops, composite = 'source-over') => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        colorStops.forEach(([stop, color]) => g.addColorStop(stop, color))
        ctx.globalCompositeOperation = composite
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      // Dominant Right-Side Magenta / Neon Pink Bloom
      blob(
        W * 0.82,
        H * 0.36,
        Math.max(W, H) * 0.72,
        [
          [0,    'rgba(215, 38, 158, 0.95)'],
          [0.32, 'rgba(195, 26, 138, 0.82)'],
          [0.55, 'rgba(170, 18, 120, 0.55)'],
          [0.8,  'rgba(210, 35, 60, 0.2)'],
          [1,    'rgba(235, 44, 22, 0)'],
        ],
        'source-over'
      )

      // Top-Right Electric Violet Blush
      blob(
        W * 0.92,
        H * 0.16,
        Math.max(W, H) * 0.55,
        [
          [0,    'rgba(175, 22, 140, 0.88)'],
          [0.4,  'rgba(148, 14, 125, 0.55)'],
          [0.75, 'rgba(180, 20, 90, 0.2)'],
          [1,    'rgba(235, 44, 22, 0)'],
        ],
        'source-over'
      )

      // Center-Left Bright Poppy Red / Scarlet Glow
      blob(
        W * 0.28,
        H * 0.48,
        Math.max(W, H) * 0.62,
        [
          [0,    'rgba(255, 75, 30, 0.48)'],
          [0.45, 'rgba(240, 50, 24, 0.25)'],
          [1,    'rgba(235, 44, 22, 0)'],
        ],
        'screen'
      )

      // Bottom-Right Fiery Peach-Orange Accent
      blob(
        W * 0.75,
        H * 0.85,
        Math.max(W, H) * 0.52,
        [
          [0,   'rgba(255, 95, 38, 0.65)'],
          [0.4, 'rgba(235, 55, 50, 0.35)'],
          [0.8, 'rgba(215, 35, 120, 0.15)'],
          [1,   'rgba(235, 44, 22, 0)'],
        ],
        'screen'
      )

      // Far Left Subtle Crimson Depth
      blob(
        W * 0.08,
        H * 0.72,
        Math.max(W, H) * 0.45,
        [
          [0, 'rgba(210, 25, 15, 0.45)'],
          [1, 'rgba(235, 44, 22, 0)'],
        ],
        'multiply'
      )

      ctx.globalCompositeOperation = 'source-over'
    }

    drawGradient()
    window.addEventListener('resize', drawGradient)
    return () => window.removeEventListener('resize', drawGradient)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}

/**
 * Pure Background Hero Component
 * All contents removed — only the signature gradient card is displayed.
 */
export default function Hero() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: '#eee7df',
        padding: '14px',
        boxSizing: 'border-box',
        display: 'flex',
        position: 'relative',
      }}
    >
      {/* Outer rounded card container with soft shadow */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '26px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Signature Fiery Red-Orange to Magenta Gradient Canvas */}
        <GradientCanvas />

        {/* Ambient Film Grain Texture */}
        <div
          className="noise"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            opacity: 0.16,
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </div>
  )
}
