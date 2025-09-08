import { useCallback, useEffect, useMemo, useState } from 'react'
import './styles.css'
import Tabs, { type TabKey } from './components/Tabs'
import Editor from './components/Editor'
import { useJsonFormatter } from './hooks/useJsonFormatter'
import { useXmlFormatter } from './hooks/useXmlFormatter'

function App() {
  const [active, setActive] = useState<TabKey>('json')

  const json = useJsonFormatter()
  const xml = useXmlFormatter()

  const [meta, setMeta] = useState<{ action: string; when: number; ms: number }>({ action: '', when: 0, ms: 0 })

  const onActionMeta = useCallback((action: 'Format' | 'Minify' | 'Copy' | 'Clear', ms: number) => {
    setMeta({ action, when: Date.now(), ms })
  }, [])

  const relative = useMemo(() => {
    if (!meta.when || !meta.action) return ''
    const diff = Math.max(0, Date.now() - meta.when)
    if (diff < 1000) return 'just now'
    return `${Math.round(diff / 1000)}s ago`
  }, [meta])

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null
    const next = current === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="brand">JSON/XML Formatter</div>
        <div className="actions">
          <a className="link" href="https://github.com/nabeelfarooqui98/formatter-json-xml" target="_blank" rel="noreferrer">GitHub</a>
          <button className="theme-toggle" onClick={toggleTheme}>Theme</button>
        </div>
      </div>

      <div className="card">
        <Tabs active={active} onChange={setActive} />

        {active === 'json' ? (
          <Editor
            mode="json"
            format={json.format}
            minify={json.minify}
            error={json.error}
            clearError={() => json.setError('')}
            onActionMeta={onActionMeta}
          />
        ) : (
          <Editor
            mode="xml"
            format={xml.format}
            minify={xml.minify}
            error={xml.error}
            clearError={() => xml.setError('')}
            onActionMeta={onActionMeta}
          />
        )}

        <div className="status-strip">
          <div>Tab: {active.toUpperCase()}</div>
          {meta.action && (
            <div>Last: {meta.action} · {relative}</div>
          )}
          {meta.action && (
            <div>Render: {Math.round(meta.ms)} ms</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
