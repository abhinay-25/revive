import React from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

export default function MetricsPanel() {
  const repCount = useAppStore((s) => s.repCount)
  return (
    <div className="glass rounded-2xl p-4 grid grid-cols-2 gap-4 shadow-ai">
      <div>
        <div className="text-xs text-white/60">Reps</div>
        <motion.div
          className="text-3xl font-bold text-primary font-numeric inline-flex items-center"
          whileHover={{ scale: 1.03, textShadow: '0 0 16px rgba(99,102,241,0.85)' }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {repCount}
        </motion.div>
      </div>
      <div>
        <div className="text-xs text-white/60">Session</div>
        <div className="text-3xl font-bold">Active</div>
      </div>
    </div>
  )
}
