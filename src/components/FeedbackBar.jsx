import React from 'react'
import { useAppStore } from '../store/useAppStore'

export default function FeedbackBar() {
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  return (
    <div className="glass rounded-lg px-4 py-3 text-sm text-white/90 shadow-glow">
      {aiFeedback}
    </div>
  )
}
