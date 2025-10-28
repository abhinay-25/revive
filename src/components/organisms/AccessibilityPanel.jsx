import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { HelpCircle } from 'lucide-react'

export default function AccessibilityPanel() {
  const [open, setOpen] = React.useState(false)
  const highContrast = useAppStore((s) => s.highContrast)
  const setHighContrast = useAppStore((s) => s.setHighContrast)
  const reduceMotion = useAppStore((s) => s.reduceMotion)
  const setReduceMotion = useAppStore((s) => s.setReduceMotion)

  return (
    <div className="fixed left-4 bottom-24 md:bottom-16 z-50">
      <button
        aria-label="Accessibility help and settings"
        className="w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
        onClick={() => setOpen((v) => !v)}
      >
        <HelpCircle className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-[280px] rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-3 text-sm shadow-2xl"
            role="dialog"
            aria-modal="false"
            aria-labelledby="a11y-title"
          >
            <div id="a11y-title" className="font-medium mb-2">
              Accessibility
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                <span>High contrast mode</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={(e) => setReduceMotion(e.target.checked)}
                />
                <span>Reduce motion</span>
              </label>
            </div>
            <div className="mt-3 text-xs text-white/70">
              Shortcuts: Space — Pause/Resume, E — End session, R — Toggle Replay
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
