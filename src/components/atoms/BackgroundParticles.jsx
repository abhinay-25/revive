import React from 'react'
import { motion } from 'framer-motion'

const dots = Array.from({ length: 8 }, (_, i) => ({ id: i, size: 120 + (i % 3) * 40, x: (i * 13) % 100, y: (i * 23) % 100 }))

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          initial={{ opacity: 0.08 }}
          animate={{
            opacity: [0.06, 0.12, 0.06],
            x: [0, 10, -10, 0],
            y: [0, -12, 10, 0],
          }}
          transition={{ duration: 18 + d.id, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12), rgba(16,185,129,0.08), transparent 60%)',
          }}
        />
      ))}
    </div>
  )
}
