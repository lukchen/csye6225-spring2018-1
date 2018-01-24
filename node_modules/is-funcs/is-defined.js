module.exports = function(data, safe) {
  if (data == null) return false
  if (typeof data === 'number') return data === data
  if (safe === true) {
    if (typeof data === 'string' || Array.isArray(data)) return true
    if (Object.getPrototypeOf(data) === Number.prototype) return isNaN(data) == false
  }
  return true
}
