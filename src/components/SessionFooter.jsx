import React from 'react'
import { Play, Square } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SessionFooter() {
  return (
    <div className="flex items-center justify-between gap-3">
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        className="rounded-lg px-4 py-2 transition text-white shadow-ai gradient-brand"
      >
        <Play className="w-4 h-4 inline mr-2"/> Start
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        className="rounded-lg px-4 py-2 transition text-white glass"
      >
        <Square className="w-4 h-4 inline mr-2"/> Stop
      </motion.button>
    </div>
  )
}
