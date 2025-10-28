import React from 'react'
import MainTrackingLayout from '../components/templates/MainTrackingLayout'
import VideoSection from '../components/organisms/VideoSection'
import ExerciseStatsPanel from '../components/molecules/ExerciseStatsPanel'
import FeedbackBubble from '../components/molecules/FeedbackBubble'
import EndSessionModal from '../components/organisms/EndSessionModal'

export default function MainTrackingPage() {
  return (
    <MainTrackingLayout
      left={<>
        <VideoSection />
        <ExerciseStatsPanel />
      </>}
      right={<>
        <FeedbackBubble />
        <EndSessionModal />
      </>}
      footer={<footer className="container py-10 text-center text-xs text-white/60">Built with Vite + React + Tailwind + Framer Motion + Zustand</footer>}
    />
  )
}
