export function useMotionVariants() {
  const container = {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: 'tween', duration: 0.35, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.06 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 26 } },
  }

  const feedback = {
    hidden: { opacity: 0, x: 20, y: 6 },
    show: { opacity: 1, x: 0, y: 0, transition: { type: 'tween', duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, x: 10, scale: 0.98, transition: { duration: 0.2 } },
  }

  return { container, fadeUp, scaleIn, feedback }
}
