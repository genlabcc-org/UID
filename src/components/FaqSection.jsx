import { useState } from 'react'

const faqData = [
  {
    question: 'Do I need a portfolio?',
    answer: 'Not for beginner programs. For advanced tracks, a few samples of your work help.',
  },
  {
    question: 'Are classes online, offline, or hybrid?',
    answer: 'Offline. Recorded sessions are not available for learners.',
  },
  {
    question: "What's the batch size?",
    answer: 'Small batches of 75 students so every learner gets personal mentor attention.',
  },
  {
    question: 'Can I switch programs after joining?',
    answer: 'Yes, within 1 month, subject to seat availability.',
  },
  {
    question: 'Do I need to be good at drawing?',
    answer: 'No. Design is about thinking and problem-solving; drawing skills help, but we teach the rest.',
  },
  {
    question: 'What kind of career paths can I pursue?',
    answer:
      'UI/UX designer, graphic designer, brand designer, motion designer, art director, freelancer, or start your own studio.',
  },
]

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState([0]) // First item open by default

  const toggleItem = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      id="faq"
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 'clamp(60px, 8vw, 120px) clamp(16px, 4vw, 54px)',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ── Section Header (Centered) ── */}
        <div
          style={{
            marginBottom: 'clamp(32px, 5vw, 54px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Eyebrow */}
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
            FAQ
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#141414',
              margin: '0px',
              padding: '0px',
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* ── FAQ List (Centered Container) ── */}
        <div
          style={{
            borderTop: '1px solid rgba(20, 20, 20, 0.12)',
            width: '100%',
          }}
        >
          {faqData.map((item, idx) => {
            const isOpen = openIndices.includes(idx)

            return (
              <div
                key={idx}
                style={{
                  borderBottom: '1px solid rgba(20, 20, 20, 0.12)',
                  width: '100%',
                }}
              >
                {/* Accordion Question Row */}
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(20px, 2.5vw, 30px) 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'start',
                    color: '#141414',
                    outline: 'none',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: 'clamp(18px, 1.9vw, 24px)',
                      fontWeight: 500,
                      lineHeight: '34px',
                      color: '#141414',
                      paddingRight: '24px',
                      flex: 1,
                    }}
                  >
                    {item.question}
                  </span>

                  {/* Toggle Chevron Icon */}
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#141414"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Accordion Answer Content */}
                <div
                  style={{
                    maxHeight: isOpen ? '280px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.25s ease',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                      fontSize: 'clamp(16px, 1.3vw, 19px)',
                      lineHeight: '30px',
                      fontWeight: 400,
                      color: '#505050',
                      margin: '0px 0px clamp(20px, 2.5vw, 30px) 0px',
                      padding: '0px',
                      maxWidth: '920px',
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
