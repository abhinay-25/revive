import React from 'react'
import CameraFeed from '../components/CameraFeed'
import ExerciseVideo from '../components/ExerciseVideo'
import MetricsPanel from '../components/MetricsPanel'
import FeedbackBar from '../components/FeedbackBar'
import SessionFooter from '../components/SessionFooter'
import MotionTest from '../components/MotionTest'

export default function TrackingPage() {
  return (
    <div className="min-h-screen w-full text-white">
      <header className="container py-6">
        <h1 className="h1">Physiotherapy Tracker</h1>
        <p className="muted mt-1">Next‑gen UI engineering — smooth, responsive, animated.</p>
      </header>

      <main className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CameraFeed />
        <div className="flex flex-col gap-6">
          <ExerciseVideo />
          <MetricsPanel />
          <FeedbackBar />
          <SessionFooter />
        </div>
      </main>

      <MotionTest />

      <footer className="container py-10 text-center text-xs text-white/60">
        Built with Vite + React + Tailwind + Framer Motion + Zustand
      </footer>
    </div>
  )
}
