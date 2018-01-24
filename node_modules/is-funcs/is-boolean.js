module.exports = function(data, safe) {
  if (safe === true) return data != null && Object.getPrototypeOf(data) === Boolean.prototype
  return data === true || data === false
}
