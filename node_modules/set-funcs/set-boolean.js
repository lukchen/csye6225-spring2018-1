const isBoolean = require('is-funcs/is-boolean')

module.exports = function(data, fallback) {
  if (isBoolean(data)) return data
  if (isBoolean(fallback)) return fallback
  return false
}
