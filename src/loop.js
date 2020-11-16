const {requestAnimationFrame} = require('./Elements')

function loop(cb) {
  cb()
  requestAnimationFrame(_ => loop(cb));
}

module.exports = function(cb) {
  requestAnimationFrame(_ => loop(cb));
}