import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  "Push harder. You're stronger than you think. 💪",
  'Every rep counts. Keep moving. ⚡',
  'Your body achieves what your mind believes. 🔥',
  'Progress, not perfection. Keep grinding. 🏋️',
  'Discipline beats motivation. Every. Single. Time. 🚀',
]

export default function QuoteHero() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
      setIsTyping(true)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    setDisplayText('')
    setIsTyping(true)
    let index = 0
    const quote = quotes[currentQuote]

    const typewriterInterval = setInterval(() => {
      if (index < quote.length) {
        setDisplayText(quote.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typewriterInterval)
      }
    }, 50)

    return () => clearInterval(typewriterInterval)
  }, [currentQuote])

  return (
    <div className="w-full py-6 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, #a855f7, #ec4899, #f59e0b, #a855f7)',
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* Glowing underline */}
          <motion.div
            className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
            style={{ width: '60%', transform: 'translateX(-50%)' }}
            animate={{
              opacity: [0.5, 1, 0.5],
              width: ['50%', '70%', '50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-4 pb-4"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(251, 191, 36, 0.2)',
              filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
          >
            {displayText.split('').map((char, index) => (
              <motion.span
                key={`${currentQuote}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.03,
                  ease: 'easeOut',
                }}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
            {isTyping && (
              <motion.span
                className="inline-block w-1 h-8 ml-1 bg-yellow-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.h2>

          {/* Particle effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-400/60"
              style={{
                left: `${20 + i * 12}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
