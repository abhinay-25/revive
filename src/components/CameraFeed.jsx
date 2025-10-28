import React from 'react'
import { Camera } from 'lucide-react'

export default function CameraFeed() {
  return (
    <div className="glass rounded-xl p-4 w-full aspect-video flex items-center justify-center">
      <div className="flex items-center gap-2 text-white/70">
        <Camera className="w-6 h-6" />
        <span>Camera feed placeholder</span>
      </div>
    </div>
  )
}
