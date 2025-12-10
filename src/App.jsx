import { useState } from 'react'
import './App.css'
import { convertTcvn3ToUnicode, convertUnicodeToTcvn3, translateChineseToVietnamese, translateVietnameseToChinese } from './utils/converter'

function App() {
  // Translation history
  const [history, setHistory] = useState([])

  // Chinese-Vietnamese Translation & Encoding Converter
  const [chineseText, setChineseText] = useState('')
  const [vietnameseUtf8, setVietnameseUtf8] = useState('')
  const [vietnameseTcvn3, setVietnameseTcvn3] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)


  // Handle Chinese text input change (no auto-translate)
  const handleChineseTextChange = (e) => {
    const value = e.target.value
    setChineseText(value)
  }

  // Handle Vietnamese UTF-8 input change (no auto-translate)
  const handleVietnameseUtf8Change = (e) => {
    const value = e.target.value
    setVietnameseUtf8(value)
    
    // Auto convert UTF-8 to TCVN3
    if (value.trim()) {
      const tcvn3Result = convertUnicodeToTcvn3(value)
      setVietnameseTcvn3(tcvn3Result)
    } else {
      setVietnameseTcvn3('')
    }
  }

  // Handle Vietnamese TCVN3 input change (no auto-translate)
  const handleVietnameseTcvn3Change = (e) => {
    const value = e.target.value
    setVietnameseTcvn3(value)
    
    // Auto convert TCVN3 to UTF-8
    if (value.trim()) {
      const utf8Result = convertTcvn3ToUnicode(value)
      setVietnameseUtf8(utf8Result)
    } else {
      setVietnameseUtf8('')
    }
  }

  // Translate from Chinese to Vietnamese
  const handleTranslateFromChinese = async () => {
    if (isTranslating || !chineseText.trim()) return
    
    setIsTranslating(true)
    try {
      // Translate Chinese to Vietnamese UTF-8
      const vietnameseUtf8Result = await translateChineseToVietnamese(chineseText)
      setVietnameseUtf8(vietnameseUtf8Result)
      // Convert UTF-8 to TCVN3
      const vietnameseTcvn3Result = convertUnicodeToTcvn3(vietnameseUtf8Result)
      setVietnameseTcvn3(vietnameseTcvn3Result)
      
      // Add to history
      setHistory(prev => [
        {
          id: Date.now(),
          type: 'chinese-vietnamese',
          chinese: chineseText,
          vietnameseUtf8: vietnameseUtf8Result,
          vietnameseTcvn3: vietnameseTcvn3Result,
          timestamp: new Date().toLocaleTimeString('vi-VN')
        },
        ...prev
      ])
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsTranslating(false)
    }
  }

  // Translate from Vietnamese to Chinese
  const handleTranslateFromVietnamese = async () => {
    if (isTranslating) return
    
    // Determine which Vietnamese field to use
    let vietnameseSource = ''
    if (vietnameseTcvn3.trim()) {
      // Convert TCVN3 to UTF-8 first
      vietnameseSource = convertTcvn3ToUnicode(vietnameseTcvn3)
      setVietnameseUtf8(vietnameseSource)
    } else if (vietnameseUtf8.trim()) {
      vietnameseSource = vietnameseUtf8
    } else {
      return
    }
    
    if (!vietnameseSource.trim()) return
    
    setIsTranslating(true)
    try {
      // Translate Vietnamese UTF-8 to Chinese
      const chineseResult = await translateVietnameseToChinese(vietnameseSource)
      setChineseText(chineseResult)
      
      // Ensure TCVN3 is synced
      if (vietnameseTcvn3.trim()) {
        // Keep existing TCVN3
      } else {
        const tcvn3Result = convertUnicodeToTcvn3(vietnameseSource)
        setVietnameseTcvn3(tcvn3Result)
      }
      
      // Add to history
      setHistory(prev => [
        {
          id: Date.now(),
          type: 'chinese-vietnamese',
          chinese: chineseResult,
          vietnameseUtf8: vietnameseSource,
          vietnameseTcvn3: vietnameseTcvn3.trim() ? vietnameseTcvn3 : convertUnicodeToTcvn3(vietnameseSource),
          timestamp: new Date().toLocaleTimeString('vi-VN')
        },
        ...prev
      ])
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsTranslating(false)
    }
  }

  // Handle Enter key - translate based on focused field
  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (field === 'chinese') {
        handleTranslateFromChinese()
      } else if (field === 'vietnameseUtf8' || field === 'vietnameseTcvn3') {
        handleTranslateFromVietnamese()
      }
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Dịch tiếng Trung ↔ Tiếng Việt</h1>
        
        <div className="main-content">
          <div className="converter-sections">
            {/* Chinese-Vietnamese Translation & Encoding Converter */}
            <div className="converter-section">
              <div className="section-header">
                <h2>Dịch tiếng Trung ↔ Tiếng Việt</h2>
                {isTranslating && (
                  <span style={{ color: '#4a90e2', fontSize: '14px' }}>Đang dịch...</span>
                )}
              </div>
              
              <div className="translation-layout">
                {/* Left side: Vietnamese */}
                <div className="translation-side">
                  <div className="side-header">
                    <h3>Tiếng Việt</h3>
                    <button 
                      className="translate-btn"
                      onClick={handleTranslateFromVietnamese}
                      disabled={(!vietnameseUtf8.trim() && !vietnameseTcvn3.trim()) || isTranslating}
                    >
                      {isTranslating ? 'Đang dịch...' : 'Dịch →'}
                    </button>
                  </div>
                  
                  <div className="vietnamese-inputs">
                    <div className="encoding-input-group">
                      <div className="encoding-header">
                        <label>Tiếng Việt (Unicode)</label>
                      </div>
                      <textarea
                        className="input-field"
                        value={vietnameseUtf8}
                        onChange={handleVietnameseUtf8Change}
                        onKeyDown={(e) => handleKeyDown(e, 'vietnameseUtf8')}
                        placeholder="Nhập văn bản tiếng Việt Unicode..."
                      />
                    </div>
                    
                    <div className="encoding-input-group">
                      <div className="encoding-header">
                        <label>Tiếng Việt (TCVN3)</label>
                      </div>
                      <textarea
                        className="input-field"
                        value={vietnameseTcvn3}
                        onChange={handleVietnameseTcvn3Change}
                        onKeyDown={(e) => handleKeyDown(e, 'vietnameseTcvn3')}
                        placeholder="Nhập văn bản tiếng Việt TCVN3..."
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right side: Chinese */}
                <div className="translation-side">
                  <div className="side-header">
                    <h3>Tiếng Trung</h3>
                    <button 
                      className="translate-btn"
                      onClick={handleTranslateFromChinese}
                      disabled={!chineseText.trim() || isTranslating}
                    >
                      {isTranslating ? 'Đang dịch...' : '← Dịch'}
                    </button>
                  </div>
                  
                  <div className="chinese-input">
                    <div className="encoding-input-group">
                      <div className="encoding-header">
                        <label>Tiếng Trung</label>
                      </div>
                      <textarea
                        className="input-field"
                        value={chineseText}
                        onChange={handleChineseTextChange}
                        onKeyDown={(e) => handleKeyDown(e, 'chinese')}
                        placeholder="Nhập văn bản tiếng Trung..."
                      />
                    </div>
                  </div>
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
                        Tiếng Trung ↔ Tiếng Việt
                      </span>
                      <span className="history-time">{item.timestamp}</span>
                    </div>
                    <div className="history-content">
                      <div className="history-input">
                        <strong>Tiếng Trung:</strong> {item.chinese || '(trống)'}
                      </div>
                      <div className="history-output">
                        <strong>Tiếng Việt (Unicode):</strong> {item.vietnameseUtf8 || '(trống)'}
                      </div>
                      <div className="history-output">
                        <strong>Tiếng Việt (TCVN3):</strong> {item.vietnameseTcvn3 || '(trống)'}
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
