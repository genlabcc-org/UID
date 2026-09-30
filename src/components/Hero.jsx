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

    // 2. Setup GSAP ScrollTrigger 3D Camera & Text Choreography (from UIDHEAD)
    const ctx = gsap.context(() => {
      if (heroPinContainerRef.current) {
        ScrollTrigger.create({
          trigger: heroPinContainerRef.current,
          start: 'top top',
          end: '+=3200',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            threeSceneRef.current?.setScroll(self.progress, self.getVelocity());
          },
        });
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

  return (
    <div className="portfolio-wrapper" style={{ width: '100%' }}>
      <main className="portfolio-main">
        <div id="hero-trigger" className="hero-scroll-wrapper">
          <section ref={heroPinContainerRef} className="hero-pin-section" id="hero">
            <div ref={heroCardRef} className="hero-inner-frame">
              <ThreeGradientScene
                ref={threeSceneRef}
                interactive={true}
                parallaxStrength={0.35}
                noiseOpacity={0.045}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
