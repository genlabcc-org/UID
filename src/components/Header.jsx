import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Header.css';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Direct scroll evaluation: only switch color once Hero finishes and Why UID section arrives
    const checkScroll = () => {
      const whyUidEl = document.getElementById('why-uid');
      if (whyUidEl) {
        const rect = whyUidEl.getBoundingClientRect();
        setIsScrolled(rect.top <= 80);
      } else {
        setIsScrolled(window.scrollY > 800);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // 2. GSAP ScrollTrigger to ensure exact synchronization with hero transition
    let trigger = null;
    const timeout = setTimeout(() => {
      trigger = ScrollTrigger.create({
        trigger: '#why-uid',
        start: 'top 80px',
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', checkScroll);
      if (trigger) trigger.kill();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setAboutOpen(false);
    setBusinessOpen(false);
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="site-header-container" aria-label="Main Navigation">
        <nav
          className={`header-pill ${
            isScrolled ? 'header-pill-scrolled' : 'header-pill-transparent'
          }`}
        >
          {/* Left: Brand Logo from public/logo.png */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, '#hero')}
            className="header-brand-logo"
            title="UID — Uncommon Institute of Design"
          >
            <img
              src="/logo.png"
              alt="Uncommon Institute of Design"
              className="header-logo-img"
            />
          </a>

          {/* Middle: Desktop Navigation Links (Direct, no dropdowns) */}
          <ul className="header-nav-list">
            <li>
              <a
                href="#why-uid"
                onClick={(e) => handleSmoothScroll(e, '#why-uid')}
                className="header-nav-link"
              >
                Why UID
              </a>
            </li>
            <li>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="header-nav-link"
              >
                Programs
              </a>
            </li>
            <li>
              <a
                href="#dtour"
                onClick={(e) => handleSmoothScroll(e, '#dtour')}
                className="header-nav-link"
              >
                D.Tour
              </a>
            </li>
            <li>
              <a
                href="#mentors"
                onClick={(e) => handleSmoothScroll(e, '#mentors')}
                className="header-nav-link"
              >
                Mentors
              </a>
            </li>
            <li>
              <a
                href="#program-details"
                onClick={(e) => handleSmoothScroll(e, '#program-details')}
                className="header-nav-link"
              >
                Details
              </a>
            </li>
          </ul>

          {/* Right: Dark Capsule Cluster (No business design menu) */}
          <div className="header-right-capsule">
            {/* Contact Us Button */}
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, '#faq')}
              className="btn-contact-us"
            >
              Contact Us
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Fullscreen Glassmorphic Mobile Navigation Overlay ── */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-panel">
          {/* Header row inside drawer */}
          <div className="mobile-nav-header">
            <img
              src="/logo.png"
              alt="UID Logo"
              className="mobile-nav-logo"
            />
            <button
              type="button"
              className="mobile-nav-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links list */}
          <div className="mobile-nav-body">
            <div className="mobile-nav-group">
              <span className="mobile-nav-group-title">Menu</span>
              <a
                href="#hero"
                onClick={(e) => handleSmoothScroll(e, '#hero')}
                className="mobile-nav-item"
              >
                Home
              </a>
              <a
                href="#why-uid"
                onClick={(e) => handleSmoothScroll(e, '#why-uid')}
                className="mobile-nav-item"
              >
                Why UID is Different
              </a>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="mobile-nav-item"
              >
                Our Programs
              </a>
              <a
                href="#dtour"
                onClick={(e) => handleSmoothScroll(e, '#dtour')}
                className="mobile-nav-item"
              >
                D.Tour Experience
              </a>
              <a
                href="#mentors"
                onClick={(e) => handleSmoothScroll(e, '#mentors')}
                className="mobile-nav-item"
              >
                Mentors
              </a>
              <a
                href="#program-details"
                onClick={(e) => handleSmoothScroll(e, '#program-details')}
                className="mobile-nav-item"
              >
                Program Details
              </a>
              <a
                href="#faq"
                onClick={(e) => handleSmoothScroll(e, '#faq')}
                className="mobile-nav-item"
              >
                FAQ
              </a>
            </div>

            <div className="mobile-nav-group">
              <span className="mobile-nav-group-title">Programs</span>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="mobile-nav-subitem"
              >
                Design Engineer
              </a>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="mobile-nav-subitem"
              >
                Visual Design
              </a>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="mobile-nav-subitem"
              >
                Film Making
              </a>
            </div>

            {/* Mobile Contact Action */}
            <div className="mobile-nav-footer">
              <a
                href="#faq"
                onClick={(e) => handleSmoothScroll(e, '#faq')}
                className="mobile-nav-cta-btn"
              >
                Get in Touch with Mentors →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
