import React from 'react'
import { motion } from 'framer-motion'

export default function ParticleBurst({ triggerKey }) {
  // deterministic PRNG (mulberry32) seeded by triggerKey
  function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  const seed = typeof triggerKey === 'number' ? triggerKey : String(triggerKey).split('').reduce((acc,c)=>acc+c.charCodeAt(0),0)
  const rng = mulberry32(seed)
  const particles = Array.from({ length: 10 }, (_, i) => ({ id: i, angle: (i / 10) * Math.PI * 2, r: 40 + rng() * 20 }))
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((p) => (
        <motion.span
          key={`${triggerKey}-${p.id}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/80"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.r,
            y: Math.sin(p.angle) * p.r,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'linear' }}
          style={{ left: '50%', top: '50%' }}
        />
      ))}
    </div>
  )
}
