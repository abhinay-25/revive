import React from 'react'
import { useAppStore } from '../store/useAppStore'

export default function MetricsPanel() {
  const repCount = useAppStore((s) => s.repCount)
  return (
    <div className="glass rounded-xl p-4 grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-white/60">Reps</div>
        <div className="text-3xl font-bold text-primary">{repCount}</div>
      </div>
      <div>
        <div className="text-xs text-white/60">Session</div>
        <div className="text-3xl font-bold">Active</div>
      </div>
    </div>
  )
}
