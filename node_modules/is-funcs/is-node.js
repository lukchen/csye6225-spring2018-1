module.exports = function(data, check) {
  var ok = typeof window === 'object'
    && data instanceof window.Node
    && data.nodeType == 1
  return check === undefined || check === true
    ? ok && document.body.contains(data) && data.getClientRects().length > 0
    : ok
}
