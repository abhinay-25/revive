import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { variants } from '@/motion/motionSystem'
import Navbar from '../organisms/Navbar'
import Sidebar from '../organisms/Sidebar'
import { Suspense } from 'react'
import FloatingEndSession from '../organisms/FloatingEndSession'
import QuoteHero from '../organisms/QuoteHero'
import ScrollQuoteSection from '../organisms/ScrollQuoteSection'
import AnimatedBackground from '../organisms/AnimatedBackground'
import LoadingSpinner from '../molecules/LoadingSpinner'
import { useAppStore } from '@/store/useAppStore'
const AIRealTimeFeedbackBar = React.lazy(() => import('../organisms/AIRealTimeFeedbackBar'))
const QualityTimeline = React.lazy(() => import('../organisms/QualityTimeline'))
const CoachReaction = React.lazy(() => import('../organisms/CoachReaction'))
const CoachAvatar = React.lazy(() => import('../organisms/CoachAvatar'))
const AccessibilityPanel = React.lazy(() => import('../organisms/AccessibilityPanel'))

export default function MainTrackingLayout({ left, right, footer }) {
  // Scroll detection for quote toggle
  const [showScrollQuotes, setShowScrollQuotes] = useState(false)

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])

  // Sync accessibility classes onto documentElement (React way)
  const highContrast = useAppStore((s) => s.highContrast)
  const reduceMotion = useAppStore((s) => s.reduceMotion)

  useEffect(() => {
    const root = document.documentElement
    if (highContrast) root.classList.add('hc')
    else root.classList.remove('hc')
    if (reduceMotion) root.classList.add('reduce-motion')
    else root.classList.remove('reduce-motion')
  }, [highContrast, reduceMotion])

  // Scroll listener for quote toggle
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollQuotes(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      {/* Animated Background with Parallax */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 -z-20 opacity-40">
        <AnimatedBackground />
      </motion.div>

      {/* Fixed Header */}
      <Navbar />
      <Sidebar />

      {/* Fixed End Session Button */}
      <FloatingEndSession />

      {/* Main Content - Flex Column Layout */}
      <motion.div
        className="flex-1 flex flex-col items-center w-full text-white pt-16 md:pt-20"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
        variants={variants.page}
        initial="hidden"
        animate="show"
      >
        {/* Quote Hero Section - Minimal gap from navbar */}
        <QuoteHero />

        {/* Camera and AI Feedback Section - Centered with gap-6 */}
        <div className="flex flex-col items-center justify-center w-full gap-6 mt-2 px-4">
          {/* Main Content Grid */}
          <motion.main
            className="container grid grid-cols-12 gap-6 w-full max-w-7xl"
            layout
            variants={variants.containerStagger}
            custom={0.1}
            initial="hidden"
            animate="show"
          >
            <motion.section
              className="col-span-12 lg:col-span-8 flex flex-col gap-6"
              variants={variants.itemUp}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              {left}

              {/* AI Feedback Bar - Positioned Below Camera */}
              <Suspense fallback={null}>
                <AIRealTimeFeedbackBar />
              </Suspense>

              <Suspense fallback={<LoadingSpinner className="h-[200px]" />}>
                <QualityTimeline />
              </Suspense>
            </motion.section>

            <motion.aside
              className="col-span-12 lg:col-span-4 flex flex-col gap-6"
              variants={variants.itemUp}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              {right}
            </motion.aside>
          </motion.main>
        </div>

        {footer}
      </motion.div>

      {/* Scroll Quote (appears when scrolled) */}
      <AnimatePresence>{showScrollQuotes && <ScrollQuoteSection />}</AnimatePresence>

      <Suspense fallback={null}>
        <CoachReaction />
      </Suspense>
      <Suspense fallback={null}>
        <AccessibilityPanel />
      </Suspense>
      <Suspense fallback={null}>
        <CoachAvatar />
      </Suspense>
    </div>
  )
}
