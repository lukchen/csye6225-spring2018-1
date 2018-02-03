module.exports = function(data, safe) {
  if (data == null) return false
  if (safe === true) {
    if (Object.getPrototypeOf(data) === Number.prototype) return isNaN(data)
  }
  else if (typeof data === 'number') return data !== data
  return false
}
