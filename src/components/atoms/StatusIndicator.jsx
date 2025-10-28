import React from 'react'
import { cn } from '../../lib/cn'

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
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-white/10 transition-colors duration-300',
        m.color,
        status !== 'paused' ? 'animate-pulse' : '',
        className
      )}
    >
      <span className={cn('relative inline-block w-2.5 h-2.5 rounded-full', m.dot)}>
        <span className="absolute inset-0 rounded-full opacity-50 animate-ping bg-current" />
      </span>
      {m.label}
    </div>
  )
}
