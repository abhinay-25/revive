import React, { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export default function FeedbackBubble() {
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  const display = aiFeedback && aiFeedback.trim().length > 0 ? aiFeedback : 'Analyzing…'
  const toneClass = useMemo(() => {
    const t = (display || '').toLowerCase?.() || ''
    if (t.includes('warning') || t.includes('caution')) return 'border-yellow-400/40'
    if (t.includes('error') || t.includes('bad')) return 'border-red-400/40'
    return 'border-emerald-400/40'
  }, [display])
  return (
    <div
      className={'glass rounded-2xl px-4 py-3 text-sm text-white/90 shadow-ai border ' + toneClass}
      role="status"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={display}
          initial={{ opacity: 0, x: 20, y: 6 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {display}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
