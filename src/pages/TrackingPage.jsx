import React from 'react'
import { motion } from 'framer-motion'
import HeaderBar from '../components/HeaderBar'
import CameraFeed from '../components/CameraFeed'
import ExerciseVideo from '../components/ExerciseVideo'
import MetricsPanel from '../components/MetricsPanel'
import FeedbackBar from '../components/FeedbackBar'
import SessionFooter from '../components/SessionFooter'
import MotionTest from '../components/MotionTest'
import MetricCard from '../components/MetricCard'
import * as Progress from '@radix-ui/react-progress'

export default function TrackingPage() {
  return (
    <div className="min-h-screen w-full text-white">
      <HeaderBar />

      <motion.main
        className="container grid grid-cols-12 gap-6"
        layout
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Left: 60% — camera feed and metrics */}
        <section className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <motion.div layout className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <CameraFeed />
            <div className="absolute bottom-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              Tracking posture... ✅
            </div>
          </motion.div>

          {/* Metric grid 3x2 for symmetry */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <MetricCard label="Reps Completed" value="08 / 12" />
            <MetricCard label="Sets" value="2 / 3" />
            <MetricCard label="Timer" value="02:35" />
            <MetricCard label="Status" value="Active" hint="Auto-detect" />
            <MetricCard label="Quality Score" value="96%">
              <Progress.Root className="relative overflow-hidden bg-white/10 rounded-full w-full h-2">
                <Progress.Indicator className="h-full gradient-brand" style={{ width: '96%' }} />
              </Progress.Root>
            </MetricCard>
          </div>
        </section>

        {/* Right: 40% — reference video, feedback, controls */}
        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="relative">
            <ExerciseVideo />
            <div className="absolute top-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              Ideal Movement
            </div>
          </div>
          <FeedbackBar />
          <SessionFooter />
        </aside>
      </motion.main>

      <MotionTest />

      <footer className="container py-10 text-center text-xs text-white/60">
        Built with Vite + React + Tailwind + Framer Motion + Zustand
      </footer>
    </div>
  )
}
