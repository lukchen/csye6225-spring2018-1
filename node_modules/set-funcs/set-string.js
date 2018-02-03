module.exports = function(data, fallback, allowed) {
  fallback = typeof fallback === 'string' ? fallback : ''
  if (typeof data !== 'string') return fallback
  if (typeof allowed === 'string') {
    allowed = allowed.trim().split(/ +/)
    var ok = true
  }
  if (ok === true || Array.isArray(allowed)) {
    return allowed.some(function(e) { return e === data })
      ? data
      : fallback
  }
  return data
}
