import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  'Push yourself, because no one else is going to do it for you.',
  'Your only limit is your mind.',
  'Every rep brings you closer to a stronger you.',
  'Progress, not perfection.',
  'Discipline beats motivation — one rep at a time.',
  'Small steps today, stronger tomorrow.',
]

export default function MotivationalQuote() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setDisplayText('')
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 10000)
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
    }, 40) // 40ms per character for smooth typing

    return () => clearInterval(typingInterval)
  }, [currentIndex, isTyping])

  return (
    <motion.div
      className="fixed bottom-44 md:bottom-36 left-1/2 -translate-x-1/2 z-[45] w-[90%] md:w-auto max-w-4xl pointer-events-none"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1, type: 'spring', stiffness: 100 }}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        className="relative backdrop-blur-md bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-blue-900/40 dark:from-purple-900/50 dark:via-indigo-900/40 dark:to-blue-900/50 rounded-3xl px-8 py-4 border border-white/20 shadow-2xl"
        animate={{
          y: [0, -6, 0],
          boxShadow: [
            '0 10px 40px rgba(139,92,246,0.3)',
            '0 15px 50px rgba(99,102,241,0.4)',
            '0 10px 40px rgba(139,92,246,0.3)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Holographic Shimmer Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Pulsing Glow Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 20px rgba(139,92,246,0.4), inset 0 0 20px rgba(139,92,246,0.1)',
              '0 0 40px rgba(168,85,247,0.6), inset 0 0 30px rgba(168,85,247,0.2)',
              '0 0 20px rgba(139,92,246,0.4), inset 0 0 20px rgba(139,92,246,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative text-center">
          <motion.div
            className="text-lg md:text-2xl font-bold tracking-wide"
            style={{
              background: 'linear-gradient(90deg, #ec4899, #a855f7, #3b82f6, #06b6d4)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            💬 &ldquo;{displayText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
            &rdquo;
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
