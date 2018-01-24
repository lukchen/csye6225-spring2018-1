const isNumber = require('./is-number')

module.exports = function(data, safe) {
  if (safe === true) {
    if (isNumber(data, true, true)) data = Number(data)
    else return false
  }
  else if (typeof data !== 'number' || data !== data) return false
  return data == data >> 0
    || data === Infinity
    || data === -Infinity
}
