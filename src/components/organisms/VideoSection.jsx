import React, { useState, useMemo } from 'react'
import CameraFeed from '../CameraFeed'
import ExerciseVideo from '../ExerciseVideo'
import { motion, useScroll, useTransform } from 'framer-motion'
import { variants } from '@/motion/motionSystem'
import { useAppStore } from '@/store/useAppStore'

export default function VideoSection() {
  const [hoveredCamera, setHoveredCamera] = useState(false)
  const [hoveredVideo, setHoveredVideo] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const demoMode = useAppStore((s) => s.demoMode)
  const aiStatus = useAppStore((s) => s.aiStatus)
  const analyzing = useAppStore((s) => s.analyzing)
  const sessionActive = useAppStore((s) => s.sessionActive)

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={variants.itemScaleIn}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Camera Feed */}
      <motion.div
        className="relative group"
        aria-label="Live Camera Feed"
        onHoverStart={() => setHoveredCamera(true)}
        onHoverEnd={() => setHoveredCamera(false)}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ scale: 1.02, rotateY: 2 }}
        layout
        style={{
          y: parallaxY,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Glowing border when analyzing */}
        {analyzing && (
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-lg"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: hoveredCamera ? ['-100%', '100%'] : 0,
            opacity: hoveredCamera ? 1 : 0,
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 0.3 },
          }}
        />

        <div className="relative z-10">
          <CameraFeed />
        </div>

        {/* Status pill */}
        <motion.div
          className="absolute bottom-4 left-4 z-30 text-sm font-medium px-4 py-2 rounded-full border shadow-lg backdrop-blur-xl"
          style={{
            background: sessionActive
              ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.3))'
              : 'linear-gradient(135deg, rgba(100, 116, 139, 0.2), rgba(71, 85, 105, 0.3))',
            borderColor: sessionActive ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.1)',
          }}
          animate={{
            boxShadow: sessionActive
              ? [
                  '0 0 10px rgba(34, 197, 94, 0.3)',
                  '0 0 20px rgba(34, 197, 94, 0.6)',
                  '0 0 10px rgba(34, 197, 94, 0.3)',
                ]
              : '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className={sessionActive ? 'text-emerald-300' : 'text-slate-300'}>
            {demoMode ? '🎬 Demo Mode Active' : aiStatus || 'Tracking Active'}
          </span>
        </motion.div>
      </motion.div>

      {/* Exercise Reference Video */}
      <motion.div
        className="relative group"
        aria-label="Exercise Reference Video"
        onHoverStart={() => setHoveredVideo(true)}
        onHoverEnd={() => setHoveredVideo(false)}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        layout
        style={{
          y: parallaxY,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
        whileHover={{ scale: 1.02, rotateY: -2 }}
      >
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: hoveredVideo ? ['-100%', '100%'] : 0,
            opacity: hoveredVideo ? 1 : 0,
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 0.3 },
          }}
        />

        <div className="relative z-10">
          <ExerciseVideo />
        </div>

        <motion.div
          className="absolute top-4 left-4 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-400/30 shadow-lg backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.3))',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-indigo-300">✨ Ideal Movement</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
