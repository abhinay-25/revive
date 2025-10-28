import React, { useRef } from 'react'
import FeedbackBubble from '../molecules/FeedbackBubble'
import EndSessionModal from './EndSessionModal'
import Lottie from '@/components/molecules/LottieLazy'
import aiWave from '@/animations/aiWave.json'
import coachReact from '@/animations/coachReact.json'
import { useAppStore } from '@/store/useAppStore'
import { motion, AnimatePresence } from 'framer-motion'
import { variants } from '@/motion/motionSystem'
import TypewriterTip from '@/components/molecules/TypewriterTip'

export default function FeedbackPanel() {
  const analyzing = useAppStore((s) => s.analyzing)
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  const lastFeedback = useRef(aiFeedback)
  const positive =
    (aiFeedback || '').toLowerCase().includes('perfect') ||
    (aiFeedback || '').toLowerCase().includes('good')
  return (
    <motion.div layout className="flex flex-col gap-4">
      <AnimatePresence>
        {analyzing && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            <div className="w-36 h-10 glass rounded-xl flex items-center overflow-hidden">
              <Lottie animationData={aiWave} loop autoplay style={{ width: '100%', height: '100%' }} />
            </div>
            <motion.span className="text-xs text-white/70 flex items-center gap-1">
              <span className="inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce mx-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0.2s]" />
              </span>
              Analyzing...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="flex items-center gap-2" layout>
        <div className="w-10 h-10">
          <Lottie animationData={coachReact} loop autoplay />
        </div>
        <motion.div
          key={aiFeedback}
          initial={{ boxShadow: '0 0 0 0 rgba(255,255,255,0)' }}
          animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0)', '0 0 24px 4px rgba(99,102,241,0.35)', '0 0 0 0 rgba(255,255,255,0)'] }}
          transition={{ duration: 0.6 }}
        >
          <FeedbackBubble />
        </motion.div>
      </motion.div>
      <TypewriterTip />
      <div className="flex justify-end">
        <EndSessionModal />
      </div>
    </motion.div>
  )
}
