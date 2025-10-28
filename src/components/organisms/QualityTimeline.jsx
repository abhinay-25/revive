import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts'
import { useAppStore } from '@/store/useAppStore'

const colorForQuality = (q) => {
  if (q >= 90) return '#00FFAA' // excellent
  if (q >= 70) return '#FFD700' // average
  return '#FF4C4C' // poor
}

function TooltipContent({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  const p = payload[0]?.payload
  return (
    <div className="glass rounded-xl p-3 border border-white/10 min-w-48">
      <div className="text-xs text-white/60 mb-1">
        Rep {p?.repInSet} {p?.setNumber ? `(Set ${p.setNumber})` : ''}
      </div>
      <div className="text-sm font-semibold text-white">
        Quality: {p?.quality}% {p?.emoji || ''}
      </div>
      {p?.feedback && <div className="text-xs text-white/70 mt-1">{p.feedback}</div>}
    </div>
  )
}

export default function QualityTimeline() {
  const history = useAppStore((s) => s.repHistory)
  const repCount = useAppStore((s) => s.repCount)
  const currentSet = useAppStore((s) => s.currentSet)
  const totalReps = useAppStore((s) => s.totalReps)

  // Build a windowed dataset (e.g., last 40 entries) for performance
  const data = useMemo(() => history.slice(-60), [history])

  // Dynamic width so bars have breathing room; fallback min width for mobile horizontal scroll
  const chartWidth = Math.max(360, data.length * 28)

  const lastId = data.length ? data[data.length - 1].id : null

  return (
    <motion.div
      layout
      className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg shadow-2xl overflow-hidden"
      role="region"
      aria-labelledby="timeline-title"
      aria-describedby="timeline-desc"
    >
      <div className="px-4 pt-3 flex items-center justify-between">
        <div id="timeline-title" className="text-sm font-medium text-white/80">
          Performance Timeline
        </div>
        <div className="text-xs text-white/60">
          Set {currentSet} • {repCount}/{totalReps}
        </div>
      </div>
      <div id="timeline-desc" className="sr-only">
        Bar chart showing quality per repetition. Use tap or hover to reveal details.
      </div>
      <div className="w-full overflow-x-auto">
        <div style={{ width: chartWidth }} className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 14, right: 8, left: 8, bottom: 8 }}>
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="id"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              />
              <YAxis domain={[0, 100]} hide />
              <Tooltip content={<TooltipContent />} cursor={{ fill: 'rgba(255,255,255,0.06)' }} />
              <Bar
                dataKey="quality"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={300}
              >
                {data.map((d) => (
                  <Cell
                    key={`cell-${d.id}`}
                    fill={colorForQuality(d.quality)}
                    filter={d.id === lastId ? 'url(#glow)' : undefined}
                  />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="quality"
                stroke="#8AB4FF"
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
              <ReferenceLine y={90} stroke="rgba(0,255,170,0.4)" strokeDasharray="3 3" />
              <ReferenceLine y={70} stroke="rgba(255,215,0,0.35)" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="px-4 pb-3 text-xs text-white/60">
        <span
          className="inline-block w-2 h-2 rounded-full mr-1"
          style={{ background: '#00FFAA' }}
        />{' '}
        Excellent
        <span
          className="inline-block w-2 h-2 rounded-full mx-3"
          style={{ background: '#FFD700' }}
        />{' '}
        Average
        <span
          className="inline-block w-2 h-2 rounded-full mr-1"
          style={{ background: '#FF4C4C' }}
        />{' '}
        Poor
      </div>
    </motion.div>
  )
}
