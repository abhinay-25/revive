import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Camera, Timer } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function CameraFeed() {
  const demoMode = useAppStore((s) => s.demoMode)
  const keypoints = useAppStore((s) => s.demoKeypoints)
  const secondsElapsed = useAppStore((s) => s.secondsElapsed)
  const sessionActive = useAppStore((s) => s.sessionActive)
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [camError, setCamError] = useState(null)
  const [videoReady, setVideoReady] = useState(false)
  const [hasStream, setHasStream] = useState(false)

  const timeText = useMemo(() => {
    const m = Math.floor(secondsElapsed / 60)
    const s = secondsElapsed % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [secondsElapsed])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const w = canvas.width
    const h = canvas.height
    // Fade previous frame for motion trails
    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.fillRect(0, 0, w, h)
    if (!demoMode || !keypoints || keypoints.length === 0) return
    // Simple normalization: assume points are roughly in a 100-200 px range; map into canvas
    // For mock points already pre-scaled, just draw relative to canvas center offset
    const cx = w / 2
    const cy = h / 2
    const scale = Math.min(w, h) / 600 // rough scale

    const pts = keypoints.map((p) => ({
      x: cx + (p.x - 140) * scale,
      y: cy + (p.y - 230) * scale,
      c: p.confidence ?? 1,
    }))

    // Draw connections (a simple chain between points for this mock)
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(56,189,248,0.8)'
    ctx.shadowBlur = 12
    ctx.shadowColor = 'rgba(56,189,248,0.8)'
    ctx.beginPath()
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      if (i === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()

    // Draw points
    for (const p of pts) {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(168,85,247,0.9)'
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle = 'white'
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }
    // reset shadows for future clears
    ctx.shadowBlur = 0
  }, [demoMode, keypoints])

  // When not in demo mode, attempt to access the camera and show a live feed
  useEffect(() => {
    if (demoMode) return
    const video = videoRef.current
    if (!video) return
    let stream
    const onPlaying = () => {
      setVideoReady(true)
      setCamError(null)
    }
    const onLoaded = () => {
      /* some browsers fire loadedmetadata before play */
      /* keep videoReady as-is until playing fires */
    }
    async function start() {
      try {
        setCamError(null)
        setVideoReady(false)
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        })
        video.srcObject = stream
        // indicate we successfully obtained a MediaStream (permission granted)
        setHasStream(true)
        video.addEventListener('playing', onPlaying)
        video.addEventListener('loadedmetadata', onLoaded)
        await video.play().catch(() => {})
      } catch (e) {
        console.error('Camera error', e)
        // If user granted access but play was interrupted, avoid showing stale error
        if (e?.name === 'AbortError') return
        setCamError(e?.name || 'CameraError')
      }
    }
    start()
    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('loadedmetadata', onLoaded)
      if (stream) {
        stream.getTracks()?.forEach((t) => t.stop())
      }
      setHasStream(false)
    }
  }, [demoMode])

  return (
    <div
      ref={containerRef}
      className="glass rounded-xl p-0 w-full aspect-video relative flex items-center justify-center overflow-hidden"
    >
      {/* Live camera feed underneath when not in demo */}
      {!demoMode && (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
          />
          {/* Placeholder / permission UI */}
          {!videoReady && (
            <div className="absolute inset-0 grid place-items-center bg-black/30 transition-opacity duration-300">
              {/* If we have a stream but autoplay/play didn't start, offer a gentle CTA to start the camera */}
              {hasStream && !camError ? (
                <div className="flex flex-col items-center gap-3 text-white/90">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <Camera className="w-6 h-6" />
                    <span>Camera ready — tap to start</span>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await videoRef.current.play()
                        // If play succeeds, 'playing' event will mark ready
                      } catch (e) {
                        // If play is blocked, still clear camError to avoid stale message
                        console.warn('Play prevented', e)
                        setCamError(null)
                      }
                    }}
                    className="mt-1 px-4 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/10"
                  >
                    Start Camera
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white/80">
                  <Camera className="w-6 h-6" />
                  <span>
                    {camError
                      ? `Camera error: ${String(camError)}`
                      : 'Allow camera access to see live feed'}
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {/* Canvas overlay for demo skeleton */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Embedded Timer in Corner */}
      <motion.div
        className="absolute top-3 right-3 z-30 backdrop-blur-xl rounded-lg shadow-lg flex items-center gap-2 px-3 py-2 border"
        style={{
          background: sessionActive
            ? 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))'
            : 'linear-gradient(135deg, rgba(30,41,59,0.7), rgba(15,23,42,0.7))',
          borderColor: sessionActive ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.1)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Timer className={`w-4 h-4 ${sessionActive ? 'text-cyan-400' : 'text-slate-400'}`} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={timeText}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-lg font-mono font-semibold tracking-tight ${
              sessionActive ? 'text-cyan-300' : 'text-slate-300'
            }`}
            style={{ display: 'inline-block' }}
          >
            {timeText}
          </motion.span>
        </AnimatePresence>
        {sessionActive && (
          <motion.div
            className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-sm -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  )
}
