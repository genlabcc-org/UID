import { useState } from 'react'
import Hero from '../components/Hero'

const DISCIPLINES = [
  {
    code: '01',
    title: 'Spatial & Sensory Computing',
    desc: 'Volumetric interfaces, spatial typography, and ambient interactive devices shaping how humans experience digital environments.',
    tags: ['Three.js', 'VisionOS', 'Haptics', 'GLSL'],
  },
  {
    code: '02',
    title: 'Generative & Computational Form',
    desc: 'Procedural aesthetics, algorithmic architecture, and custom code tools that transcend conventional design software limits.',
    tags: ['Parametric', 'Creative Code', 'Python', 'Nodes'],
  },
  {
    code: '03',
    title: 'Synthetic Media & AI Direction',
    desc: 'Critique and creation with neural models, world-building pipelines, and speculative narratives for next-generation culture.',
    tags: ['Diffusion', 'LLM Worlds', 'Speculative Fiction'],
  },
  {
    code: '04',
    title: 'Tangible Physical Interfaces',
    desc: 'Biomaterials, micro-controllers, kinetic sculpture, and physical objects imbued with real-time computational behavior.',
    tags: ['Sensors', 'Bioplastics', 'Robotics', 'Circuits'],
  },
]

const FEATURED_WORKS = [
  {
    id: '01',
    title: 'Solstice Volumetric',
    student: 'Aria Chen (Class of ‘25)',
    category: 'Spatial Interaction',
    year: '2025',
    color: 'from-orange-500/20 to-pink-500/30',
  },
  {
    id: '02',
    title: 'Neural Topographies',
    student: 'Mateo Morales (Class of ‘25)',
    category: 'Computational Architecture',
    year: '2025',
    color: 'from-pink-500/20 to-purple-500/30',
  },
  {
    id: '03',
    title: 'Living Silicon Protocol',
    student: 'Yuki Tanaka (Class of ‘26)',
    category: 'Bio-Computing',
    year: '2026',
    color: 'from-purple-500/20 to-rose-500/30',
  },
  {
    id: '04',
    title: 'Chromatic Echo',
    student: 'Lukas Meyer (Class of ‘26)',
    category: 'Audio-Reactive Sculpture',
    year: '2026',
    color: 'from-rose-500/20 to-orange-500/30',
  },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div style={{ background: '#eee7df', minHeight: '100vh', width: '100%', color: '#161311' }}>
      {/* ── 1. Full-Screen Interactive 3D Hero ── */}
      <Hero />

      {/* ── 2. Manifesto / About Section ── */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '120px 24px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eb2c16' }} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(22,19,17,0.5)',
            }}
          >
            Manifesto · 2026
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 5.5vw, 76px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            maxWidth: '1080px',
            color: '#161311',
            margin: 0,
          }}
        >
          Design is no longer static. We educate visionary practitioners at the collision of{' '}
          <span style={{ color: '#eb2c16', textDecoration: 'underline', textUnderlineOffset: '8px' }}>
            spatial computing
          </span>
          , synthetic intelligence, and tactile craft.
        </h2>

        {/* Numbers Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginTop: 64,
            paddingTop: 48,
            borderTop: '1px solid rgba(22,19,17,0.12)',
          }}
        >
          {[
            { value: '18', label: 'Max Cohort Size', sub: 'Radically intimate studio model' },
            { value: '04', label: 'Core Disciplines', sub: 'From spatial code to biomaterials' },
            { value: '96%', label: 'Alumni Impact', sub: 'Founders, lab leads, creative directors' },
            { value: '1:1', label: 'Artist Mentorship', sub: 'Direct pairing with world pioneers' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(40px, 4vw, 56px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: '#eb2c16',
                  lineHeight: 1,
                }}
              >
                {item.value}
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#161311', marginTop: 4 }}>
                {item.label}
              </span>
              <span style={{ fontSize: 13, color: 'rgba(22,19,17,0.55)', lineHeight: 1.4 }}>
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Academic Disciplines ── */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '60px 24px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(22,19,17,0.5)',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Academic Curriculum
            </span>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Four Pillars of Uncommon Practice
            </h3>
          </div>
          <span style={{ fontSize: 14, color: 'rgba(22,19,17,0.6)', maxWidth: 320 }}>
            Curriculums are rewritten every semester to keep pace with algorithmic evolutions.
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {DISCIPLINES.map((item, i) => (
            <div
              key={item.code}
              onMouseEnter={() => setActiveTab(i)}
              style={{
                background: activeTab === i ? '#ffffff' : 'rgba(255,255,255,0.45)',
                borderRadius: 20,
                padding: '36px 30px',
                border: activeTab === i ? '1px solid rgba(235,44,22,0.3)' : '1px solid rgba(22,19,17,0.08)',
                boxShadow: activeTab === i ? '0 16px 40px rgba(235,44,22,0.08)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 280,
                cursor: 'pointer',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: '#eb2c16',
                    display: 'block',
                    marginBottom: 16,
                  }}
                >
                  DIR / {item.code}
                </span>
                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    margin: '0 0 12px',
                    color: '#161311',
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: 14, color: 'rgba(22,19,17,0.65)', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 24 }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: 'rgba(22,19,17,0.05)',
                      color: 'rgba(22,19,17,0.7)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Selected Student Lab Works ── */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '60px 24px 120px',
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(22,19,17,0.5)',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Archive & Prototypes
          </span>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Recent Works from UID Lab
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {FEATURED_WORKS.map((work) => (
            <div
              key={work.id}
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(22,19,17,0.08)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.03)'
              }}
            >
              {/* Graphic visual box */}
              <div
                style={{
                  height: 220,
                  background: 'linear-gradient(135deg, #eb2c16 0%, #d7269e 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent 60%)',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 64,
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.18)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {work.id}
                </span>
              </div>

              <div style={{ padding: '24px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#eb2c16', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {work.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(22,19,17,0.4)' }}>{work.year}</span>
                </div>
                <h4 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px', color: '#161311' }}>
                  {work.title}
                </h4>
                <p style={{ fontSize: 13, color: 'rgba(22,19,17,0.55)', margin: 0 }}>
                  {work.student}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Admissions Callout Card ── */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px 120px',
        }}
      >
        <div
          style={{
            borderRadius: 28,
            background: '#161311',
            color: '#ffffff',
            padding: ' clamp(40px, 6vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}
        >
          {/* Background ambient glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(235,44,22,0.4) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(60px)',
            }}
          />

          <div style={{ maxWidth: 640, position: 'relative', zIndex: 1 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#eb2c16',
                display: 'block',
                marginBottom: 16,
              }}
            >
              Admissions Open · Cohort 04
            </span>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 4.5vw, 60px)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                margin: '0 0 20px',
              }}
            >
              Ready to create the uncommon?
            </h3>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
              Applications are reviewed on a rolling basis. 18 candidates selected worldwide for the 9-month immersive physical and computational residency.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button
              style={{
                padding: '14px 34px',
                borderRadius: 100,
                background: '#eb2c16',
                color: '#fff',
                border: 'none',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.background = '#d92510'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = '#eb2c16'
              }}
            >
              Apply for Cohort 04 →
            </button>
            <button
              style={{
                padding: '14px 30px',
                borderRadius: 100,
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffffff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Download Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. Minimal Editorial Footer ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(22,19,17,0.1)',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '48px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#161311',
            }}
          >
            uid
          </span>
          <span style={{ fontSize: 12, color: 'rgba(22,19,17,0.5)', borderLeft: '1px solid rgba(22,19,17,0.15)', paddingLeft: 12 }}>
            Uncommon Institute of Design © 2026
          </span>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {['Curriculum', 'Faculty', 'Residency', 'Instagram', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(22,19,17,0.65)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#eb2c16')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(22,19,17,0.65)')}
            >
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
