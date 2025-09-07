import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toast from './Toast'

export type EditorMode = 'json' | 'xml'

type EditorProps = {
  mode: EditorMode
  format: (input: string) => string | null
  minify: (input: string) => string | null
  error: string
  clearError: () => void
  onActionMeta: (action: 'Format' | 'Minify' | 'Copy' | 'Clear', durationMs: number) => void
}

const SAMPLE_JSON = '{\n  "name": "Ada",\n  "skills": ["math", "logic"],\n  "active": true\n}'
const SAMPLE_XML = '<user>\n  <name>Ada</name>\n  <skills>\n    <skill>math</skill>\n    <skill>logic</skill>\n  </skills>\n  <active>true</active>\n</user>'

export default function Editor({ mode, format, minify, error, clearError, onActionMeta }: EditorProps) {
  const [value, setValue] = useState('')
  const [showToast, setShowToast] = useState(false)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const stats = useMemo(() => {
    const chars = value.length
    const lines = value.split(/\r?\n/).length
    return { chars, lines }
  }, [value])

  const doFormat = useCallback(() => {
    const start = performance.now()
    const out = format(value)
    const dur = Math.max(0, performance.now() - start)
    if (out != null) setValue(out)
    onActionMeta('Format', dur)
  }, [format, onActionMeta, value])

  const doMinify = useCallback(() => {
    const start = performance.now()
    const out = minify(value)
    const dur = Math.max(0, performance.now() - start)
    if (out != null) setValue(out)
    onActionMeta('Minify', dur)
  }, [minify, onActionMeta, value])

  const doCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 1200)
    } catch {}
    onActionMeta('Copy', 0)
  }, [value, onActionMeta])

  const doClear = useCallback(() => {
    setValue('')
    onActionMeta('Clear', 0)
  }, [onActionMeta])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey
      if (!isCtrl) return
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          e.preventDefault()
          doMinify()
        } else {
          e.preventDefault()
          doFormat()
        }
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault()
        doClear()
      } else if (e.key.toLowerCase() === 'c' && document.activeElement === textRef.current) {
        e.preventDefault()
        doCopy()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [doClear, doCopy, doFormat, doMinify])

  const insertSampleJson = useCallback(() => setValue(SAMPLE_JSON), [])
  const insertSampleXml = useCallback(() => setValue(SAMPLE_XML), [])

  useEffect(() => { clearError() }, [value, clearError])

  return (
    <div>
      <textarea
        ref={textRef}
        className="area"
        placeholder={mode === 'json' ? 'Paste JSON here…' : 'Paste XML here…'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="toolbar">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={doFormat} disabled={!value}>Format</button>
          <button className="btn" onClick={doMinify} disabled={!value}>Minify</button>
          <button className="btn" onClick={doCopy} disabled={!value}>Copy</button>
          <button className="btn" onClick={doClear} disabled={!value}>Clear</button>
        </div>
        <div className="counter">chars: {stats.chars} · lines: {stats.lines}</div>
      </div>

      {error && (
        <div className="alert" role="alert">{error}</div>
      )}

      <div className="helper-links">
        {mode === 'json' && (
          <a href="#" onClick={(e) => { e.preventDefault(); insertSampleJson() }}>Sample JSON</a>
        )}
        {mode === 'xml' && (
          <a href="#" onClick={(e) => { e.preventDefault(); insertSampleXml() }}>Sample XML</a>
        )}
      </div>

      <Toast message="Copied!" show={showToast} />
    </div>
  )
}


