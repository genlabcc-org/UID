import './WhyUidSection.css';

const pillars = [
  {
    num: '01',
    title: 'Hands-on, always',
    description:
      'Learn by doing, not by watching. Every session is a workshop, not a lecture.',
  },
  {
    num: '02',
    title: 'Real client projects from Day 1',
    description:
      "You're not designing hypothetical apps. You're solving real briefs for real clients from week one.",
  },
  {
    num: '03',
    title: 'Community over classroom',
    description:
      "You'll build alongside other Gen Z creators, not sit alone in front of a screen.",
  },
  {
    num: '04',
    title: 'Feedback, constantly',
    description:
      'Mentors are in the room, not in a video. Ask, iterate, improve instantly.',
  },
];

export default function WhyUidSection() {
  return (
    <section
      id="why-uid"
      style={{
        width: '100%',
        backgroundColor: '#eee7df',
        padding: 'clamp(64px, 8vw, 130px) clamp(16px, 4vw, 54px)',
        boxSizing: 'border-box',
      }}
    >
      {/* Anchor for journey navigation fallback */}
      <div id="journey" style={{ position: 'relative', top: '-80px' }} />

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* ── Section Header (Styled like the reference image) ── */}
        <div
          style={{
            marginBottom: 'clamp(44px, 6vw, 76px)',
            maxWidth: '100%',
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
              marginBottom: '18px',
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
            Why UID is Different
          </div>

          {/* Large Punchy Headline strictly in 2 lines on desktop, wraps cleanly on mobile */}
          <h2 className="why-uid-headline">
            <span className="headline-line-1">No long lectures. No recorded videos.</span>
            <br />
            <span className="headline-line-2">No boring.</span>
          </h2>

          {/* Subtitle / Lead Paragraph */}
          <p
            style={{
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: 'clamp(16px, 1.4vw, 20px)',
              lineHeight: '1.55',
              fontWeight: 400,
              letterSpacing: 'normal',
              color: '#555555',
              margin: '0px',
              padding: '0px',
              textAlign: 'start',
              maxWidth: '820px',
            }}
          >
            UID is built from the ground up to dismantle traditional design education.
            Everything begins with real work, real mentors, and real accountability from Day 1.
          </p>
        </div>

        {/* ── 4 Pillars Grid (Minimalist Editorial Columns — No Boxes) ── */}
        <div className="why-uid-pillars-grid">
          {pillars.map((item) => (
            <div
              key={item.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
              }}
            >
              {/* Number Index */}
              <div
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#ff6230',
                  marginBottom: '14px',
                }}
              >
                {item.num} /
              </div>

              {/* Pillar Title */}
              <h3
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: 'clamp(20px, 1.6vw, 24px)',
                  fontWeight: 600,
                  lineHeight: '1.25',
                  letterSpacing: '-0.015em',
                  color: '#141414',
                  margin: '0 0 12px 0',
                }}
              >
                {item.title}
              </h3>

              {/* Pillar Description */}
              <p
                style={{
                  fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                  fontSize: '15px',
                  lineHeight: '1.65',
                  fontWeight: 400,
                  color: '#555555',
                  margin: '0px',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
