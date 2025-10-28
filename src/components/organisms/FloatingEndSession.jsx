import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import { motion } from 'framer-motion'

// A viewport-fixed End Session button for desktop/tablet to avoid wobble/overlap
export default function FloatingEndSession() {
  const setEndModalOpen = useAppStore((s) => s.setEndModalOpen)
  return (
    <motion.div
      className="hidden md:block fixed right-6 top-20 z-[60]"
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 150 }}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative"
      >
        {/* Glowing aura on hover */}
        <motion.div
          className="absolute -inset-2 rounded-lg blur-xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
            backgroundSize: '200% 200%',
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.7 }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 0.3 },
          }}
        />

        {/* Holographic Shimmer Sweep */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden opacity-40 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['-200% 0%', '200% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 0.5,
          }}
        />

        <Button
          variant="secondary"
          className="relative shadow-2xl backdrop-blur-md border overflow-hidden font-semibold text-white px-6 py-3 text-base"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9))',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
          }}
          aria-label="End session — opens summary modal"
          onClick={() => setEndModalOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(168, 85, 247, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 20px rgba(99, 102, 241, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <span className="relative z-10 drop-shadow-lg">End Session</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
