import React from 'react'
import { motion } from 'framer-motion'

export default function MotionTest() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-2xl text-primary font-bold text-center mt-10"
    >
      Physiotherapy Tracker UI — Powered by Motion ⚡
    </motion.div>
  )
}
