import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DTourSection.css';

gsap.registerPlugin(ScrollTrigger);

// Split text into character spans for 3D flip-in and flip-out stagger animation (matching ProgramsSection)
function SplitText({ text, className }) {
  return (
    <span className={className} aria-label={text} style={{ display: 'inline' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

const dtourSlides = [
  {
    id: 1,
    figure: 'FIG. 01 — THE HORIZON',
    desc: 'Form, space, and real-world scale',
    image: '/Architecture.png',
    position: 'center 25%',
  },
  {
    id: 2,
    figure: 'FIG. 02 — THE SILHOUETTE',
    desc: 'Structure, balance, and proportions',
    image: '/Beach.png',
    position: 'center 45%',
  },
  {
    id: 3,
    figure: 'FIG. 03 — THE TERRAIN',
    desc: 'Tactile earth, grass, and raw nature',
    image: '/Desert.png',
    position: 'center 85%',
  },
  {
    id: 4,
    figure: 'FIG. 04 — SCALE & SPACE',
    desc: 'Vast sky, atmosphere, and natural light',
    image: '/Forest Visit 1.png',
    position: 'center 15%',
  },
  {
    id: 5,
    figure: 'FIG. 05 — TACTILE CRAFT',
    desc: 'Knit textures, materials, and details',
    image: '/Mall.png',
    position: 'center 60%',
  },
];

// Duplicate slides to create seamless infinite auto-slide loop
const infiniteSlides = [...dtourSlides, ...dtourSlides];

export default function DTourSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const titleRef = useRef(null);
  const topbarRef = useRef(null);
  const imagesLayerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const title = titleRef.current;
    const topbar = topbarRef.current;
    const imagesLayer = imagesLayerRef.current;

    if (!section || !viewport || !title || !imagesLayer) return;

    const titleChars = title.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      // 1. Initial State:
      // - D TOUR characters in 3D flip-in angle (ProgramsSection style)
      gsap.set(titleChars, {
        opacity: 0,
        y: 80,
        scale: 0,
        rotationX: 180,
        transformOrigin: '0% 50% -50px',
      });

      if (topbar) {
        gsap.set(topbar, { opacity: 0, y: -20 });
      }

      // - Images layer starts completely below the screen (hidden during 1st scroll)
      gsap.set(imagesLayer, { yPercent: 100, opacity: 1 });

      // 2. 3-Step Pinned Timeline:
      // Step 1: Text comes in
      // Step 2: Images come in and auto-slide
      // Step 3: Images exit, text stays visible, and next section comes in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1600',
          pin: viewport,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── STEP 1 (1st Scroll): D TOUR TEXT ONLY COMES IN ──
      if (topbar) {
        tl.to(topbar, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0);
      }

      tl.to(
        titleChars,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: 'back.out(1.5)',
        },
        0.05
      );

      // Distinct beat: Only D TOUR text is visible in center of screen
      tl.to({}, { duration: 0.25 });

      // ── STEP 2 (2nd Scroll): IMAGES ARRIVE ABOVE TEXT & AUTO-SLIDE ──
      tl.to(
        imagesLayer,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
        },
        '>'
      );

      // Hold beat: Images are auto-sliding smoothly across the screen
      tl.to({}, { duration: 0.35 });

      // ── STEP 3 (3rd Scroll): IMAGES GO AWAY (Slide smoothly upwards out of view) ──
      tl.to(
        imagesLayer,
        {
          yPercent: -105,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        '>'
      );

      // Brief hold: D TOUR text stays proudly visible in center, then next section arrives
      tl.to({}, { duration: 0.25 });
    }, section);

    // Refresh ScrollTrigger to sync coordinates with preceding pinned sections
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="dtour" ref={sectionRef} className="dtour-campaign-section">
      <div ref={viewportRef} className="dtour-campaign-viewport">
        {/* ── Top Bar (CAMPAIGN) ── */}
        <div ref={topbarRef} className="dtour-campaign-topbar">
          <span className="dtour-campaign-label">CAMPAIGN</span>
          <span className="dtour-campaign-meta">FIELD VISITS // 05 PERSPECTIVES</span>
        </div>

        {/* ── Fixed Center Text Layer ("D TOUR" with ProgramsSection 3D Flip-In/Flip-Out) ── */}
        <div className="dtour-campaign-text-layer">
          <h2 ref={titleRef} className="dtour-campaign-giant-title">
            <SplitText text="D TOUR" className="dtour-title-split" />
          </h2>
        </div>

        {/* ── Auto-Sliding Images Layer (z-index: 2 — arrives on 2nd scroll, leaves on 3rd) ── */}
        <div ref={imagesLayerRef} className="dtour-campaign-images-layer">
          <div className="dtour-campaign-track">
            {infiniteSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="dtour-slide-card"
              >
                <div className="dtour-slide-image-wrapper">
                  <img
                    src={slide.image}
                    alt={slide.figure}
                    className="dtour-slide-image"
                    style={{ objectPosition: slide.position }}
                    loading="lazy"
                  />
                </div>

                <div className="dtour-slide-overlay">
                  <div className="dtour-slide-caption">
                    <span className="dtour-slide-figure">
                      <SplitText text={slide.figure} className="dtour-figure-split" />
                    </span>
                    <span className="dtour-slide-desc">{slide.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Right Slide Counter ── */}
        <div className="dtour-campaign-counter">
          <span>05 EXPEDITIONS // CONTINUOUS REEL</span>
        </div>
      </div>
    </section>
  );
}
