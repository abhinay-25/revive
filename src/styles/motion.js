// Motion tokens and presets for consistent animations
export const transitions = {
  quick: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  base: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  slow: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export const springs = {
  soft: { type: 'spring', stiffness: 220, damping: 22 },
  firm: { type: 'spring', stiffness: 320, damping: 24 },
}

export const variants = {
  floatIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: transitions.base,
  },
}
