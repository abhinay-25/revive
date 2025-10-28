import React from 'react'
import { motion } from 'framer-motion'
import StatusIndicator from '../atoms/StatusIndicator'
import ProgressBar from '../atoms/ProgressBar'

function Gauge({ value = 75 }) {
  // Simple radial gauge via conic-gradient
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="relative w-28 h-28">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#6366F1 ${clamped * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
          filter: 'drop-shadow(0 4px 30px rgba(99,102,241,0.15))',
        }}
      />
      <div className="absolute inset-2 rounded-full bg-black/40 backdrop-blur border border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xl font-bold text-white">{clamped}%</div>
      </div>
    </div>
  )
}

export default function MetricsPanel() {
  return (
    <motion.div className="glass rounded-2xl p-4 shadow-ai" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-white/60">Reps</div>
          <div className="text-4xl font-bold text-primary">08</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Sets</div>
          <div className="text-4xl font-bold">2 / 3</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Timer</div>
          <div className="text-3xl font-bold font-numeric">02:35</div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="active" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60 mb-1">Quality</div>
          <ProgressBar value={96} className="w-48" />
        </div>
        <Gauge value={96} />
      </div>
    </motion.div>
  )
}
