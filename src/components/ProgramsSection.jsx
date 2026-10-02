import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProgramsSection.css';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: '01',
    title: 'Design Engineer',
    tags: 'UI/UX Design · Interaction Design · Front-End Development',
    description:
      'For the ones who want to design it and build it. Learn to think like a designer and code like an engineer — the rare combo the industry is actually short on.',
    image: '/Design Engineering.png',
  },
  {
    id: '02',
    title: 'Visual Design',
    tags: 'Graphic Design · Art · Illustration',
    description:
      'For the storytellers who think in color, shape, and composition. Master the craft of visual communication from brand identity to original illustration.',
    image: '/Visual.png',
  },
  {
    id: '03',
    title: 'Film Making',
    tags: 'Video Editing · Shooting · Camera Handling · Motion Graphics',
    description:
      'For the ones who see the world in frames. Learn to shoot, edit, and bring motion to your ideas — from raw footage to final cut.',
    image: '/Video.png',
  },
];

// Split text into character spans for scatter and 3D stagger animation
function SplitText({ text, className }) {
  return (
    <span className={className} aria-label={text} style={{ display: 'inline' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          aria-hidden="true"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
            transformOrigin: '0% 50% -30px',
            '--char-index': i,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function ProgramsSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cardsWrap = cardsWrapRef.current;
    const cards = cardRefs.current;

    if (!section || !headline || !cardsWrap) return;

    const chars = headline.querySelectorAll('.char');
    const header = document.querySelector('.site-header-container');
    const hideHeader = () => header?.classList.add('header-hidden');
    const showHeader = () => header?.classList.remove('header-hidden');

    const mm = gsap.matchMedia();

    // ── Desktop (> 860px): Full 3D Pinned Animation ──
    mm.add('(min-width: 861px)', () => {
      gsap.set(chars, {
        opacity: 0,
        y: 80,
        scale: 0,
        rotationX: 180,
        transformOrigin: '0% 50% -50px',
      });

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0,
        rotationX: 180,
        transformOrigin: '0% 50% -50px',
      });
      gsap.set(cardsWrap, { opacity: 0 });

      // Initial state for card text elements (title characters, number, tags)
      cards.forEach((card) => {
        const titleChars = card.querySelectorAll('.program-card-title .char');
        const num = card.querySelector('.program-card-num');
        const tags = card.querySelector('.program-card-tags');

        if (titleChars.length) {
          gsap.set(titleChars, {
            opacity: 0,
            y: 35,
            rotationX: 90,
            scale: 0.6,
            transformOrigin: '0% 50% -30px',
          });
        }
        if (num) gsap.set(num, { opacity: 0, scale: 0, y: 15 });
        if (tags) gsap.set(tags, { opacity: 0, y: 22 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=340%',
          pin: true,
          pinSpacing: true,
          scrub: 2.4,
          invalidateOnRefresh: true,
          onEnter: hideHeader,
          onLeave: showHeader,
          onEnterBack: hideHeader,
          onLeaveBack: showHeader,
        },
      });

      // ── Phase 1: 3D flip-in stagger
      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 80,
          scale: 0,
          rotationX: 180,
          transformOrigin: '0% 50% -50px',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          transformOrigin: '0% 50% -50px',
          duration: 0.36,
          stagger: 0.022,
          ease: 'back.out(1.5)',
        },
        0
      );

      // ── Phase 2: Hold the assembled headline
      tl.to({}, { duration: 0.45 });

      // ── Phase 3: "Pick your lane" 3D character flip-out exit effect
      tl.to(
        chars,
        {
          opacity: 0,
          y: -75,
          scale: 0.2,
          rotationX: -160,
          transformOrigin: '0% 50% -50px',
          duration: 0.38,
          stagger: 0.02,
          ease: 'back.in(1.4)',
        }
      );

      // Cleanly hide headline container after character exit
      tl.to(
        headline,
        {
          autoAlpha: 0,
          duration: 0.05,
          ease: 'none',
        }
      );

      // Clear beat before the cards and images enter
      tl.to({}, { duration: 0.2 });

      // ── Phase 4: Cards stagger in with individual 3D text effects ──
      tl.to(cardsWrap, { opacity: 1, duration: 0.05, ease: 'none' });
      tl.addLabel('cardsPhase');

      cards.forEach((card, i) => {
        const titleChars = card.querySelectorAll('.program-card-title .char');
        const num = card.querySelector('.program-card-num');
        const tags = card.querySelector('.program-card-tags');
        const cardOffset = i * 0.28;

        // Card frame 3D flip-in
        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0,
            rotationX: 180,
            transformOrigin: '0% 50% -50px',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            transformOrigin: '0% 50% -50px',
            duration: 0.65,
            ease: 'power2.out',
          },
          `cardsPhase+=${cardOffset}`
        );

        // Card number pop-in with energetic bounce
        if (num) {
          tl.to(
            num,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.35,
              ease: 'back.out(2)',
            },
            `cardsPhase+=${cardOffset + 0.12}`
          );
        }

        // Card title: 3D character cascade flip
        if (titleChars.length) {
          tl.to(
            titleChars,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.45,
              stagger: 0.02,
              ease: 'back.out(1.6)',
            },
            `cardsPhase+=${cardOffset + 0.16}`
          );
        }

        // Card tags: smooth upward reveal
        if (tags) {
          tl.to(
            tags,
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              ease: 'power2.out',
            },
            `cardsPhase+=${cardOffset + 0.26}`
          );
        }
      });

      // Hold assembled cards for viewing
      tl.to({}, { duration: 0.5 });
    });

    // ── Mobile (<= 860px): Smooth Unpinned Natural Flow ──
    mm.add('(max-width: 860px)', () => {
      showHeader();

      // Clear any leftover inline transforms
      gsap.set([chars, cards, cardsWrap], { clearProps: 'all' });
      cards.forEach((card) => {
        const titleChars = card.querySelectorAll('.program-card-title .char');
        const num = card.querySelector('.program-card-num');
        const tags = card.querySelector('.program-card-tags');
        gsap.set([titleChars, num, tags], { clearProps: 'all' });
      });

      // Subtle entrance animation on mobile scroll
      gsap.from(headline, {
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
        },
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: 'power2.out',
      });

      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          opacity: 0,
          y: 35,
          duration: 0.55,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      mm.revert();
      showHeader();
    };
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="programs-section">
      <div className="programs-inner">

        {/* Headline Phase */}
        <div className="programs-headline-block">
          <h2 ref={headlineRef} className="programs-headline">
            <span className="programs-headline-split" aria-label="Pick your lane.">
              {'Pick your lane.'.split('').map((char, i) => (
                <span
                  key={i}
                  className="char"
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, opacity',
                    transformOrigin: '0% 50% -50px',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Cards Phase */}
        <div ref={cardsWrapRef} className="programs-cards-wrap">
          <div className="programs-grid">
            {programs.map((program, i) => (
              <article
                key={program.id}
                className="program-card"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <div className="program-image-frame">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="program-img"
                  />
                </div>

                <div className="program-card-content">
                  <div className="program-card-header">
                    <span className="program-card-num">{program.id}</span>
                    <h3 className="program-card-title">
                      <SplitText text={program.title} />
                    </h3>
                  </div>

                  <div className="program-card-tags">
                    <svg
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="#ff6230" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>{program.tags}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
