import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ThreeGradientScene from './ThreeGradientScene';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroPinContainerRef = useRef(null);
  const heroCardRef = useRef(null);
  const threeSceneRef = useRef(null);

  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Setup 2-Step Scroll Sequence with GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      if (heroPinContainerRef.current) {
        // Initial Entrance for Step 1
        gsap.fromTo(
          step1Ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15 }
        );

        // Timeline controlling Step 1 -> Step 2 transition on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroPinContainerRef.current,
            start: 'top top',
            end: () => (window.innerWidth <= 768 ? '+=1200' : '+=2400'),
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              threeSceneRef.current?.setScroll(self.progress, self.getVelocity());
            },
          },
        });

        // Phase 1: Step 1 (Headline) stays fully visible until 0.22, then fades & floats up
        tl.to(
          step1Ref.current,
          {
            opacity: 0,
            y: -55,
            duration: 0.28,
            ease: 'power2.inOut',
          },
          0.22
        );

        // Phase 2: Step 2 (Paragraph + CTA buttons) emerges starting at 0.44 and settles at 0.70
        tl.fromTo(
          step2Ref.current,
          {
            opacity: 0,
            y: 45,
            pointerEvents: 'none',
          },
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.32,
            ease: 'power2.out',
          },
          0.44
        );

        // Phase 3: Hold settled Step 2 until the end of the pin
        tl.to({}, { duration: 0.24 }, 0.76);
      }
    });

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleScrollTo = (e, targetSelector) => {
    e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetSelector, { offset: 0, duration: 1.4 });
    } else {
      const el = document.querySelector(targetSelector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-wrapper" style={{ width: '100%' }}>
      <div id="hero-trigger" className="hero-scroll-wrapper">
        <section ref={heroPinContainerRef} className="hero-pin-section" id="hero">
          <div ref={heroCardRef} className="hero-inner-frame">
            {/* ThreeGradientScene renders background (back) and floating 3D model (front), with text sandwiched in middle */}
            <ThreeGradientScene
              ref={threeSceneRef}
              interactive={true}
              parallaxStrength={0.35}
              noiseOpacity={0.045}
            >
              {/* 2-Step Scroll Content Overlay (BEHIND the floating 3D model) */}
              <div className="hero-content-overlay">
                {/* Step 1: Initial Headline + Buttons (Visible First) */}
                <div ref={step1Ref} className="hero-step hero-step-1">
                  <h1 className="hero-headline">
                    Great designers are made in an Uncommon way!
                  </h1>

                  <div className="hero-cta-group" style={{ marginTop: 'clamp(28px, 3.8vw, 42px)' }}>
                    <a
                      href="#programs"
                      onClick={(e) => handleScrollTo(e, '#programs')}
                      className="hero-btn-primary"
                      id="hero-step1-explore-courses-btn"
                    >
                      <span>Explore Courses</span>
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </a>

                    <a
                      href="#dtour"
                      onClick={(e) => handleScrollTo(e, '#dtour')}
                      className="hero-btn-secondary"
                      id="hero-step1-join-community-btn"
                    >
                      Join the Community
                    </a>
                  </div>
                </div>

                {/* Step 2: Emerges After Scrolling (Paragraph + CTA buttons, in back of 3D) */}
                <div ref={step2Ref} className="hero-step hero-step-2">
                  <p className="hero-description">
                    Anyone can copy a trend. Great designers understand why it works.
                    Our mentors, with years of real industry experience, take you
                    back to the fundamentals and build you up from there. No
                    shortcuts. No fluff. Just design that makes sense.
                  </p>

                  <div className="hero-cta-group">
                    <a
                      href="#programs"
                      onClick={(e) => handleScrollTo(e, '#programs')}
                      className="hero-btn-primary"
                      id="hero-explore-courses-btn"
                    >
                      <span>Explore Courses</span>
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </a>

                    <a
                      href="#dtour"
                      onClick={(e) => handleScrollTo(e, '#dtour')}
                      className="hero-btn-secondary"
                      id="hero-join-community-btn"
                    >
                      Join the Community
                    </a>
                  </div>
                </div>
              </div>
            </ThreeGradientScene>
          </div>
        </section>
      </div>
    </div>
  );
}
