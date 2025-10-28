import React, { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'
import { motion } from 'framer-motion'
import { useSoundFeedback } from '@/hooks/useSoundFeedback'

export default function StatusIndicator({ status = 'active', className }) {
  const map = {
    active: {
      label: 'Tracking Active',
      color: 'bg-emerald-500/15 text-emerald-300',
      dot: 'bg-emerald-400',
    },
    analyzing: {
      label: 'Analyzing',
      color: 'bg-yellow-500/15 text-yellow-300',
      dot: 'bg-yellow-400',
    },
    paused: {
      label: 'Paused / Lost Frame',
      color: 'bg-red-500/15 text-red-300',
      dot: 'bg-red-400',
    },
  }
  const m = map[status] || map.active
  const prev = useRef(status)
  const { chime } = useSoundFeedback()
  useEffect(() => {
    if (prev.current !== status) {
      chime()
      prev.current = status
    }
  }, [status, chime])
  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-white/10',
        m.color,
        className
      )}
      initial={false}
      animate={{
        boxShadow:
          status === 'active'
            ? ['0 0 0 0 rgba(16,185,129,0.0)', '0 0 16px 2px rgba(16,185,129,0.35)', '0 0 0 0 rgba(16,185,129,0.0)']
            : '0 0 0 0 rgba(0,0,0,0)',
        opacity: status === 'paused' ? 0.6 : 1,
      }}
      transition={{ duration: 2, repeat: status === 'active' ? Infinity : 0, ease: 'easeInOut' }}
    >
      <span className={cn('relative inline-block w-2.5 h-2.5 rounded-full', m.dot)}>
        {status === 'analyzing' && (
          <span className="absolute inset-0 rounded-full bg-current" style={{ animation: 'blink 1s steps(2, start) infinite' }} />
        )}
        <span className="absolute inset-0 rounded-full opacity-50 animate-ping bg-current" />
      </span>
      {m.label}
      <style>{'@keyframes blink { to { visibility: hidden; } }'}</style>
    </motion.div>
  )
}
