import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Header.css';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Direct scroll evaluation: only switch color once Hero finishes and Journey section arrives
    const checkScroll = () => {
      const journeyEl = document.getElementById('journey');
      if (journeyEl) {
        const rect = journeyEl.getBoundingClientRect();
        setIsScrolled(rect.top <= 80);
      } else {
        setIsScrolled(window.scrollY > 2200);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // 2. GSAP ScrollTrigger to ensure exact synchronization with pin release
    let trigger = null;
    const timeout = setTimeout(() => {
      trigger = ScrollTrigger.create({
        trigger: '#journey',
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

          {/* Middle: Desktop Navigation Links */}
          <ul className="header-nav-list">
            <li>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="header-nav-link"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#program-details"
                onClick={(e) => handleSmoothScroll(e, '#program-details')}
                className="header-nav-link"
              >
                Services
              </a>
            </li>
            <li
              className={`header-dropdown-parent ${aboutOpen ? 'active' : ''}`}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                className="header-nav-link"
                onClick={() => setAboutOpen(!aboutOpen)}
                aria-expanded={aboutOpen}
              >
                <span>About</span>
                <svg
                  className="nav-chevron-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="header-dropdown-menu">
                <a
                  href="#why-uid"
                  onClick={(e) => handleSmoothScroll(e, '#why-uid')}
                  className="dropdown-item"
                >
                  Why UID is Different
                </a>
                <a
                  href="#dtour"
                  onClick={(e) => handleSmoothScroll(e, '#dtour')}
                  className="dropdown-item"
                >
                  The D.Tour Experience
                </a>
                <a
                  href="#programs"
                  onClick={(e) => handleSmoothScroll(e, '#programs')}
                  className="dropdown-item"
                >
                  Our Programs
                </a>
              </div>
            </li>
          </ul>

          {/* Right: Dark Capsule Cluster */}
          <div className="header-right-capsule">
            {/* Business Design Dropdown (Desktop) */}
            <div
              className="header-dropdown-parent desktop-only-element"
              onMouseEnter={() => setBusinessOpen(true)}
              onMouseLeave={() => setBusinessOpen(false)}
            >
              <button
                type="button"
                className="btn-business-design"
                onClick={() => setBusinessOpen(!businessOpen)}
                aria-expanded={businessOpen}
              >
                <span>Business Design</span>
                <svg
                  className="nav-chevron-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="header-dropdown-menu" style={{ left: '0', transform: 'none' }}>
                <a
                  href="#programs"
                  onClick={(e) => handleSmoothScroll(e, '#programs')}
                  className="dropdown-item"
                >
                  Design Engineering
                </a>
                <a
                  href="#programs"
                  onClick={(e) => handleSmoothScroll(e, '#programs')}
                  className="dropdown-item"
                >
                  Visual Design Systems
                </a>
                <a
                  href="#programs"
                  onClick={(e) => handleSmoothScroll(e, '#programs')}
                  className="dropdown-item"
                >
                  Film & Motion Direction
                </a>
              </div>
            </div>

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
                href="#program-details"
                onClick={(e) => handleSmoothScroll(e, '#program-details')}
                className="mobile-nav-item"
              >
                Program Details &amp; Mentors
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
