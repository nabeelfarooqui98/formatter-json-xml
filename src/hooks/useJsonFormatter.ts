import { useCallback, useMemo, useState } from 'react'

export type JsonAction = 'Format' | 'Minify' | 'Copy' | 'Clear' | ''

export function useJsonFormatter() {
  const [error, setError] = useState<string>('')
  const [lastAction, setLastAction] = useState<JsonAction>('')
  const [lastActionAt, setLastActionAt] = useState<number>(0)
  const [lastDurationMs, setLastDurationMs] = useState<number>(0)

  const format = useCallback((input: string): string | null => {
    const start = performance.now()
    try {
      const obj = JSON.parse(input)
      const out = JSON.stringify(obj, null, 2)
      setError('')
      setLastAction('Format')
      setLastActionAt(Date.now())
      setLastDurationMs(Math.max(0, performance.now() - start))
      return out
    } catch (e) {
      const msg = (e as Error).message.split('\n')[0]
      setError(`Invalid JSON: ${msg}`)
      return null
    }
  }, [])

  const minify = useCallback((input: string): string | null => {
    const start = performance.now()
    try {
      const obj = JSON.parse(input)
      const out = JSON.stringify(obj)
      setError('')
      setLastAction('Minify')
      setLastActionAt(Date.now())
      setLastDurationMs(Math.max(0, performance.now() - start))
      return out
    } catch (e) {
      const msg = (e as Error).message.split('\n')[0]
      setError(`Invalid JSON: ${msg}`)
      return null
    }
  }, [])

  const relative = useMemo(() => {
    if (!lastActionAt) return ''
    const diff = Math.max(0, Date.now() - lastActionAt)
    if (diff < 1000) return 'just now'
    return `${Math.round(diff / 1000)}s ago`
  }, [lastActionAt])

  return { format, minify, error, setError, lastAction, lastActionAt, lastDurationMs, relative }
}


