const body = document.querySelector("body");
export default {
  resize(canvas) {
    canvas.width = body.clientWidth - 10
    canvas.height = body.clientHeight - 10
  },
  reset(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  },
  getCenter(canvas) {
    return {
      x: canvas.width / 2,
      y: canvas.height / 2,
    }
  }
}