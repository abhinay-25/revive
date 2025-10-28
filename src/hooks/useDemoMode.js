import { useAppStore } from '@/store/useAppStore'

// Simple convenience hook around demo state
export function useDemoMode() {
  const demoMode = useAppStore((s) => s.demoMode)
  const setDemoMode = useAppStore((s) => s.setDemoMode)
  const demoSpeed = useAppStore((s) => s.demoSpeed)
  const setDemoSpeed = useAppStore((s) => s.setDemoSpeed)
  const toggleDemoMode = () => setDemoMode(!demoMode)
  return { demoMode, toggleDemoMode, setDemoMode, demoSpeed, setDemoSpeed }
}
