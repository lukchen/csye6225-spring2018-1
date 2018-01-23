const isNumber = require('./is-number')

module.exports = function(data, than, safe) {
  return isNumber(data, safe)
    && isNumber(than, safe)
    && data > than
}
