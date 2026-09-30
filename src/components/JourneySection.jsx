import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * BannerGrain — procedural multi-pass stochastic film noise overlay
 * Applied across both sliding side banners and the expanded card gradient
 */
function BannerGrain({ grainUrl }) {
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
          opacity: 0.72,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      {/* 2. Tactile Riso Ink Tooth (Color-Burn) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'color-burn',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      {/* 3. Luminous Micro-Speckles (Screen) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'screen',
          opacity: 0.22,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    </>
  )
}

/**
 * JourneySection — Pinned GSAP Scroll Animation:
 * - Grainy sliding banners (fiery red-orange on left, electric purple-violet on right)
 * - Text morphs from "Today" -> "I bridge" -> "the two."
 * - Merges and expands across the full viewport with seamless film noise
 */
export default function JourneySection() {
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  // Text refs
  const textTodayRef = useRef(null)
  const textBridgeRef = useRef(null)
  const textTheTwoSolidRef = useRef(null)
  const textTheTwoOutlineRef = useRef(null)

  // Gradient morph elements
  const leftBannerRef = useRef(null)
  const rightBannerRef = useRef(null)

  // Shared high-density noise data URL
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          pin: cardRef.current,
          anticipatePin: 1,
        },
      })

      // ─────────────────────────────────────────────────────────────
      // TIMELINE PHASES (Smooth 3D Staggered Flip-in matching user reference)
      // ─────────────────────────────────────────────────────────────

      // PHASE 1 -> 2: "Today" flips out, "I bridge" flips in with 3D stagger
      tl.to(
        '.char-today',
        {
          opacity: 0,
          scale: 0,
          y: -80,
          rotationX: -180,
          transformOrigin: '0% 50% -50px',
          duration: 0.16,
          ease: 'power2.in',
          stagger: 0.02,
        },
        0.05
      )

      tl.fromTo(
        '.char-bridge',
        {
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: '0% 50% -50px',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          transformOrigin: '0% 50% -50px',
          duration: 0.20,
          ease: 'back.out(1.5)',
          stagger: 0.02,
        },
        0.12
      )

      tl.fromTo(
        leftBannerRef.current,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
        0.10
      )

      tl.fromTo(
        rightBannerRef.current,
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
        0.10
      )

      // PHASE 2 -> 3: "I bridge" flips out, banners merge in center, "the two." flips in
      tl.to(
        '.char-bridge',
        {
          opacity: 0,
          scale: 0,
          y: -80,
          rotationX: -180,
          transformOrigin: '0% 50% -50px',
          duration: 0.16,
          ease: 'power2.in',
          stagger: 0.015,
        },
        0.36
      )

      tl.to(leftBannerRef.current, {
        width: '50.1%',
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.42)

      tl.to(rightBannerRef.current, {
        width: '50.1%',
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.42)

      tl.fromTo(
        '.char-two-solid',
        {
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: '0% 50% -50px',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          transformOrigin: '0% 50% -50px',
          duration: 0.20,
          ease: 'back.out(1.5)',
          stagger: 0.02,
        },
        0.44
      )

      // PHASE 3 -> 4: Merged band expands vertically to full viewport — smooth expansion from 220px to window height with NO decrease
      tl.fromTo(
        leftBannerRef.current,
        {
          height: 220,
          borderTopRightRadius: '24px',
          borderBottomRightRadius: '24px',
        },
        {
          height: () => window.innerHeight,
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
          duration: 0.24,
          ease: 'power2.inOut',
        },
        0.60
      )

      tl.fromTo(
        rightBannerRef.current,
        {
          height: 220,
          borderTopLeftRadius: '24px',
          borderBottomLeftRadius: '24px',
        },
        {
          height: () => window.innerHeight,
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          duration: 0.24,
          ease: 'power2.inOut',
        },
        0.60
      )

      // PHASE 4 -> 5: "the two." switches from solid to outline stroke
      tl.to(
        '.char-two-solid',
        {
          opacity: 0,
          duration: 0.12,
          ease: 'power2.inOut',
        },
        0.82
      )

      tl.fromTo(
        textTheTwoOutlineRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.12,
          ease: 'power2.inOut',
        },
        0.82
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Exact footer gradient shared seamlessly across left & right banners
  const footerGradient = `
    radial-gradient(ellipse at 10% 45%, rgba(235, 44, 22, 1) 0%, rgba(240, 70, 30, 0.96) 26%, transparent 55%),
    radial-gradient(ellipse at 88% 96%, rgba(245, 150, 115, 0.9) 0%, rgba(240, 140, 105, 0.45) 24%, transparent 50%),
    radial-gradient(ellipse at 85% 15%, rgba(185, 130, 245, 0.65) 0%, transparent 45%),
    linear-gradient(105deg, #eb2c16 0%, #e2351f 16%, #7a4eb8 40%, #764db5 68%, #855ec7 100%)
  `

  return (
    <div
      id="journey"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '420vh',
        background: 'transparent',
      }}
    >
      {/* ── STICKY PINNED VIEWPORT CONTAINER ── */}
      <div
        ref={cardRef}
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        {/* ── 1. Left Gradient Banner (Slides in, joins, expands vertically with Footer Gradient) ── */}
        <div
          ref={leftBannerRef}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '34%',
            height: '220px',
            borderTopRightRadius: '24px',
            borderBottomRightRadius: '24px',
            overflow: 'hidden',
            zIndex: 10,
            opacity: 0,
            willChange: 'transform, width, height, opacity',
          }}
        >
          {/* Inner viewport-wide canvas card showing footer gradient left half */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100vw',
              height: '100vh',
              background: footerGradient,
            }}
          >
            <BannerGrain grainUrl={grainUrl} />
          </div>
        </div>

        {/* ── 2. Right Gradient Banner (Slides in, joins, expands vertically with Footer Gradient) ── */}
        <div
          ref={rightBannerRef}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '34%',
            height: '220px',
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
            overflow: 'hidden',
            zIndex: 10,
            opacity: 0,
            willChange: 'transform, width, height, opacity',
          }}
        >
          {/* Inner viewport-wide canvas card showing footer gradient right half */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100vw',
              height: '100vh',
              background: footerGradient,
            }}
          >
            <BannerGrain grainUrl={grainUrl} />
          </div>
        </div>

        {/* ── 4. CENTER TYPOGRAPHY CONTAINER (3D Perspective for Staggered Chars) ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Text 1: "Today" */}
          <h1
            ref={textTodayRef}
            style={{
              position: 'absolute',
              fontFamily: "'Mori', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(54px, 10vw, 150px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#161311',
              textAlign: 'center',
              margin: 0,
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              fontKerning: 'none',
            }}
          >
            {'Today'.split('').map((char, i) => (
              <span
                key={i}
                className="char-today"
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                  transformOrigin: '0% 50% -50px',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Text 2: "I bridge" */}
          <h1
            ref={textBridgeRef}
            style={{
              position: 'absolute',
              fontFamily: "'Mori', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(54px, 10vw, 150px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#161311',
              textAlign: 'center',
              margin: 0,
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              fontKerning: 'none',
            }}
          >
            {'I bridge'.split('').map((char, i) => (
              <span
                key={i}
                className="char-bridge"
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                  transformOrigin: '0% 50% -50px',
                  opacity: 0,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Text 3: "the two." (Solid White) */}
          <h1
            ref={textTheTwoSolidRef}
            style={{
              position: 'absolute',
              fontFamily: "'Mori', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(54px, 10vw, 150px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#ffffff',
              textAlign: 'center',
              margin: 0,
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              fontKerning: 'none',
            }}
          >
            {'the two.'.split('').map((char, i) => (
              <span
                key={i}
                className="char-two-solid"
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                  transformOrigin: '0% 50% -50px',
                  opacity: 0,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Text 4: "the two." (Outline Stroke) */}
          <h1
            ref={textTheTwoOutlineRef}
            style={{
              position: 'absolute',
              fontFamily: "'Mori', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(54px, 10vw, 150px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.85)',
              textAlign: 'center',
              margin: 0,
              opacity: 0,
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              fontKerning: 'none',
              willChange: 'opacity',
            }}
          >
            {'the two.'.split('').map((char, i) => (
              <span
                key={i}
                className="char-two-outline"
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  )
}
