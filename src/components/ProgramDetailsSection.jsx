import { useState, useEffect } from 'react'

const studioAddress = '121/C, Kottar–Parvathipuram Rd, Chetti Kulam, Simon Nagar, Nagercoil, Tamil Nadu 629001'
const studioDirectionsLink = 'https://www.google.com/maps/search/?api=1&query=121%2FC%2C+Kottar%E2%80%93Parvathipuram+Rd%2C+Chetti+Kulam%2C+Simon+Nagar%2C+Nagercoil%2C+Tamil+Nadu+629001'
const studioPhone = '+919994535121'
const studioPhoneDisplay = '+91 99945 35121'

const programsData = [
  {
    id: 'design-engineer',
    name: 'Design Engineer',
    startingPrice: '50,000',
    originalPrice: '75,000',
    location: 'Nagercoil',
    venue: studioAddress,
    venueLink: studioDirectionsLink,
    phone: studioPhoneDisplay,
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
    location: 'Nagercoil',
    venue: studioAddress,
    venueLink: studioDirectionsLink,
    phone: studioPhoneDisplay,
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
    location: 'Nagercoil',
    venue: studioAddress,
    venueLink: studioDirectionsLink,
    phone: studioPhoneDisplay,
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

/**
 * Film grain overlay — tactile risograph / film noise matching Hero and Footer.
 */
function ProgramGrain() {
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

  return (
    <>
      {grainUrl && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${grainUrl})`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay',
              opacity: 0.55,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${grainUrl})`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'color-burn',
              opacity: 0.22,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </>
      )}
      {/* SVG fractal noise overlay matching Hero */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          opacity: 0.28,
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default function ProgramDetailsSection() {
  const [selectedProgramId, setSelectedProgramId] = useState('design-engineer')

  const currentProgram =
    programsData.find((p) => p.id === selectedProgramId) || programsData[0]

  return (
    <section
      id="program-details"
      style={{
        padding: '0 14px 28px',
        boxSizing: 'border-box',
        width: '100%',
        background: '#ffffff',
      }}
    >
      {/* ── Main Rounded Card with Side Gaps (Matching Footer treatment) ── */}
      <div
        style={{
          width: '100%',
          borderRadius: '26px',
          overflow: 'hidden',
          position: 'relative',
          padding: 'clamp(36px, 5.8vw, 78px) clamp(20px, 4vw, 64px)',
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
        {/* Film grain noise overlay */}
        <ProgramGrain />

        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Section Headline & Subtitle */}
          <div style={{ marginBottom: 'clamp(20px, 3vw, 32px)' }}>
            <h2
              style={{
                fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                fontSize: 'clamp(32px, 5vw, 68px)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#ffffff',
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
                color: '#ffffff',
                margin: 0,
                padding: 0,
                textAlign: 'start',
              }}
            >
              Get the basics right. Enter the industry with confidence.
            </p>
          </div>

          {/* ── Details Content (No blur, no borders) ── */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              border: 'none',
              padding: 'clamp(20px, 2.8vw, 32px) clamp(22px, 3vw, 36px)',
              boxSizing: 'border-box',
              width: '100%',
              /* Removed blur effect per request */
            }}
          >
            {/* Status Badge */}
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#ff4433',
                    display: 'inline-block',
                    boxShadow: '0 0 8px rgba(255, 68, 51, 0.8)',
                  }}
                />
                {currentProgram.status}
              </span>
            </div>

            {/* 3-Column Grid (No dividing borders) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.2fr 0.9fr',
                gap: 'clamp(20px, 3vw, 40px)',
                alignItems: 'start',
              }}
            >
              {/* ── Column 1: When & Where ── */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: 'none',
                  borderRight: 'none',
                  paddingRight: 'clamp(10px, 1.5vw, 20px)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: '22px',
                    marginBottom: '18px',
                  }}
                >
                  When & Where
                </div>

                {/* Location icon + city */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  {/* Location pin icon circle */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: 'clamp(20px, 2vw, 26px)',
                      lineHeight: 1.25,
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {currentProgram.location}
                  </h3>
                </div>

                {/* Subtext */}
                <p
                  style={{
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontWeight: 400,
                    color: '#ffffff',
                    margin: '0 0 12px 0',
                  }}
                >
                  {currentProgram.statusSubtext}
                </p>

                {/* Venue link with arrow */}
                <a
                  href={currentProgram.venueLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontWeight: 400,
                    color: '#ffffff',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    textDecorationColor: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  UID Design Studio, Nagercoil
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* ── Column 2: Mentors ── */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: 'none',
                  borderRight: 'none',
                  paddingLeft: 'clamp(10px, 1.5vw, 20px)',
                  paddingRight: 'clamp(10px, 1.5vw, 20px)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: '22px',
                    marginBottom: '18px',
                  }}
                >
                  Mentors
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: 'clamp(24px, 3vw, 40px)',
                    flexWrap: 'wrap',
                  }}
                >
                  {currentProgram.mentors.map((mentor, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '110px',
                      }}
                    >
                      {/* Mentor Image — circular without border */}
                      <div
                        style={{
                          width: '68px',
                          height: '68px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          marginBottom: '10px',
                          border: 'none',
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
                          }}
                        />
                      </div>

                      <div
                        style={{
                          fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                          fontSize: '15px',
                          lineHeight: '21px',
                          fontWeight: 600,
                          color: '#ffffff',
                          marginBottom: '2px',
                        }}
                      >
                        {mentor.name}
                      </div>

                      <div
                        style={{
                          fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                          fontSize: '13px',
                          lineHeight: '19px',
                          fontWeight: 400,
                          color: '#ffffff',
                        }}
                      >
                        {mentor.role}
                        <br />
                        <span style={{ color: '#ffffff', fontWeight: 600 }}>
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
                  paddingLeft: 'clamp(10px, 1.5vw, 20px)',
                  height: '100%',
                  border: 'none',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: '22px',
                      marginBottom: '18px',
                    }}
                  >
                    Pricing
                  </div>

                  {/* Price Display */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      marginBottom: '4px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                        fontSize: 'clamp(26px, 2.8vw, 34px)',
                        lineHeight: '40px',
                        fontWeight: 700,
                        color: '#ffffff',
                      }}
                    >
                      ₹{currentProgram.startingPrice}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#ffffff',
                        opacity: 0.75,
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
                      fontSize: '12px',
                      lineHeight: '18px',
                      fontWeight: 400,
                      color: '#ffffff',
                      marginBottom: '22px',
                    }}
                  >
                    (Early bird registration)*inclusive of GST
                  </div>
                </div>

                {/* Register Button */}
                <div>
                  <a
                    href="#faq"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#ffffff',
                      color: '#141414',
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: '15px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      padding: '13px 32px',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fdf8f4'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.22)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <span>Register Now</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
