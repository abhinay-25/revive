import React from 'react'
import { motion } from 'framer-motion'

export default function StatusBadge({ status = 'Active' }) {
  const color = status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
  return (
    <motion.div
      className={`rounded-full px-3 py-1 text-xs font-medium ${color} border border-white/10`}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {status}
    </motion.div>
  )
}
