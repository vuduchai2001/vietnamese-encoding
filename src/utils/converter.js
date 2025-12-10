// Using vietnamese-conversion library for TCVN3 ↔ Unicode conversion
import { toUnicode, toTCVN3 } from 'vietnamese-conversion'
// Using iconv-lite for GBK encoding conversion
import iconv from 'iconv-lite'
import { Buffer } from 'buffer'

/**
 * Translate Chinese text to Vietnamese using Google Translate API (public)
 * @param {string} text - Chinese text to translate
 * @returns {Promise<string>} - Translated Vietnamese text
 */
export async function translateChineseToVietnamese(text) {
  if (!text || !text.trim()) return ''
  
  try {
    // Using Google Translate API (public, no API key required)
    // Note: This uses an unofficial public API, may have rate limits
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh&tl=vi&dt=t&q=${encodeURIComponent(text)}`
    )
    
    if (!response.ok) {
      throw new Error('Translation API error')
    }
    
    const data = await response.json()
    
    // Extract translated text from response
    if (data && data[0] && Array.isArray(data[0])) {
      const translatedText = data[0]
        .map(item => item[0])
        .filter(Boolean)
        .join('')
      return translatedText
    }
    
    return text
  } catch (error) {
    console.error('Error translating Chinese to Vietnamese:', error)
    return text
  }
}

/**
 * Translate Vietnamese text to Chinese using Google Translate API (public)
 * @param {string} text - Vietnamese text to translate
 * @returns {Promise<string>} - Translated Chinese text
 */
export async function translateVietnameseToChinese(text) {
  if (!text || !text.trim()) return ''
  
  try {
    // Using Google Translate API (public, no API key required)
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=zh&dt=t&q=${encodeURIComponent(text)}`
    )
    
    if (!response.ok) {
      throw new Error('Translation API error')
    }
    
    const data = await response.json()
    
    // Extract translated text from response
    if (data && data[0] && Array.isArray(data[0])) {
      const translatedText = data[0]
        .map(item => item[0])
        .filter(Boolean)
        .join('')
      return translatedText
    }
    
    return text
  } catch (error) {
    console.error('Error translating Vietnamese to Chinese:', error)
    return text
  }
}

/**
 * Convert TCVN3 text to Unicode
 * @param {string} text - Text in TCVN3 encoding
 * @returns {string} - Text in Unicode
 */
export function convertTcvn3ToUnicode(text) {
  if (!text) return ''
  try {
    // Convert from TCVN3 to Unicode
    return toUnicode(text, 'tcvn3')
  } catch (error) {
    console.error('Error converting TCVN3 to Unicode:', error)
    return text
  }
}

/**
 * Convert Unicode text to TCVN3
 * @param {string} text - Text in Unicode
 * @returns {string} - Text in TCVN3 encoding
 */
export function convertUnicodeToTcvn3(text) {
  if (!text) return ''
  try {
    // Convert from Unicode to TCVN3
    return toTCVN3(text, 'unicode')
  } catch (error) {
    console.error('Error converting Unicode to TCVN3:', error)
    return text
  }
}

/**
 * Convert GBK encoded text to Windows-1252
 * @param {string|Buffer|Uint8Array} input - Input text in GBK encoding (can be string, Buffer, or Uint8Array)
 * @returns {string} - Text in Windows-1252 encoding
 */
export function convertGBKtoWindows1252(input) {
  if (!input) return ''
  try {
    // Convert input to Buffer if it's not already
    let gbkBuffer
    if (Buffer.isBuffer(input)) {
      gbkBuffer = input
    } else if (input instanceof Uint8Array) {
      gbkBuffer = Buffer.from(input)
    } else if (typeof input === 'string') {
      // If input is a string, we need to treat it as GBK bytes
      // First encode the string to bytes (assuming it's already GBK encoded text)
      // For browser, we'll need to convert string to buffer
      // Note: This assumes the string represents GBK-encoded bytes
      gbkBuffer = Buffer.from(input, 'binary')
    } else {
      throw new Error('Invalid input type')
    }

    // Decode from GBK to UTF-8 string
    const utf8String = iconv.decode(gbkBuffer, 'gbk')
    
    // Encode from UTF-8 string to Windows-1252
    const win1252Buffer = iconv.encode(utf8String, 'windows-1252')
    
    // Return as string (Windows-1252 encoded)
    return win1252Buffer.toString('binary')
  } catch (error) {
    console.error('Error converting GBK to Windows-1252:', error)
    return ''
  }
}

/**
 * Convert GBK encoded text to UTF-8
 * @param {string|Buffer|Uint8Array} input - Input text in GBK encoding (can be string, Buffer, or Uint8Array)
 * @returns {string} - Text in UTF-8 encoding
 */
export function convertGBKtoUTF8(input) {
  if (!input) return ''
  try {
    // Convert input to Buffer if it's not already
    let gbkBuffer
    if (Buffer.isBuffer(input)) {
      gbkBuffer = input
    } else if (input instanceof Uint8Array) {
      gbkBuffer = Buffer.from(input)
    } else if (typeof input === 'string') {
      // If input is a string, treat it as GBK-encoded bytes
      gbkBuffer = Buffer.from(input, 'binary')
    } else {
      throw new Error('Invalid input type')
    }

    // Decode from GBK to UTF-8 string
    const utf8String = iconv.decode(gbkBuffer, 'gbk')
    
    return utf8String
  } catch (error) {
    console.error('Error converting GBK to UTF-8:', error)
    return ''
  }
}

/**
 * Convert UTF-8 text to GBK
 * @param {string} input - Input text in UTF-8 encoding
 * @returns {string} - Text in GBK encoding (as binary string)
 */
export function convertUTF8toGBK(input) {
  if (!input) return ''
  try {
    // Encode UTF-8 string to GBK buffer
    const gbkBuffer = iconv.encode(input, 'gbk')
    // Return as binary string
    return gbkBuffer.toString('binary')
  } catch (error) {
    console.error('Error converting UTF-8 to GBK:', error)
    return ''
  }
}

/**
 * Convert Windows-1252 encoded text to UTF-8
 * @param {string|Buffer|Uint8Array} input - Input text in Windows-1252 encoding
 * @returns {string} - Text in UTF-8 encoding
 */
export function convertWindows1252toUTF8(input) {
  if (!input) return ''
  try {
    let win1252Buffer
    if (Buffer.isBuffer(input)) {
      win1252Buffer = input
    } else if (input instanceof Uint8Array) {
      win1252Buffer = Buffer.from(input)
    } else if (typeof input === 'string') {
      win1252Buffer = Buffer.from(input, 'binary')
    } else {
      throw new Error('Invalid input type')
    }

    // Decode from Windows-1252 to UTF-8 string
    const utf8String = iconv.decode(win1252Buffer, 'windows-1252')
    return utf8String
  } catch (error) {
    console.error('Error converting Windows-1252 to UTF-8:', error)
    return ''
  }
}

/**
 * Convert UTF-8 text to Windows-1252
 * @param {string} input - Input text in UTF-8 encoding
 * @returns {string} - Text in Windows-1252 encoding (as binary string)
 */
export function convertUTF8toWindows1252(input) {
  if (!input) return ''
  try {
    // Encode UTF-8 string to Windows-1252 buffer
    const win1252Buffer = iconv.encode(input, 'windows-1252')
    // Return as binary string
    return win1252Buffer.toString('binary')
  } catch (error) {
    console.error('Error converting UTF-8 to Windows-1252:', error)
    return ''
  }
}

/**
 * Convert Windows-1252 encoded text to GBK
 * @param {string|Buffer|Uint8Array} input - Input text in Windows-1252 encoding
 * @returns {string} - Text in GBK encoding (as binary string)
 */
export function convertWindows1252toGBK(input) {
  if (!input) return ''
  try {
    // First convert Windows-1252 to UTF-8, then UTF-8 to GBK
    const utf8String = convertWindows1252toUTF8(input)
    return convertUTF8toGBK(utf8String)
  } catch (error) {
    console.error('Error converting Windows-1252 to GBK:', error)
    return ''
  }
}

/**
 * Convert GBK encoded text to Windows-1252 (already exists, but keeping for consistency)
 * This function is already defined above, but we can use it here
 */

/**
 * Universal converter function: Convert text from one encoding to another
 * @param {string} text - Input text (assumed to be in sourceEncoding)
 * @param {string} sourceEncoding - Source encoding ('gbk', 'windows-1252', 'utf8')
 * @param {string} targetEncoding - Target encoding ('gbk', 'windows-1252', 'utf8')
 * @returns {string} - Converted text in target encoding
 */
export function convertEncoding(text, sourceEncoding, targetEncoding) {
  if (!text || sourceEncoding === targetEncoding) return text

  try {
    // First, decode from source encoding to UTF-8
    let utf8Text = ''
    if (sourceEncoding === 'utf8') {
      utf8Text = text
    } else if (sourceEncoding === 'gbk') {
      utf8Text = convertGBKtoUTF8(text)
    } else if (sourceEncoding === 'windows-1252') {
      utf8Text = convertWindows1252toUTF8(text)
    } else {
      throw new Error(`Unsupported source encoding: ${sourceEncoding}`)
    }

    // Then, encode from UTF-8 to target encoding
    if (targetEncoding === 'utf8') {
      return utf8Text
    } else if (targetEncoding === 'gbk') {
      return convertUTF8toGBK(utf8Text)
    } else if (targetEncoding === 'windows-1252') {
      return convertUTF8toWindows1252(utf8Text)
    } else {
      throw new Error(`Unsupported target encoding: ${targetEncoding}`)
    }
  } catch (error) {
    console.error(`Error converting from ${sourceEncoding} to ${targetEncoding}:`, error)
    return ''
  }
}
