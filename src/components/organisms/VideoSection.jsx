import React, { useState } from 'react'
import CameraFeed from '../CameraFeed'
import ExerciseVideo from '../ExerciseVideo'
import { motion, useScroll, useTransform } from 'framer-motion'
import { variants } from '@/motion/motionSystem'

export default function VideoSection() {
  const [hovered, setHovered] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -20])
  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={variants.itemScaleIn}>
      <motion.div
        className="relative group"
        aria-label="Live Camera Feed"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        layout
        style={{ y: parallaxY }}
      >
        <div className={`absolute -inset-1 rounded-2xl shimmer-border ${hovered ? 'opacity-100' : 'opacity-60'}`} />
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
      </motion.div>
      <motion.div className="relative" aria-label="Exercise Reference Video" layout style={{ y: parallaxY }}>
        <ExerciseVideo />
        <div className="absolute top-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          Ideal Movement
        </div>
      </motion.div>
    </motion.div>
  )
}
