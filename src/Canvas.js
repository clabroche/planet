const { canvas, body, ctx } = require('./Elements')
module.exports = {
  resize() {
    canvas.width = body.clientWidth - 10
    canvas.height = body.clientHeight - 10
  },
  reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  },
  getCenter() {
    return {
      x: canvas.width / 2,
      y: canvas.height / 2,
    }
  }
}