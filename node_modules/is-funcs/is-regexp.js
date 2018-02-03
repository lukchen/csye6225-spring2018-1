module.exports = function(data) {
  return data != null
    && typeof data === 'object'
    && typeof data.exec === 'function'
    && typeof data.source === 'string'
    && typeof data.global === 'boolean'
}
