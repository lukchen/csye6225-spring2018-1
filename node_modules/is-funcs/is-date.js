module.exports = function(data) {
  if (data == null) return false
  return data instanceof Date
    && data.getTime() === data.getTime()
}
