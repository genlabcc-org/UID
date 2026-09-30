import Hero from '../components/Hero'
import JourneySection from '../components/JourneySection'
import ProgramsSection from '../components/ProgramsSection'
import DTourSection from '../components/DTourSection'
import ProgramDetailsSection from '../components/ProgramDetailsSection'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div
      style={{
        background: '#eee7df',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Full-Screen Gradient Hero */}
      <Hero />

      {/* 2. GSAP Smooth Pinned Scroll Sequence (Today -> I bridge -> the two.) */}
      <JourneySection />

      {/* 3. Section 3: Our Programs */}
      <ProgramsSection />

      {/* 4. Section 4: D.Tour */}
      <DTourSection />

      {/* 5. Section 6: Program Details */}
      <ProgramDetailsSection />

      {/* 6. Section 9: FAQ */}
      <FaqSection />

      {/* 7. Reference-Matched Gradient Card Footer */}
      <Footer />
    </div>
  )
}
