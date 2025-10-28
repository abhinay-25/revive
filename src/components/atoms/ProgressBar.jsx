import React from 'react'
import * as Progress from '@radix-ui/react-progress'
import { cn } from '../../lib/cn'

export default function ProgressBar({ value = 0, className }) {
  return (
    <Progress.Root className={cn('relative overflow-hidden bg-white/10 rounded-full w-full h-2', className)} value={value}>
      <Progress.Indicator className="h-full gradient-brand" style={{ width: `${value}%` }} />
    </Progress.Root>
  )
}
