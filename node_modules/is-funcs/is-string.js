module.exports = function(data, check, safe) {
  if (safe === true) {
    if (data == null || Object.getPrototypeOf(data) !== String.prototype) return false
  }
  else if (typeof data !== 'string') return false

  return check === undefined || check === true
    ? data.trim().length > 0
    : true
}
