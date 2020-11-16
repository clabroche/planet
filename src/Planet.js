const {canvas, ctx, requestAnimationFrame} = require('./Elements')
const Canvas = require('./Canvas')
module.exports = class {
  constructor(planetConf) {
    this.size = planetConf.size
    this.img = new Image;
    this.img.onload = ev => {
      console.log('ready')
      this.broken = false
    }
    this.img.src = planetConf.img;
    this.broken = true
    this.daysToMakeATurn = planetConf.daysToMakeATurn
    this.i = 0
    this.offset = 0
    this.speed = 0
    this.x = 0
    this.y = 0
  }
  display(withImage) {
    if(!this.broken) {
      if(this.i > 360) this.i = 0
      this.i += this.speed
      const { x: canvasCenterX, y: canvasCenterY} = Canvas.getCenter()
      this.x = Math.cos(this.i * Math.PI / 180) * this.offset + canvasCenterX
      this.y = Math.sin(this.i * Math.PI / 180) * this.offset + canvasCenterY
      if(withImage) {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size)
      }
    }
  }
  getCenter() {
    return this.size / 2 - this.size
  }
}