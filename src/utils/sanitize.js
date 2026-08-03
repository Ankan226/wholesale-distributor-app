export function sanitizeInput(value) {
  if (typeof value !== 'string') return value
  return value.replace(/[<>&"'`]/g, (char) => {
    const map = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;',
    }
    return map[char]
  })
}