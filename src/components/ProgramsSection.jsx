import './ProgramsSection.css'

const programs = [
  {
    id: '01',
    title: 'Design Engineer',
    tags: 'UI/UX Design · Interaction Design · Front-End Development',
    description:
      'For the ones who want to design it and build it. Learn to think like a designer and code like an engineer — the rare combo the industry is actually short on.',
    image: '/222.png',
  },
  {
    id: '02',
    title: 'Visual Design',
    tags: 'Graphic Design · Art · Illustration',
    description:
      'For the storytellers who think in color, shape, and composition. Master the craft of visual communication from brand identity to original illustration.',
    image: '/222.png',
  },
  {
    id: '03',
    title: 'Film Making',
    tags: 'Video Editing · Shooting · Camera Handling · Motion Graphics',
    description:
      'For the ones who see the world in frames. Learn to shoot, edit, and bring motion to your ideas — from raw footage to final cut.',
    image: '/222.png',
  },
]

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      style={{
        width: '100%',
        backgroundColor: '#eee7df',
        padding: 'clamp(60px, 8vw, 120px) clamp(16px, 4vw, 54px)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* ── Section Header ── */}
        <div
          style={{
            marginBottom: 'clamp(36px, 5vw, 64px)',
            maxWidth: '920px',
          }}
        >
          {/* Eyebrow Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#141414',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#ff6230',
                display: 'inline-block',
              }}
            />
            Our Programs
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 68px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: 'normal',
              color: '#141414',
              margin: '0 0 16px 0',
              padding: '0px',
              textAlign: 'start',
            }}
          >
            Pick your lane. Go all in.
          </h2>

          {/* Subtitle / Lead Paragraph */}
          <p
            style={{
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: 'clamp(16px, 1.4vw, 20px)',
              lineHeight: '1.55',
              fontWeight: 400,
              letterSpacing: 'normal',
              color: '#505050',
              margin: '0px',
              padding: '0px',
              textAlign: 'start',
              maxWidth: '820px',
            }}
          >
            Three programs. One uncommon method. Every program runs 3 months, fundamentals first, real projects from Day 1.
          </p>
        </div>

        {/* ── Programs Grid (Responsive via ProgramsSection.css) ── */}
        <div className="programs-grid">
          {programs.map((program) => (
            <article key={program.id} className="program-card">
              {/* 1. Large Static Image Frame */}
              <div className="program-image-frame">
                <img
                  src={program.image}
                  alt={program.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* 2. Text Content Below Image */}
              <div className="program-card-content">
                {/* Title */}
                <h3 className="program-card-title">
                  {program.title}
                </h3>

                {/* Accent Tag Line with Icon */}
                <div className="program-card-tags">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6230"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>{program.tags}</span>
                </div>

                {/* Description */}
                <p className="program-card-desc">
                  {program.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

