import * as React from 'react'
import { cn } from '@/lib/utils'

function Badge({ className, variant = 'default', children, ...props }) {
  const base =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors'
  const styles = {
    default: 'border-white/10 bg-white/10 text-white',
    success: 'border-emerald-400/30 bg-emerald-400/15 text-emerald-200',
    warning: 'border-yellow-400/30 bg-yellow-400/15 text-yellow-200',
    danger: 'border-red-400/30 bg-red-400/15 text-red-200',
  }
  return (
    <span className={cn(base, styles[variant], className)} {...props}>
      {children}
    </span>
  )
}

export { Badge }
