import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner({ className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-cyan-300/60 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
          style={{ willChange: 'transform' }}
        />
        <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  )
}
