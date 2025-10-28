import React from 'react'
import MainTrackingLayout from '../components/templates/MainTrackingLayout'
import VideoSection from '../components/organisms/VideoSection'
import MetricsPanel from '../components/organisms/MetricsPanel'
import FeedbackPanel from '../components/organisms/FeedbackPanel'
import BottomBar from '../components/organisms/BottomBar'
import { useExerciseSimulation } from '@/hooks/useExerciseSimulation'

export default function MainTrackingPage() {
  // start simulation on mount
  useExerciseSimulation(true)
  return (
    <MainTrackingLayout
      left={<>
        <VideoSection />
      </>}
      right={<>
        <MetricsPanel />
        <FeedbackPanel />
      </>}
      footer={<>
        <footer className="container py-10 text-center text-xs text-white/60">Built with Vite + React + Tailwind + Framer Motion + Zustand</footer>
        <BottomBar />
      </>}
    />
  )
}
