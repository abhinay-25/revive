import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const SIZE = 112 // px
const STROKE = 10
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R

export default function QualityRing({ value = 0 }) {
  const clamped = Math.max(0, Math.min(100, value))
  const offset = useMemo(() => CIRC * (1 - clamped / 100), [clamped])
  const color = clamped >= 85 ? '#10B981' : clamped >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ width: SIZE, height: SIZE }} className="relative">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={STROKE}
          fill="none"
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, strokeDasharray: CIRC, strokeDashoffset: CIRC }}
          animate={{ pathLength: clamped / 100, strokeDashoffset: offset, scale: [1, 1.05, 1] }}
          transition={{ duration: 1.0, ease: [0.37, 0, 0.63, 1] }}
          style={{ rotate: -90, originX: '50%', originY: '50%' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xl font-bold text-white">{clamped}%</div>
      </div>
    </div>
  )
}
