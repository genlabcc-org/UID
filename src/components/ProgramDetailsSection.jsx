import { useState } from 'react'

const programsData = [
  {
    id: 'design-engineer',
    name: 'Design Engineer',
    startingPrice: '50,000',
    originalPrice: '75,000',
    location: 'Chennai',
    venue: 'UID Design Studio, Chennai',
    venueLink: '#',
    status: 'Upcoming batch',
    statusSubtext: 'New batch starts soon',
    mentors: [
      {
        name: 'Shivi Ravisankar',
        role: 'Associate UX Lead',
        org: '@ UID',
        image: '/222.png',
      },
      {
        name: 'Surya Prakashan',
        role: 'Senior UI Engineer',
        org: '@ UID',
        image: '/222.png',
      },
    ],
  },
  {
    id: 'visual-design',
    name: 'Visual design',
    startingPrice: '50,000',
    originalPrice: '75,000',
    location: 'Chennai',
    venue: 'UID Design Studio, Chennai',
    venueLink: '#',
    status: 'Upcoming batch',
    statusSubtext: 'New batch starts soon',
    mentors: [
      {
        name: 'Rohit Dhongade',
        role: 'Creative Director',
        org: '@ UID',
        image: '/222.png',
      },
      {
        name: 'Anisha Khiyani',
        role: 'Visual Lead',
        org: '@ UID',
        image: '/222.png',
      },
    ],
  },
  {
    id: 'film-making',
    name: 'Film making',
    startingPrice: '50,000',
    originalPrice: '75,000',
    location: 'Chennai',
    venue: 'UID Design Studio, Chennai',
    venueLink: '#',
    status: 'Upcoming batch',
    statusSubtext: 'New batch starts soon',
    mentors: [
      {
        name: 'Karthik Raja',
        role: 'Lead Cinematographer',
        org: '@ UID',
        image: '/222.png',
      },
      {
        name: 'Aditya Verma',
        role: 'Motion Director',
        org: '@ UID',
        image: '/222.png',
      },
    ],
  },
]

export default function ProgramDetailsSection() {
  const [selectedProgramId, setSelectedProgramId] = useState('design-engineer')

  const currentProgram =
    programsData.find((p) => p.id === selectedProgramId) || programsData[0]

  return (
    <section
      id="program-details"
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
          Program Details
        </div>

        {/* Section Headline & Subtitle */}
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <h2
            style={{
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: 'clamp(30px, 5vw, 68px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: 'normal',
              color: '#141414',
              margin: '0 0 16px 0',
              padding: 0,
              textAlign: 'start',
            }}
          >
            Program details
          </h2>
          <p
            style={{
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: 'clamp(16px, 1.4vw, 20px)',
              lineHeight: '1.55',
              fontWeight: 400,
              letterSpacing: 'normal',
              color: '#505050',
              margin: 0,
              padding: 0,
              textAlign: 'start',
            }}
          >
            Get the basics right. Enter the industry with confidence.
          </p>
        </div>

        {/* ── Very Minimal Program Tabs (No white background, text-first) ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          {programsData.map((prog) => {
            const isSelected = prog.id === currentProgram.id
            return (
              <button
                key={prog.id}
                type="button"
                onClick={() => setSelectedProgramId(prog.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '999px',
                  backgroundColor: isSelected ? '#141414' : 'transparent',
                  color: isSelected ? '#ffffff' : '#141414',
                  border: isSelected
                    ? '1px solid #141414'
                    : '1px solid rgba(20, 20, 20, 0.16)',
                  cursor: 'pointer',
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: '15px',
                  fontWeight: isSelected ? 500 : 400,
                  transition: 'all 0.2s ease',
                  outline: 'none',
                }}
              >
                <span>{prog.name}</span>
                <span
                  style={{
                    fontSize: '13px',
                    color: isSelected ? '#ff9a7b' : '#505050',
                    fontWeight: 400,
                  }}
                >
                  starting at ₹{prog.startingPrice}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Details Container (No white background, minimal border) ── */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'transparent',
            borderRadius: '0px',
            borderTop: '1px solid rgba(20, 20, 20, 0.14)',
            borderBottom: '1px solid rgba(20, 20, 20, 0.14)',
            padding: 'clamp(36px, 5vw, 60px) 0',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          {/* Subtle Tag Line (Matching orange style in Program section) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              color: '#ff6230',
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: '15px',
              lineHeight: '22px',
              fontWeight: 500,
              letterSpacing: 'normal',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ff6230',
              }}
            />
            <span>{currentProgram.status} — {currentProgram.statusSubtext}</span>
          </div>

          {/* 3 Column Minimal Content Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'start',
            }}
          >
            {/* ── Column 1: When & Where ── */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#ff6230',
                  lineHeight: '22px',
                  marginBottom: '10px',
                }}
              >
                When &amp; Where
              </div>

              {/* City Title */}
              <h3
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: 'clamp(22px, 2.2vw, 28px)',
                  lineHeight: 1.25,
                  fontWeight: 500,
                  color: '#141414',
                  margin: '0 0 8px 0',
                  padding: 0,
                  textAlign: 'start',
                }}
              >
                {currentProgram.location}
              </h3>

              {/* Venue Link with clean styling */}
              <a
                href={currentProgram.venueLink}
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: 'clamp(15px, 1.4vw, 19px)',
                  lineHeight: '26px',
                  fontWeight: 400,
                  color: '#505050',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              >
                {currentProgram.venue}
                <span style={{ fontSize: '16px' }}>↗</span>
              </a>
            </div>

            {/* ── Column 2: Mentors ── */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#ff6230',
                  lineHeight: '22px',
                  marginBottom: '14px',
                }}
              >
                Mentors
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 'clamp(16px, 3vw, 36px)',
                  flexWrap: 'wrap',
                }}
              >
                {currentProgram.mentors.map((mentor, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1 1 130px',
                      maxWidth: '170px',
                    }}
                  >
                    {/* Mentor Image (222.png with soft rounded corners) */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                        backgroundColor: '#e6ded4',
                      }}
                    >
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          borderRadius: '14px',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                        fontSize: '18px',
                        lineHeight: '24px',
                        fontWeight: 500,
                        color: '#141414',
                        marginBottom: '4px',
                      }}
                    >
                      {mentor.name}
                    </div>

                    <div
                      style={{
                        fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                        fontSize: '15px',
                        lineHeight: '22px',
                        fontWeight: 400,
                        color: '#505050',
                      }}
                    >
                      {mentor.role}
                      <br />
                      <span style={{ color: '#141414', fontWeight: 500 }}>
                        {mentor.org}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Column 3: Pricing & Action ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100%',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#ff6230',
                    lineHeight: '22px',
                    marginBottom: '10px',
                  }}
                >
                  Pricing
                </div>

                {/* Price Display */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '4px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: '32px',
                      lineHeight: '38px',
                      fontWeight: 500,
                      color: '#141414',
                    }}
                  >
                    ₹{currentProgram.startingPrice}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#8c8c8c',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{currentProgram.originalPrice}
                  </span>
                </div>

                {/* Pricing Disclaimer */}
                <div
                  style={{
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 400,
                    color: '#505050',
                    marginBottom: '24px',
                  }}
                >
                  (Early bird registration)*inclusive of GST
                </div>
              </div>

              {/* Theme-Matched Register Button */}
              <div>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#141414',
                    color: '#ffffff',
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '14px 34px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2c2c2c'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#141414'
                  }}
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
