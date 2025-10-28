import React, { useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from '@/components/molecules/LottieLazy'
import coachReact from '@/animations/coachReact.json'
import confetti from '@/animations/confettiBurst.json'
import { useAppStore } from '@/store/useAppStore'
import { useSoundFeedback } from '@/hooks/useSoundFeedback'

export default function CoachAvatar() {
  const repCount = useAppStore((s) => s.repCount)
  const repQuality = useAppStore((s) => s.repQuality)
  const analyzing = useAppStore((s) => s.analyzing)
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  const { success, warn, error: errTone, vibrate } = useSoundFeedback()

  const mood = useMemo(() => {
    if (analyzing) return 'thinking'
    const text = (aiFeedback || '').toLowerCase()
    if (repQuality >= 90 || text.includes('perfect') || text.includes('good')) return 'good'
    if (repQuality >= 70 || text.includes('almost') || text.includes('smooth')) return 'warn'
    return 'bad'
  }, [analyzing, aiFeedback, repQuality])

  const prevRep = useRef(repCount)
  useEffect(() => {
    if (repCount > prevRep.current) {
      if (repQuality >= 90) {
        success(); vibrate([10])
      } else if (repQuality < 60) {
        errTone(); vibrate([15])
      } else {
        warn()
      }
    }
    prevRep.current = repCount
  }, [repCount, repQuality, success, warn, errTone, vibrate])

  const bg = mood === 'good' ? 'rgba(16,185,129,0.25)'
    : mood === 'warn' ? 'rgba(245,158,11,0.25)'
    : mood === 'thinking' ? 'rgba(99,102,241,0.25)'
    : 'rgba(239,68,68,0.25)'

  return (
    <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40">
      <motion.div
        className="relative glass rounded-2xl p-2 border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        style={{ boxShadow: `0 0 25px ${bg}` }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16">
          <Lottie animationData={coachReact} loop autoplay />
        </div>
        <AnimatePresence>
          {repQuality >= 90 && (
            <motion.div
              key={`coach-celebrate-${repCount}`}
              className="absolute -inset-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie animationData={confetti} loop={false} autoplay />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <style>{`
        @media (max-width: 640px) {
          .coach-mobile { position: static; margin-top: 12px; }
        }
      `}</style>
    </div>
  )
}
