import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ThreeGradientScene from './ThreeGradientScene';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroPinContainerRef = useRef(null);
  const heroCardRef = useRef(null);
  const threeSceneRef = useRef(null);

  useEffect(() => {
    // Setup GSAP ScrollTrigger 3D Camera & Text Choreography
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
      ctx.revert();
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
