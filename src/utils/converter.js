// Using vietnamese-conversion library for TCVN3 ↔ Unicode conversion
import { toUnicode, toTCVN3 } from 'vietnamese-conversion'

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
