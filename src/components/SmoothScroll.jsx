import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize site-wide smooth scrolling with Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Smooth, responsive linear interpolation without runaway momentum
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Controlled wheel sensitivity to maintain tactile grip
      touchMultiplier: 1.0,
      syncTouch: false, // Let mobile touch devices use smooth native scrolling
      virtualScroll: (data) => {
        // Dampen high-velocity flick spikes so fast scrolling remains completely in control
        const threshold = 60;
        if (Math.abs(data.deltaY) > threshold) {
          const sign = Math.sign(data.deltaY);
          const excess = Math.abs(data.deltaY) - threshold;
          data.deltaY = sign * (threshold + Math.pow(excess, 0.72));
        }
      },
    });

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker for frame-perfect sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally accessible for programmatic scroll (e.g. navigation links)
    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
}
