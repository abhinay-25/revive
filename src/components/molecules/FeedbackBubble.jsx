import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export default function FeedbackBubble() {
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  return (
    <div className="glass rounded-2xl px-4 py-3 text-sm text-white/90 shadow-ai" role="status" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={aiFeedback}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {aiFeedback}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
