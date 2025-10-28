import React from 'react'
import MetricCard from '../MetricCard'
import { Progress as ProgressBar } from '@/components/ui/progress'

export default function ExerciseStatsPanel() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <MetricCard label="Reps Completed" value="08 / 12" />
      <MetricCard label="Sets" value="2 / 3" />
      <MetricCard label="Timer" value="02:35" />
      <MetricCard label="Status" value="Active" hint="Auto-detect" />
      <MetricCard label="Quality Score" value="96%">
        <ProgressBar value={96} />
      </MetricCard>
    </div>
  )
}
