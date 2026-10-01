import './MentorsSection.css'

const mentors = [
  {
    id: 1,
    name: 'Anurag S',
    role: 'Design Mentor, UID',
    description:
      'Brings hands-on industry experience in product and interaction design, mentoring students to think like designers before they touch a tool.',
    image: '/222.png',
    logos: '/shivi-logos.png',
  },
  {
    id: 2,
    name: 'Henrich P',
    role: 'Design Mentor, UID',
    description:
      'Focused on building strong design fundamentals and real-world execution, guiding students from concept to confident creators.',
    image: '/222.png',
    logos: '/surya-logos.png',
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
                <img
                  src={mentor.logos}
                  alt={`${mentor.name} client experience`}
                  className="mentor-logos-img"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

