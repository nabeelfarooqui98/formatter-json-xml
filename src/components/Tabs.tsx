import { useEffect } from 'react'

export type TabKey = 'json' | 'xml'

type TabsProps = {
  active: TabKey
  onChange: (tab: TabKey) => void
}

export default function Tabs({ active, onChange }: TabsProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey
      if (!isCtrl) return
      if (e.key === '1') {
        e.preventDefault()
        onChange('json')
      } else if (e.key === '2') {
        e.preventDefault()
        onChange('xml')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onChange])

  return (
    <div className="tabs" role="tablist" aria-label="Format type">
      <button
        className={`tab ${active === 'json' ? 'active' : ''}`}
        role="tab"
        aria-selected={active === 'json'}
        onClick={() => onChange('json')}
      >
        JSON
      </button>
      <button
        className={`tab ${active === 'xml' ? 'active' : ''}`}
        role="tab"
        aria-selected={active === 'xml'}
        onClick={() => onChange('xml')}
      >
        XML
      </button>
    </div>
  )
}


