import { useRef, useEffect, useCallback, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* =========================================================================
   1. DYNAMIC CANVAS GRADIENT BACKGROUND
   ========================================================================= */
function GradientCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width || window.innerWidth
      canvas.height = rect.height || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const render = (ts) => {
      timeRef.current = ts * 0.00035
      const t = timeRef.current
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
      const mx = W * 0.82 + Math.sin(t * 0.6) * W * 0.04
      const my = H * 0.36 + Math.cos(t * 0.5) * H * 0.05
      blob(
        mx,
        my,
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
      const vx = W * 0.92 + Math.cos(t * 0.45) * W * 0.03
      const vy = H * 0.16 + Math.sin(t * 0.4) * H * 0.04
      blob(
        vx,
        vy,
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
      const cx = W * 0.28 + Math.sin(t * 0.5 + 1) * W * 0.04
      const cy = H * 0.48 + Math.cos(t * 0.6 + 2) * H * 0.04
      blob(
        cx,
        cy,
        Math.max(W, H) * 0.62,
        [
          [0,    'rgba(255, 75, 30, 0.48)'],
          [0.45, 'rgba(240, 50, 24, 0.25)'],
          [1,    'rgba(235, 44, 22, 0)'],
        ],
        'screen'
      )

      // Bottom-Right Fiery Peach-Orange Accent
      const bx = W * 0.75 + Math.cos(t * 0.55 + 2) * W * 0.04
      const by = H * 0.85 + Math.sin(t * 0.45 + 1) * H * 0.04
      blob(
        bx,
        by,
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
      const lx = W * 0.08
      const ly = H * 0.72
      blob(
        lx,
        ly,
        Math.max(W, H) * 0.45,
        [
          [0, 'rgba(210, 25, 15, 0.45)'],
          [1, 'rgba(235, 44, 22, 0)'],
        ],
        'multiply'
      )

      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
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

/* =========================================================================
   2. 3D WEBGL ELEMENT (PARTICLES, TORUS KNOT, LIGHTING)
   ========================================================================= */
function ParticleField() {
  const meshRef = useRef()
  const count = 180

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz  = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
      sz[i]          = Math.random() * 0.018 + 0.004
    }
    return [pos, sz]
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.elapsedTime * 0.015
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.04
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes,     1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#ffaec8"
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  )
}

function GlassTorusKnot({ mouseRef }) {
  const meshRef   = useRef()
  const groupRef  = useRef()
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Floating bob motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.16 + Math.cos(t * 0.35) * 0.05
    }

    // Gentle continuous spin
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.14
    }

    // Cursor tracking with smooth lerp
    if (mouseRef?.current) {
      const { x, y } = mouseRef.current
      targetRot.current.x = -y * 0.5
      targetRot.current.y =  x * 0.5

      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.06
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.06

      if (groupRef.current) {
        groupRef.current.rotation.x = currentRot.current.x
        groupRef.current.rotation.y = t * 0.2 + currentRot.current.y
      }
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1.15, 0.4, 256, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.3}
          samples={16}
          resolution={512}
          transmission={0.92}
          roughness={0.06}
          thickness={1.6}
          ior={1.52}
          chromaticAberration={0.07}
          anisotropy={0.12}
          distortion={0.1}
          distortionScale={0.25}
          temporalDistortion={0.03}
          iridescence={0.55}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 350]}
          color="#ff7aa5"
          attenuationColor="#ea3570"
          attenuationDistance={0.8}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2.2}
        />
      </mesh>

      {/* Inner subtle glow accent */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.012, 16, 120]} />
        <meshBasicMaterial color="#ffa2c5" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function OrbitingLights() {
  const light1 = useRef()
  const light2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.6) * 4.5
      light1.current.position.y = Math.cos(t * 0.4) * 2.5
      light1.current.position.z = Math.cos(t * 0.6) * 2
    }
    if (light2.current) {
      light2.current.position.x = Math.sin(t * 0.5 + Math.PI) * 4
      light2.current.position.y = Math.cos(t * 0.7 + 1) * 2
      light2.current.position.z = Math.sin(t * 0.5) * 2
    }
  })

  return (
    <>
      <pointLight ref={light1} color="#ff5088" intensity={14} distance={9} decay={2} />
      <pointLight ref={light2} color="#ff7a38" intensity={12} distance={9} decay={2} />
      <pointLight position={[0, 0, 4]} color="#d946ef" intensity={7} distance={8} decay={2} />
    </>
  )
}

function Scene3D({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.4} color="#651828" />
      <OrbitingLights />
      <ParticleField />
      <GlassTorusKnot mouseRef={mouseRef} />
      <Environment preset="studio" />
    </>
  )
}

function WebGLCanvas({ mouseRef }) {
  return (
    <Canvas
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Scene3D mouseRef={mouseRef} />
    </Canvas>
  )
}

/* =========================================================================
   3. TYPOGRAPHY & BRAND OVERLAY (UID — UNCOMMON INSTITUTE OF DESIGN)
   ========================================================================= */
function BrandOverlay() {
  return (
    <>
      {/* Top-Left Monogram & Institute Title */}
      <div
        className="animate-fade-in-down"
        style={{
          position: 'absolute',
          top: 28,
          left: 32,
          zIndex: 15,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 3vw, 34px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            lineHeight: 1,
            textTransform: 'lowercase',
          }}
        >
          uid
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 600,
            borderLeft: '1px solid rgba(255,255,255,0.2)',
            paddingLeft: 10,
            lineHeight: 1.2,
          }}
        >
          Uncommon Institute<br />of Design
        </span>
      </div>

      {/* Main Bold White Lowercase Typography */}
      <div
        className="animate-fade-in-up"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          padding: '0 20px',
        }}
      >
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(52px, 12.5vw, 170px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            textAlign: 'center',
            textTransform: 'lowercase',
            color: '#ffffff',
            margin: 0,
            transform: 'translateY(-0.12em)',
          }}
        >
          uncommon
        </h1>

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 7.8vw, 110px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 0.92,
            textAlign: 'center',
            textTransform: 'lowercase',
            color: '#ffffff',
            margin: 0,
            marginTop: 'clamp(14px, 2.5vw, 40px)',
            opacity: 0.95,
          }}
        >
          institute of design
        </h2>
      </div>
    </>
  )
}

/* =========================================================================
   4. CORNER SCALE INDICATORS
   ========================================================================= */
function CornerScaleIndicators() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 28,
        left: 28,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        pointerEvents: 'none',
        opacity: 0.65,
      }}
    >
      <div style={{ width: 28, height: 1.5, background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
      <div style={{ width: 8, height: 1.5, background: 'rgba(255,255,255,0.45)', borderRadius: 1 }} />
      <div style={{ width: 8, height: 1.5, background: 'rgba(255,255,255,0.45)', borderRadius: 1 }} />
      <div style={{ width: 8, height: 1.5, background: 'rgba(255,255,255,0.45)', borderRadius: 1 }} />
      <div style={{ width: 8, height: 1.5, background: 'rgba(255,255,255,0.45)', borderRadius: 1 }} />
    </div>
  )
}

/* =========================================================================
   5. CURSOR AMBIENT GLOW
   ========================================================================= */
function CursorGlow({ glowRef }) {
  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,160,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 5,
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
        transition: 'left 0.12s ease-out, top 0.12s ease-out',
        mixBlendMode: 'screen',
      }}
    />
  )
}

/* =========================================================================
   6. MAIN CONSOLIDATED HERO COMPONENT
   ========================================================================= */
export default function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const glowRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const { innerWidth: W, innerHeight: H } = window
    mouseRef.current.x =  (e.clientX / W - 0.5) * 2
    mouseRef.current.y = -(e.clientY / H - 0.5) * 2

    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX}px`
      glowRef.current.style.top  = `${e.clientY}px`
    }
  }, [])

  return (
    <div
      onMouseMove={onMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#eee7df',
        padding: '14px',
        boxSizing: 'border-box',
        display: 'flex',
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
        {/* Layer 0: Dynamic Canvas Gradient Background */}
        <GradientCanvas />

        {/* Layer 1: Typography Overlay (UID — Uncommon Institute of Design) */}
        <BrandOverlay />

        {/* Layer 2: 3D Interactive WebGL Element */}
        <Suspense fallback={null}>
          <WebGLCanvas mouseRef={mouseRef} />
        </Suspense>

        {/* Layer 10: Subtle Corner Scale Indicators */}
        <CornerScaleIndicators />

        {/* Layer 20: Ambient Film Grain Texture */}
        <div
          className="noise"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'none',
            opacity: 0.16,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Layer 5: Cursor Follow Glow */}
      <CursorGlow glowRef={glowRef} />
    </div>
  )
}
