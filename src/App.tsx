import { useState } from 'react'
import './App.css'

type TabType = 'json' | 'xml'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('json')
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      setError('')
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonInput(formatted)
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const minifyJson = () => {
    try {
      setError('')
      const parsed = JSON.parse(jsonInput)
      const minified = JSON.stringify(parsed)
      setJsonInput(minified)
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleJsonChange = (value: string) => {
    setJsonInput(value)
    setError('')
  }

  return (
    <div className="app">
      <h1>JSON/XML Formatter</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          JSON
        </button>
        <button 
          className={`tab ${activeTab === 'xml' ? 'active' : ''}`}
          onClick={() => setActiveTab('xml')}
        >
          XML
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'json' && (
          <div className="json-tab">
            <textarea
              className={`json-textarea ${error ? 'error' : ''}`}
              value={error || jsonInput}
              onChange={(e) => handleJsonChange(e.target.value)}
              placeholder="Paste your JSON here..."
              rows={20}
            />
            <div className="buttons">
              <button onClick={formatJson} className="format-btn">
                Format
              </button>
              <button onClick={minifyJson} className="minify-btn">
                Minify
              </button>
            </div>
          </div>
        )}

        {activeTab === 'xml' && (
          <div className="xml-tab">
            <p>XML formatter coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
