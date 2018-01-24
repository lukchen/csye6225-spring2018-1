const fn = Object.prototype.toString

module.exports = function(data, check, safe) {
  if (data == null) return false
  if (safe === true) {
    if (fn.call(data) !== '[object Object]') return false
  } else {
    if (typeof data !== 'object' || data === Math) return false
    var proto = Object.getPrototypeOf(data)
    if (proto !== null && proto !== Object.prototype) return false
  }

  return check === undefined || check === true
    ? Object.keys(data).length > 0
    : true
}
