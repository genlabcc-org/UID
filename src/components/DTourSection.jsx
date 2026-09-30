export default function DTourSection() {
  return (
    <section
      id="dtour"
      style={{
        width: '100%',
        backgroundColor: '#eee7df',
        padding: 'clamp(60px, 9vw, 130px) clamp(16px, 4vw, 54px)',
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
            marginBottom: 'clamp(28px, 4vw, 44px)',
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
          D.Tour
        </div>

        {/* ── Two Column Editorial Grid (Matching Reference Layout) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(36px, 6vw, 100px)',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          {/* ── Left Column: Headline + Theme-Matched Button ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(32px, 5vw, 64px)',
            }}
          >
            {/* Main Headline */}
            <h2
              style={{
                fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                fontSize: 'clamp(32px, 6vw, 76px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#141414',
                margin: 0,
                padding: 0,
                textAlign: 'start',
              }}
            >
              Design On The Move
            </h2>

            {/* Theme-Matched Button (No purple, no arrows) */}
            <div>
              <a
                href="#dtour"
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
                  padding: '14px 32px',
                  borderRadius: '999px',
                  border: 'none',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2c2c2c'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#141414'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Explore More
              </a>
            </div>
          </div>

          {/* ── Right Column: Subtitle + Description (No arrows) ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop: '6px',
            }}
          >
            {/* Subtitle */}
            <h3
              style={{
                fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                fontSize: 'clamp(20px, 2.5vw, 34px)',
                fontWeight: 600,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: '#141414',
                margin: '0 0 18px 0',
                padding: 0,
                textAlign: 'start',
              }}
            >
              4 field visits. Every month. Zero classroom walls.
            </h3>

            {/* Body Paragraph */}
            <p
              style={{
                fontFamily: "'Articulat CF', 'Articulatcf', sans-serif",
                fontSize: 'clamp(15px, 1.4vw, 20px)',
                lineHeight: '1.6',
                fontWeight: 400,
                letterSpacing: 'normal',
                wordSpacing: '0px',
                color: '#505050',
                margin: 0,
                padding: 0,
                textAlign: 'start',
                maxWidth: '640px',
              }}
            >
              Design doesn't only live on a screen it lives in nature, architecture, street art, and everyday life. Every month, we step out on D.Tour: four field visits designed to make you see differently, not just work differently. Inspiration first, execution after.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
