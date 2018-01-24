const isNumber = require('./is-number')

module.exports = function(data, safe) {
  return isNumber(data, safe)
    && data !== Infinity
    && data !== -Infinity
    && data != (data | 0)
}
