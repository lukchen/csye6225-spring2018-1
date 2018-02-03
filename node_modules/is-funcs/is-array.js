module.exports = function(data, check) {
  if (Array.isArray(data) === false) return false
  return check === undefined || check === true
    ? data.length > 0
    : true
}
