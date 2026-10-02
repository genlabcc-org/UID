import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import UidSection from '../components/UidSection'
import JourneySection from '../components/JourneySection'
import ProgramsSection from '../components/ProgramsSection'
import WhyUidSection from '../components/WhyUidSection'
import MentorsSection from '../components/MentorsSection'
import YourJourneySection from '../components/YourJourneySection'
import DTourSection from '../components/DTourSection'
import ProgramDetailsSection from '../components/ProgramDetailsSection'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'
import RegistrationModal from '../components/RegistrationModal'

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('design-engineer')

  const handleOpenRegistration = (programId = 'design-engineer') => {
    setSelectedProgram(programId)
    setIsModalOpen(true)
  }

  const handleCloseRegistration = () => {
    setIsModalOpen(false)
  }

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
      <Header onOpenRegistration={() => handleOpenRegistration('design-engineer')} />

      {/* 1. Hero Section */}
      <Hero />

      {/* 1b. UID Kinetic Fullscreen Horizontal Section */}
      <UidSection />

      {/* 2. Why UID is Different */}
      <WhyUidSection />

      {/* 3. Our Programs */}
      <ProgramsSection />

      {/* 4. D.Tour Visual Campaign Section */}
      <DTourSection />

      {/* 5. Your Journey */}
      <YourJourneySection />

      {/* 6. Meet Our Mentors */}
      <MentorsSection />

      {/* 6. Program Details */}
      <ProgramDetailsSection onRegister={(progId) => handleOpenRegistration(progId)} />

      {/* 7. Reset. Rewire. Release (Pinned GSAP Sequence) */}
      <JourneySection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. Footer */}
      <Footer />

      {/* Popup Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseRegistration}
        defaultProgram={selectedProgram}
      />
    </div>
  )
}

