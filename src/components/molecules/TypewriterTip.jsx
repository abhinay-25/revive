import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tips = [
  'Breathe out on effort; in on return.',
  'Keep a neutral spine and a soft gaze.',
  'Slow is smooth; smooth is strong.',
]

export default function TypewriterTip() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    let i = 0
    const full = tips[index]
    setText('')
    const id = setInterval(() => {
      i++
      setText(full.slice(0, i))
      if (i >= full.length) clearInterval(id)
    }, 24)
    const rot = setTimeout(() => setIndex((v) => (v + 1) % tips.length), 6000)
    return () => { clearInterval(id); clearTimeout(rot) }
  }, [index])

  return (
    <div className="text-xs text-white/70 mt-2 min-h-[1.2em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={index} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
