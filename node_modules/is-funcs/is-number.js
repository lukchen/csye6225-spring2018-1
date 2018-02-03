module.exports = function(data, safe) {
  if (typeof data === 'number') return data === data
  if (data == null) return false
  if (safe === true) {
    return Object.getPrototypeOf(data) === Number.prototype
      && isNaN(data) === false
  }
  return false
}
