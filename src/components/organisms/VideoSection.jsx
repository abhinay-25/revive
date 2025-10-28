import React from 'react'
import CameraFeed from '../CameraFeed'
import ExerciseVideo from '../ExerciseVideo'

export default function VideoSection() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="relative" aria-label="Live Camera Feed">
        <CameraFeed />
        <div className="absolute bottom-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          Tracking posture... ✅
        </div>
      </div>
      <div className="relative" aria-label="Exercise Reference Video">
        <ExerciseVideo />
        <div className="absolute top-3 left-3 text-xs bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          Ideal Movement
        </div>
      </div>
    </div>
  )
}
