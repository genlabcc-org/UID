import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Header.css';

gsap.registerPlugin(ScrollTrigger);

export default function Header({ onOpenRegistration }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Switch to scrolled pill as soon as Hero finishes and UidSection arrives
    const getTargetEl = () => document.getElementById('uid') || document.getElementById('why-uid');

    const checkScroll = () => {
      const targetEl = getTargetEl();
      const headerEl = document.querySelector('.site-header-container');
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const pastHero = rect.top <= 80;
        setIsScrolled(pastHero);
        if (!pastHero) {
          headerEl?.classList.remove('header-hidden');
        }
      } else {
        const pastHero = window.scrollY > 400;
        setIsScrolled(pastHero);
        if (!pastHero) {
          headerEl?.classList.remove('header-hidden');
        }
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // GSAP ScrollTrigger to ensure exact synchronization with #uid arrival
    let trigger = null;
    const timeout = setTimeout(() => {
      const targetEl = getTargetEl();
      if (targetEl) {
        trigger = ScrollTrigger.create({
          trigger: targetEl,
          start: 'top 80px',
          onEnter: () => setIsScrolled(true),
          onLeaveBack: () => {
            setIsScrolled(false);
            document.querySelector('.site-header-container')?.classList.remove('header-hidden');
          },
        });
      }
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
          className={`header-pill ${isScrolled ? 'header-pill-scrolled' : 'header-pill-transparent'
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
              src="/favicon.svg"
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
            <li>
              <a
                href="https://mdp.mark9.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="header-nav-link"
              >
                Community
              </a>
            </li>
          </ul>

          {/* Right: Dark Capsule Cluster (No business design menu) */}
          <div className="header-right-capsule">
            {/* Contact Us Button */}
            <button
              type="button"
              onClick={() => onOpenRegistration && onOpenRegistration()}
              className="btn-contact-us"
            >
              <svg
                className="btn-contact-icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Contact Us</span>
            </button>

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

      {/* ── Minimal Mobile Navigation Overlay ── */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
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

          {/* Minimal Navigation Links */}
          <div className="mobile-nav-body">
            <nav className="mobile-nav-links">
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
                Why UID
              </a>
              <a
                href="#programs"
                onClick={(e) => handleSmoothScroll(e, '#programs')}
                className="mobile-nav-item"
              >
                Programs
              </a>
              <a
                href="#dtour"
                onClick={(e) => handleSmoothScroll(e, '#dtour')}
                className="mobile-nav-item"
              >
                D.Tour
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
                Details
              </a>
              <a
                href="https://mdp.mark9.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </a>
              <a
                href="#faq"
                onClick={(e) => handleSmoothScroll(e, '#faq')}
                className="mobile-nav-item"
              >
                FAQ
              </a>
            </nav>

            {/* Minimal Mobile Contact Action */}
            <div className="mobile-nav-footer">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenRegistration) onOpenRegistration();
                }}
                className="mobile-nav-cta-btn"
              >
                <svg
                  className="btn-contact-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
