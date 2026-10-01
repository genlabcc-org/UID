import Header from '../components/Header'
import Hero from '../components/Hero'
import JourneySection from '../components/JourneySection'
import ProgramsSection from '../components/ProgramsSection'
import WhyUidSection from '../components/WhyUidSection'
import MentorsSection from '../components/MentorsSection'
import YourJourneySection from '../components/YourJourneySection'
import ProgramDetailsSection from '../components/ProgramDetailsSection'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Floating Pill Header */}
      <Header />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Why UID is Different */}
      <WhyUidSection />

      {/* 3. Our Programs */}
      <ProgramsSection />

      {/* 4. Your Journey */}
      <YourJourneySection />

      {/* 5. Meet Our Mentors */}
      <MentorsSection />

      {/* 6. Program Details */}
      <ProgramDetailsSection />

      {/* 7. Reset. Rewire. Release (Pinned GSAP Sequence) */}
      <JourneySection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. Footer */}
      <Footer />
    </div>
  )
}
