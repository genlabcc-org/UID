import './MentorsSection.css'

const mentors = [
  {
    id: 1,
    name: 'Anurag S.S',
    role: 'Design Mentor, UID',
    description:
      'Brings hands-on industry experience in product and interaction design, mentoring students to think like designers before they touch a tool.',
    image: '/Anurage Sir.png',
    logos: [
      '/IBM-Logo.png',
      '/Infosys-Logo.png',
      '/Mercedes Benz.png',
      '/logo1.png',
      '/mark9.png',
    ],
  },
  {
    id: 2,
    name: 'Henrich P',
    role: 'Design Mentor, UID',
    description:
      'Focused on building strong design fundamentals and real-world execution, guiding students from concept to confident creators.',
    image: '/Henrich Sir.png',
    logos: [
      '/deloitte.jpg',
      '/logo1.png',
      '/mark9.png',
    ],
  },
]

export default function MentorsSection() {
  return (
    <section className="mentors-section" id="mentors">
      <div className="mentors-container">
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
          Mentors
        </div>

        {/* Section Headline */}
        <h2 className="mentors-title">Meet your Mentors</h2>

        {/* ── 2 Mentor Cards Grid ── */}
        <div className="mentors-grid">
          {mentors.map((mentor) => (
            <article key={mentor.id} className="mentor-card">
              {/* Header: Avatar + Info */}
              <div className="mentor-header">
                <div className="mentor-avatar-wrap">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="mentor-avatar-img"
                    loading="lazy"
                  />
                </div>
                <div className="mentor-meta">
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <p className="mentor-role">{mentor.role}</p>
                </div>
              </div>

              {/* Bio description */}
              <p className="mentor-bio">{mentor.description}</p>

              {/* Company / Client Experience Logos */}
              <div className="mentor-logos-wrap">
                {mentor.logos.map((logo, idx) => (
                  <div key={idx} className="mentor-logo-item">
                    <img
                      src={logo}
                      alt={`${mentor.name} client logo ${idx + 1}`}
                      className={`mentor-logo-img ${logo.includes('deloitte') ? 'logo-deloitte' : ''} ${logo.includes('mark9') ? 'logo-mark9' : ''} ${logo.includes('logo1') ? 'logo-circle' : ''} ${logo.includes('Mercedes') ? 'logo-mercedes' : ''}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

