import { useState, useEffect } from 'react'
import './RegistrationModal.css'

const availablePrograms = [
  { id: 'design-engineer', label: 'Design Engineer' },
  { id: 'visual-design', label: 'Visual Design' },
  { id: 'film-making', label: 'Film Making' },
]

export default function RegistrationModal({
  isOpen,
  onClose,
  defaultProgram = 'design-engineer',
}) {
  const [selectedProgram, setSelectedProgram] = useState('design-engineer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Sync default program if passed
  useEffect(() => {
    if (defaultProgram) {
      setSelectedProgram(defaultProgram)
    }
  }, [defaultProgram, isOpen])

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset submitted state when closed
      setTimeout(() => setIsSubmitted(false), 300)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate fast submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  const handleDone = () => {
    onClose()
  }

  return (
    <div
      className={`reg-modal-backdrop ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="reg-modal-card">
        {/* Close Button (X) */}
        <button
          type="button"
          className="reg-modal-close-btn"
          onClick={onClose}
          aria-label="Close registration modal"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            <h3 className="reg-modal-title">Register for UID</h3>
            <p className="reg-modal-subtext">
              Reserve your seat or get in touch with our admissions mentors. We
              will guide you through program details and schedule your studio visit.
            </p>

            {/* Program Selection Pills */}
            <div>
              <span className="reg-program-label">Select Program</span>
              <div className="reg-programs-selector">
                {availablePrograms.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    className={`reg-program-btn ${selectedProgram === prog.id ? 'active' : ''}`}
                    onClick={() => setSelectedProgram(prog.id)}
                  >
                    {prog.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="reg-form">
              <div className="reg-input-group">
                <label className="reg-input-label" htmlFor="reg-name">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="reg-input-field"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="reg-input-row">
                <div className="reg-input-group">
                  <label className="reg-input-label" htmlFor="reg-email">
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    required
                    placeholder="alex@gmail.com"
                    className="reg-input-field"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="reg-input-group">
                  <label className="reg-input-label" htmlFor="reg-phone">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="reg-input-field"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="reg-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'Complete Registration'}</span>
                {!isSubmitting && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>

              <p className="reg-privacy-note">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Your details are confidential and only used for admissions.</span>
              </p>
            </form>
          </>
        ) : (
          /* Confirmation Success Screen */
          <div className="reg-success-wrap">
            <div className="reg-success-icon-box">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="reg-success-title">Application Received!</h3>
            <p className="reg-success-desc">
              Thank you, <strong>{formData.name || 'Learner'}</strong>! We have received your
              registration for the <strong>{availablePrograms.find((p) => p.id === selectedProgram)?.label || 'UID'}</strong> program.
              Our mentor will reach out on WhatsApp/Phone within 24 hours.
            </p>

            <button type="button" className="reg-done-btn" onClick={handleDone}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
