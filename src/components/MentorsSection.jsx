import './MentorsSection.css'

const mentors = [
  {
    id: 1,
    name: 'Anurag S',
    specialty: 'Design Mentor, UID',
    description:
      'Brings hands-on industry experience in product and interaction design, mentoring students to think like designers before they touch a tool.',
    image: '/222.png',
  },
  {
    id: 2,
    name: 'Henrich P',
    specialty: 'Design Mentor, UID',
    description:
      'Focused on building strong design fundamentals and real-world execution, guiding students from concept to confident creators',
    image: '/222.png',
  },
]

export default function MentorsSection() {
  return (
    <section className="mentors-section" id="mentors">
      <div className="mentors-container">
        {/* Eyebrow Section Tag */}
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
          Meet Your Mentors
        </div>

        {/* Section Headline */}
        <div className="mentors-header">
          <h2 className="mentors-headline">Learn from people who've actually done it.</h2>
        </div>

        {/* ── 2 Big Images in Single Row ── */}
        <div className="mentors-grid-2col">
          {mentors.map((mentor) => (
            <article key={mentor.id} className="mentor-big-card">
              {/* 1. Large Image Frame */}
              <div className="mentor-big-image-frame">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="mentor-big-image"
                  loading="lazy"
                />
              </div>

              {/* 2. Editorial Text Content Below Image */}
              <div className="mentor-big-content">
                <h3 className="mentor-big-name">{mentor.name}</h3>

                {/* Accent Tag Line with Icon */}
                <div className="mentor-big-tag">
                  <svg
                    width="16"
                    height="16"
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
                  <span>{mentor.specialty}</span>
                </div>

                {/* Description */}
                <p className="mentor-big-desc">{mentor.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
