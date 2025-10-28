import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useFeedback() {
  const repCount = useAppStore((s) => s.repCount)
  return useMemo(() => {
    if (repCount === 0) return 'Let\'s begin! Maintain neutral spine.'
    if (repCount < 5) return 'Great start. Smooth tempo.'
    return 'Excellent flow. Keep breathing.'
  }, [repCount])
}
