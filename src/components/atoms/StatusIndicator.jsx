import React from 'react'
import { cn } from '../../lib/cn'

export default function StatusIndicator({ status = 'active', className }) {
  const color = status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
  return (
    <div className={cn('rounded-full px-3 py-1 text-xs font-medium border border-white/10', color, className)}>
      {status === 'active' ? 'Active' : 'Paused'}
    </div>
  )
}
