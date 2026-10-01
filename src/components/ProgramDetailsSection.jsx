import { useState, useEffect } from 'react'
import './ProgramDetailsSection.css'

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

export default function ProgramDetailsSection({ onRegister }) {
  const [selectedProgramId, setSelectedProgramId] = useState('design-engineer')

  const currentProgram =
    programsData.find((p) => p.id === selectedProgramId) || programsData[0]

  return (
    <section id="program-details" className="program-details-section">
      {/* ── Main Rounded Card with Side Gaps (Matching Footer treatment) ── */}
      <div className="program-details-card">
        {/* Film grain noise overlay */}
        <ProgramGrain />

        <div className="program-details-container">
          {/* Section Headline & Subtitle */}
          <div className="program-details-header">
            <h2 className="program-details-title">
              Program details
            </h2>
            <p className="program-details-subtitle">
              Get the basics right. Enter the industry with confidence.
            </p>
          </div>

          {/* ── Details Content Box (Border-free, blur-free) ── */}
          <div className="program-details-content-box">
            {/* Status Badge */}
            <div className="program-status-wrap">
              <span className="program-status-badge">
                <span className="program-status-dot" />
                {currentProgram.status}
              </span>
            </div>

            {/* Responsive Grid */}
            <div className="program-details-grid">
              {/* ── Column 1: When & Where ── */}
              <div className="program-col">
                <div className="program-col-title">
                  When & Where
                </div>

                {/* Location icon + city */}
                <div className="program-location-row">
                  <div className="program-location-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="program-location-name">
                    {currentProgram.location}
                  </h3>
                </div>

                {/* Subtext */}
                <p className="program-subtext">
                  {currentProgram.statusSubtext}
                </p>

                {/* Venue link with arrow */}
                <a
                  href={currentProgram.venueLink}
                  target="_blank"
                  rel="noreferrer"
                  className="program-venue-link"
                >
                  UID Design Studio, Nagercoil
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* ── Column 2: Mentors ── */}
              <div className="program-col">
                <div className="program-col-title">
                  Mentors
                </div>

                <div className="program-mentors-list">
                  {currentProgram.mentors.map((mentor, i) => (
                    <div key={i} className="program-mentor-item">
                      <div className="program-mentor-avatar">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                        />
                      </div>

                      <div className="program-mentor-name">
                        {mentor.name}
                      </div>

                      <div className="program-mentor-role">
                        {mentor.role}
                        <br />
                        <span className="program-mentor-org">
                          {mentor.org}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Column 3: Pricing & Action ── */}
              <div className="program-pricing-col">
                <div>
                  <div className="program-col-title">
                    Pricing
                  </div>

                  {/* Price Display */}
                  <div className="program-price-row">
                    <span className="program-price-current">
                      ₹{currentProgram.startingPrice}
                    </span>
                    <span className="program-price-original">
                      ₹{currentProgram.originalPrice}
                    </span>
                  </div>

                  {/* Pricing Disclaimer */}
                  <div className="program-pricing-disclaimer">
                    (Early bird registration)*inclusive of GST
                  </div>
                </div>

                {/* Register Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => onRegister && onRegister(currentProgram.id)}
                    className="program-register-btn"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
