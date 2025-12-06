import { useState } from 'react'
import './App.css'
import { convertTcvn3ToUnicode, convertUnicodeToTcvn3 } from './utils/converter'

function App() {
  // Top section: TCVN3 to Unicode
  const [tcvn3Input, setTcvn3Input] = useState('')
  const [unicodeOutput, setUnicodeOutput] = useState('')

  // Bottom section: Unicode to TCVN3
  const [unicodeInput, setUnicodeInput] = useState('')
  const [tcvn3Output, setTcvn3Output] = useState('')

  // Translation history
  const [history, setHistory] = useState([])

  // Handle TCVN3 input change (no auto-convert)
  const handleTcvn3InputChange = (e) => {
    setTcvn3Input(e.target.value)
  }

  // Handle Enter key in TCVN3 input (Enter to translate, Shift+Enter for new line)
  const handleTcvn3InputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTranslateTcvn3ToUnicode()
    }
  }

  // Handle Unicode output change (allow editing)
  const handleUnicodeOutputChange = (e) => {
    setUnicodeOutput(e.target.value)
  }

  // Handle Unicode input change (no auto-convert)
  const handleUnicodeInputChange = (e) => {
    setUnicodeInput(e.target.value)
  }

  // Handle Enter key in Unicode input (Enter to translate, Shift+Enter for new line)
  const handleUnicodeInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTranslateUnicodeToTcvn3()
    }
  }

  // Handle TCVN3 output change (allow editing)
  const handleTcvn3OutputChange = (e) => {
    setTcvn3Output(e.target.value)
  }

  // Translate TCVN3 to Unicode
  const handleTranslateTcvn3ToUnicode = () => {
    if (!tcvn3Input.trim()) return
    
    const result = convertTcvn3ToUnicode(tcvn3Input)
    setUnicodeOutput(result)
    
    // Add to history
    setHistory(prev => [
      {
        id: Date.now(),
        type: 'tcvn3-to-unicode',
        input: tcvn3Input,
        output: result,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      },
      ...prev
    ])
  }

  // Translate Unicode to TCVN3
  const handleTranslateUnicodeToTcvn3 = () => {
    if (!unicodeInput.trim()) return
    
    const result = convertUnicodeToTcvn3(unicodeInput)
    setTcvn3Output(result)
    
    // Add to history
    setHistory(prev => [
      {
        id: Date.now() + 1,
        type: 'unicode-to-tcvn3',
        input: unicodeInput,
        output: result,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      },
      ...prev
    ])
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Chuyển đổi TCVN3 ↔ Unicode</h1>
        
        <div className="main-content">
          <div className="converter-sections">
            {/* Top Section: TCVN3 to Unicode */}
            <div className="converter-section">
              <div className="section-header">
                <h2>TCVN3 → Unicode</h2>
              </div>
              
              <div className="input-pair">
                <div className="input-group">
                  <label>TCVN3</label>
                  <textarea
                    className="input-field"
                    value={tcvn3Input}
                    onChange={handleTcvn3InputChange}
                    onKeyDown={handleTcvn3InputKeyDown}
                    placeholder="Nhập văn bản TCVN3..."
                  />
                  <button 
                    className="translate-btn"
                    onClick={handleTranslateTcvn3ToUnicode}
                    disabled={!tcvn3Input.trim()}
                  >
                    Dịch
                  </button>
                </div>
                
                <div className="input-group">
                  <label>Unicode</label>
                  <textarea
                    className="input-field"
                    value={unicodeOutput}
                    onChange={handleUnicodeOutputChange}
                    placeholder="Kết quả Unicode sẽ hiển thị ở đây..."
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Unicode to TCVN3 */}
            <div className="converter-section">
              <div className="section-header">
                <h2>Unicode → TCVN3</h2>
              </div>
              
              <div className="input-pair">
                <div className="input-group">
                  <label>Unicode</label>
                  <textarea
                    className="input-field"
                    value={unicodeInput}
                    onChange={handleUnicodeInputChange}
                    onKeyDown={handleUnicodeInputKeyDown}
                    placeholder="Nhập văn bản Unicode..."
                  />
                  <button 
                    className="translate-btn"
                    onClick={handleTranslateUnicodeToTcvn3}
                    disabled={!unicodeInput.trim()}
                  >
                    Dịch
                  </button>
                </div>
                
                <div className="input-group">
                  <label>TCVN3</label>
                  <textarea
                    className="input-field"
                    value={tcvn3Output}
                    onChange={handleTcvn3OutputChange}
                    placeholder="Kết quả TCVN3 sẽ hiển thị ở đây..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="history-section">
            <h2>Lịch sử dịch</h2>
            {history.length === 0 ? (
              <div className="history-empty">
                <p>Chưa có lịch sử dịch</p>
              </div>
            ) : (
              <div className="history-list">
                {history.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-header">
                      <span className="history-type">
                        {item.type === 'tcvn3-to-unicode' ? 'TCVN3 → Unicode' : 'Unicode → TCVN3'}
                      </span>
                      <span className="history-time">{item.timestamp}</span>
                    </div>
                    <div className="history-content">
                      <div className="history-input">
                        <strong>Input:</strong> {item.input}
                      </div>
                      <div className="history-output">
                        <strong>Output:</strong> {item.output}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
