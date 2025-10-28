import React from 'react'
import MainTrackingLayout from '../components/templates/MainTrackingLayout'
import { Suspense, useEffect } from 'react'
import VideoSection from '../components/organisms/VideoSection'
import LoadingSpinner from '@/components/molecules/LoadingSpinner'
import { motion } from 'framer-motion'
const MetricsPanel = React.lazy(() => import('../components/organisms/MetricsPanel'))
const FeedbackPanel = React.lazy(() => import('../components/organisms/FeedbackPanel'))
import BottomBar from '../components/organisms/BottomBar'
import { useExerciseSimulation } from '@/hooks/useExerciseSimulation'
import { useDemoPlayer } from '@/hooks/useDemoPlayer'
import { useAppStore } from '@/store/useAppStore'

export default function MainTrackingPage() {
  const demoMode = useAppStore((s) => s.demoMode)
  // Run either simulation or demo player
  useExerciseSimulation(!demoMode)
  useDemoPlayer()
  // Idle preload chunks
  useEffect(() => {
    const idle = (cb) =>
      window.requestIdleCallback
        ? window.requestIdleCallback(cb, { timeout: 1500 })
        : setTimeout(cb, 600)
    idle(() => {
      import('../components/organisms/QualityTimeline')
      import('../components/organisms/CoachReaction')
      import('../components/organisms/BackgroundLayer')
      import('../components/organisms/AIRealTimeFeedbackBar')
    })
  }, [])
  return (
    <MainTrackingLayout
      left={
        <>
          <VideoSection />
        </>
      }
      right={
        <>
          <Suspense fallback={<LoadingSpinner />}>
            <MetricsPanel />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <FeedbackPanel />
          </Suspense>
        </>
      }
      footer={
        <>
          <footer className="container py-12 text-center space-y-3 relative z-10">
            <motion.div
              className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              &ldquo;Every rep gets you closer to the best version of yourself.&rdquo;
            </motion.div>
            <div className="text-xs md:text-sm text-white/70 dark:text-white/60">
              Built with Vite + React + Tailwind + Framer Motion + Zustand
            </div>
          </footer>
          <BottomBar />
        </>
      }
    />
  )
}
