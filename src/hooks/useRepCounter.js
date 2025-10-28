import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useRepCounter(active = true) {
  const setRepCount = useAppStore((s) => s.setRepCount)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setRepCount((c) => (typeof c === 'number' ? c + 1 : 1))
    }, 2000)
    return () => clearInterval(id)
  }, [active, setRepCount])
}
