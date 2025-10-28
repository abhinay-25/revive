import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  'Progress, not perfection.',
  'Every rep brings you closer to your goal.',
  "Push harder. You're stronger than you think.",
  'Form first, power next.',
  'Discipline is your best trainer.',
]

export default function ScrollQuoteSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setDisplayText('')
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return
    const quote = quotes[currentIndex]
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex < quote.length) {
        setDisplayText(quote.substring(0, charIndex + 1))
        charIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [currentIndex, isTyping])

  return (
    <motion.div
      className="fixed bottom-[5%] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        className="relative backdrop-blur-xl bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-pink-900/50 rounded-3xl px-8 py-6 border border-white/20 shadow-2xl"
        animate={{
          boxShadow: [
            '0 20px 60px rgba(139,92,246,0.3)',
            '0 25px 70px rgba(168,85,247,0.5)',
            '0 20px 60px rgba(139,92,246,0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Gradient Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)',
            backgroundSize: '300% 100%',
            opacity: 0.3,
            filter: 'blur(20px)',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="relative text-center">
          <motion.div
            className="font-bold tracking-wide"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(0,0,0,0.4)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            💪 {displayText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: '#fbbf24' }}
              >
                |
              </motion.span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
