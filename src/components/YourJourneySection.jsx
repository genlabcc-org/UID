import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './YourJourneySection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeavyGrain — procedural stochastic film grain generator.
 * Creates an authentic, tactile risograph / film noise texture matching the footer.
 */
function HeavyGrain() {
  const [grainUrl, setGrainUrl] = useState('');

  useEffect(() => {
    const size = 180;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r1 = Math.random();
      const r2 = Math.random();
      const val = Math.floor(((r1 + r2) / 2) * 255);

      const contrast = val > 128 ? Math.min(255, val + 32) : Math.max(0, val - 32);

      data[i] = contrast;
      data[i + 1] = contrast;
      data[i + 2] = contrast;
      data[i + 3] = Math.floor(Math.random() * 95 + 55);
    }

    ctx.putImageData(imgData, 0, 0);
    setGrainUrl(canvas.toDataURL());
  }, []);

  if (!grainUrl) return null;

  return (
    <>
      {/* 1. Primary Grain (Overlay) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          opacity: 0.52,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* 2. Soft Ink Tooth (Color-Burn) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'color-burn',
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* 3. Subtle Highlights (Screen) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${grainUrl})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'screen',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
}

// Card 1: Warm Flame & Crimson / Rose-Violet
const card1Bg = `
  radial-gradient(ellipse at 12% 45%, rgba(255, 45, 15, 1) 0%, rgba(255, 80, 25, 0.95) 28%, transparent 55%),
  radial-gradient(ellipse at 88% 95%, rgba(255, 160, 95, 0.9) 0%, rgba(245, 120, 75, 0.45) 24%, transparent 50%),
  radial-gradient(ellipse at 82% 18%, rgba(220, 110, 245, 0.6) 0%, transparent 45%),
  linear-gradient(105deg, #eb240d 0%, #ee3a1a 22%, #ba3065 52%, #8e2b7a 78%, #782070 100%)
`;

// Card 2: Electric Indigo & Royal Violet / Neon Magenta
const card2Bg = `
  radial-gradient(ellipse at 12% 45%, rgba(105, 40, 245, 1) 0%, rgba(85, 25, 230, 0.96) 28%, transparent 55%),
  radial-gradient(ellipse at 88% 95%, rgba(245, 75, 165, 0.85) 0%, rgba(215, 55, 140, 0.45) 25%, transparent 50%),
  radial-gradient(ellipse at 82% 18%, rgba(90, 175, 255, 0.65) 0%, transparent 45%),
  linear-gradient(105deg, #4815e8 0%, #581ee2 22%, #7429c6 50%, #9826ab 78%, #b82292 100%)
`;

// Card 3: Signature UID Sunset Blend (Red-Orange through Violet)
const card3Bg = `
  radial-gradient(ellipse at 10% 45%, rgba(235, 44, 22, 1) 0%, rgba(240, 70, 30, 0.96) 26%, transparent 55%),
  radial-gradient(ellipse at 88% 96%, rgba(245, 150, 115, 0.9) 0%, rgba(240, 140, 105, 0.45) 24%, transparent 50%),
  radial-gradient(ellipse at 85% 15%, rgba(185, 130, 245, 0.65) 0%, transparent 45%),
  linear-gradient(105deg, #eb2c16 0%, #e2351f 16%, #7a4eb8 40%, #764db5 68%, #855ec7 100%)
`;

const dtourCards = [
  {
    id: 1,
    step: '01',
    word: 'Month 1',
    subtitle: 'Fundamentals first.',
    description:
      'Unlearn old habits, understand the core concepts of your chosen field, and get inspired straight from the source through our field visits, the D.Tour.',
    background: card1Bg,
  },
  {
    id: 2,
    step: '02',
    word: 'Month 2',
    subtitle: 'Tools, in your hands.',
    description:
      'Get fluent in every tool of your trade. This is where concepts become muscle memory — practice, iterate, repeat.',
    background: card2Bg,
  },
  {
    id: 3,
    step: '03',
    word: 'Month 3',
    subtitle: 'Become the expert.',
    description:
      'Go deep in your chosen program. Sharpen your craft, build your portfolio, and step out ready for the industry not just familiar with it.',
    background: card3Bg,
  },
];

export default function YourJourneySection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stageRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);

  useEffect(() => {
    if (!stageRef.current || !slide1Ref.current || !slide2Ref.current || !slide3Ref.current) return;

    const siteHeader = document.querySelector('.site-header-container');
    const hideSiteHeader = () => siteHeader?.classList.add('header-hidden');
    const showSiteHeader = () => siteHeader?.classList.remove('header-hidden');

    const mm = gsap.matchMedia();

    // ── Desktop (> 860px): Pinned Glide Over Stack ──
    mm.add('(min-width: 861px)', () => {
      // Set initial positions: upcoming slides start below and slide up
      gsap.set(slide2Ref.current, { yPercent: 100 });
      gsap.set(slide3Ref.current, { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'center center',
          end: '+=1800',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onEnter: hideSiteHeader,
          onLeave: showSiteHeader,
          onEnterBack: hideSiteHeader,
          onLeaveBack: showSiteHeader,
        },
      });

      // Synchronize trigger to hide navbar while in stage
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80px',
        end: () => (tl.scrollTrigger ? tl.scrollTrigger.end : 'bottom top'),
        onEnter: hideSiteHeader,
        onLeave: showSiteHeader,
        onEnterBack: hideSiteHeader,
        onLeaveBack: showSiteHeader,
      });

      // Header fades slightly as stage pins
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            autoAlpha: 0,
            y: -30,
            duration: 0.3,
            ease: 'power1.out',
          },
          0
        );
      }

      // Slide 1 zooms out as Slide 2 glides up into place
      tl.to(slide1Ref.current, { scale: 0.95, duration: 1, ease: 'power1.inOut' }, 0)
        .to(slide2Ref.current, { yPercent: 0, duration: 1, ease: 'power1.inOut' }, 0)

      // Slide 2 zooms out as Slide 3 glides up into place
        .to(slide2Ref.current, { scale: 0.95, duration: 1, ease: 'power1.inOut' }, 1)
        .to(slide3Ref.current, { yPercent: 0, duration: 1, ease: 'power1.inOut' }, 1);
    });

    // ── Mobile (<= 860px): Natural Flow Without Pin-Trap ──
    mm.add('(max-width: 860px)', () => {
      showSiteHeader();
      gsap.set([slide1Ref.current, slide2Ref.current, slide3Ref.current], {
        clearProps: 'all',
      });
    });

    return () => {
      mm.revert();
      showSiteHeader();
    };
  }, []);

  const slideRefs = [slide1Ref, slide2Ref, slide3Ref];

  return (
    <section id="your-journey" ref={sectionRef} className="dtour-section">
      <div className="dtour-container">
        {/* ── Centered Header ── */}
        <div ref={headerRef} className="dtour-header">
          {/* Eyebrow Label */}
          <div className="dtour-eyebrow">
            <span className="dtour-eyebrow-dot" />
            Your Journey
          </div>

          <h2 className="dtour-headline">Your Journey</h2>

          <h3 className="dtour-subtitle">
            4 field visits. Every month. Zero classroom walls.
          </h3>

          <p className="dtour-description">
            Design doesn't only live on a screen — it lives in nature,
            architecture, street art, and everyday life. Every month, we step out
            on D.Tour: four field visits designed to make you see differently, not
            just work differently. Inspiration first, execution after.
          </p>

          <a href="#your-journey" className="dtour-btn">
            Explore More
          </a>
        </div>

        {/* ── Scroll-Based Pinned Frame Stage: 3 Vibrant Month Cards ── */}
        <div ref={stageRef} className="dtour-frame-stage">
          {dtourCards.map((card, index) => (
            <div
              key={card.id}
              ref={slideRefs[index]}
              className={`dtour-stage-slide dtour-slide-${card.id}`}
            >
              <div
                className="dtour-vibrant-card"
                style={{ background: card.background }}
              >
                {/* Tactile film noise grain matching footer */}
                <HeavyGrain />

                {/* Top: Your Journey tag & step */}
                <div className="dtour-card-top">
                  <div className="dtour-card-month-tag">
                    <span>Your Journey</span>
                  </div>
                  <span className="dtour-card-step">{card.step} / 03</span>
                </div>

                {/* Center: Main word & Subhead */}
                <div className="dtour-card-center">
                  <h3 className="dtour-card-word">{card.word}</h3>
                  <h4 className="dtour-card-subhead">{card.subtitle}</h4>
                </div>

                {/* Bottom: Description */}
                <div className="dtour-card-bottom">
                  <p className="dtour-card-desc">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
