import React from 'react'
import FeedbackBubble from '../molecules/FeedbackBubble'
import EndSessionModal from './EndSessionModal'
import Lottie from '@/components/molecules/LottieLazy'
import aiWave from '@/animations/aiWave.json'
import coachReact from '@/animations/coachReact.json'
import { useAppStore } from '@/store/useAppStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeedbackPanel() {
  const analyzing = useAppStore((s) => s.analyzing)
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  const positive =
    (aiFeedback || '').toLowerCase().includes('perfect') ||
    (aiFeedback || '').toLowerCase().includes('good')
  return (
    <motion.div layout className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-36 h-10 glass rounded-xl flex items-center">
          <Lottie animationData={aiWave} loop autoplay style={{ width: '100%', height: '100%' }} />
        </div>
        <AnimatePresence>
          {analyzing && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/70"
            >
              Analyzing...
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10">
          <Lottie animationData={coachReact} loop autoplay />
        </div>
        <FeedbackBubble />
      </div>
      <div className="flex justify-end">
        <EndSessionModal />
      </div>
    </motion.div>
  )
}
