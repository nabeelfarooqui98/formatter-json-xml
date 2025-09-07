import { useCallback, useMemo, useState } from 'react'
import xmlFormat from 'xml-formatter'

export type XmlAction = 'Format' | 'Minify' | 'Copy' | 'Clear' | ''

export function useXmlFormatter() {
  const [error, setError] = useState<string>('')
  const [lastAction, setLastAction] = useState<XmlAction>('')
  const [lastActionAt, setLastActionAt] = useState<number>(0)
  const [lastDurationMs, setLastDurationMs] = useState<number>(0)

  const format = useCallback((input: string): string | null => {
    const start = performance.now()
    try {
      const out = xmlFormat(input, { indentation: '  ' })
      setError('')
      setLastAction('Format')
      setLastActionAt(Date.now())
      setLastDurationMs(Math.max(0, performance.now() - start))
      return out
    } catch (e) {
      const msg = (e as Error).message.split('\n')[0]
      setError(`Invalid XML: ${msg}`)
      return null
    }
  }, [])

  const minify = useCallback((input: string): string | null => {
    const start = performance.now()
    try {
      const out = xmlFormat(input, { indentation: '' })
      setError('')
      setLastAction('Minify')
      setLastActionAt(Date.now())
      setLastDurationMs(Math.max(0, performance.now() - start))
      return out
    } catch (e) {
      const msg = (e as Error).message.split('\n')[0]
      setError(`Invalid XML: ${msg}`)
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


