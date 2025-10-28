import React from 'react'
import { motion } from 'framer-motion'

export default function MetricCard({ label, value, hint, children }) {
  return (
    <motion.div
      className="glass rounded-xl p-4 flex flex-col gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {hint && <div className="text-xs text-white/50">{hint}</div>}
      {children}
    </motion.div>
  )
}
