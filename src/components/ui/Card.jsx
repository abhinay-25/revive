import React from 'react'
import { cn } from '../../lib/cn'

export function Card({ className, ...props }) {
  return <div className={cn('glass rounded-2xl p-4 shadow-ai', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('mb-2 text-sm text-white/60', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('', className)} {...props} />
}
