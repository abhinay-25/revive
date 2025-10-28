import React from 'react'
import CameraFeed from '../CameraFeed'
import ExerciseVideo from '../ExerciseVideo'
import { motion } from 'framer-motion'

export default function VideoSection() {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="relative" aria-label="Live Camera Feed">
        <CameraFeed />
        {/* Overlay status pill */}
        <div className="absolute bottom-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          Tracking posture... ✅
        </div>
        {/* Dummy bounding boxes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute border-2 border-teal-400/70 rounded-lg animate-soft-bounce" style={{ left: '12%', top: '20%', width: '22%', height: '28%' }} />
          <div className="absolute border-2 border-violet-400/70 rounded-lg animate-soft-bounce" style={{ right: '15%', bottom: '18%', width: '18%', height: '24%' }} />
        </div>
      </div>
      <div className="relative" aria-label="Exercise Reference Video">
        <ExerciseVideo />
        <div className="absolute top-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          Ideal Movement
        </div>
      </div>
    </motion.div>
  )
}
