import { useState } from 'react';
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

/* Accent color for each card */
const popColors = ['#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function WhyUidSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="why-uid"
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
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
        {/* ── Section Header ── */}
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

        {/* ── 4 Pillars Grid — Hover-activated Cards with Color Pop ── */}
        <div className="why-uid-pillars-grid">
          {pillars.map((item, index) => {
            const isActive = hoveredIndex === index;
            const accentColor = popColors[index];

            return (
              <div
                key={item.num}
                className="why-uid-card-wrapper"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ height: '100%' }}
              >
                {/* Background colored layer — peeks out from behind on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '18px',
                    backgroundColor: accentColor,
                    transform: isActive
                      ? 'rotate(-3deg) translate(-5px, 6px)'
                      : 'rotate(0deg) translate(0, 0)',
                    opacity: isActive ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: 0,
                  }}
                />

                {/* 3 sparkle rays — top-right, fanning from one origin */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-28px',
                    right: '16px',
                    zIndex: 3,
                    pointerEvents: 'none',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    transitionDelay: isActive ? '0.08s' : '0s',
                  }}
                >
                  {/* Left ray  \  — angled far left */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '14px',
                      width: '5px',
                      height: '18px',
                      borderRadius: '3px',
                      backgroundColor: '#f0b429',
                      transform: isActive
                        ? 'rotate(-35deg) scaleY(1)'
                        : 'rotate(-35deg) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: isActive ? '0.1s' : '0s',
                    }}
                  />
                  {/* Middle ray — slight lean right */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '4px',
                      width: '5px',
                      height: '20px',
                      borderRadius: '3px',
                      backgroundColor: '#f0b429',
                      transform: isActive
                        ? 'rotate(5deg) scaleY(1)'
                        : 'rotate(5deg) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: isActive ? '0.18s' : '0s',
                    }}
                  />
                  {/* Right ray  / — angled far right */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '-8px',
                      width: '5px',
                      height: '18px',
                      borderRadius: '3px',
                      backgroundColor: '#f0b429',
                      transform: isActive
                        ? 'rotate(40deg) scaleY(1)'
                        : 'rotate(40deg) scaleY(0)',
                      transformOrigin: 'center bottom',
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: isActive ? '0.26s' : '0s',
                    }}
                  />
                </div>

                {/* Main Card */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    boxSizing: 'border-box',
                    backgroundColor: '#faf8f5',
                    border: isActive
                      ? `2.5px solid ${accentColor}`
                      : '2px solid rgba(20, 20, 20, 0.08)',
                    borderRadius: '16px',
                    padding: 'clamp(24px, 3vw, 36px)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: isActive
                      ? `0 6px 24px ${accentColor}20`
                      : '0 1px 4px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Number Index */}
                  <div
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: isActive ? accentColor : '#ff6230',
                      marginBottom: '14px',
                      transition: 'color 0.3s ease',
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
