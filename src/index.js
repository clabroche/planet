const loop = require('./loop')
const { ctx } = require('./Elements')
const Canvas = require('./Canvas')
const Planets = require('./Planets')

Canvas.resize()



export default {
  sun: Planets.sun,
  mercure: Planets.mercure,
  venus: Planets.venus,
  earth: Planets.earth,
  mars: Planets.mars,
  jupiter: Planets.jupiter,
  saturne: Planets.saturne,
  uranus: Planets.uranus,
  neptune: Planets.neptune,
  currentPlanets: [Planets.earth],
  basePlanet: Planets.earth,
  withImage: true,
  globalSpeed: 8,
  lines:[], 
  togglePlanet(planet) {
    console.log(planet)
    if(this.currentPlanets.includes(planet)) {
      this.currentPlanets.splice(this.currentPlanets.indexOf(planet), 1)
    } else {
      this.currentPlanets.unshift(planet)
    }
    this.reset()
  },
  reset() {
    this.currentPlanets.sort((a, b) => a.daysToMakeATurn - b.daysToMakeATurn)
    this.currentPlanets.forEach((planet, i) => {
      planet.offset = (i + 1) * 100
      planet.speed = (360 / planet.daysToMakeATurn) * this.globalSpeed
    })
    this.lines = []
    Canvas.reset()
  },
  changeSpeed(el) {
    this.globalSpeed = +el.value
    this.reset()
  },
  changeDrawImage(el) {
    this.withImage = el.checked
    this.reset()
  },
  launch() {
    this.reset()
    loop(_ => {
      Canvas.reset()
      this.lines = this.lines.slice(0, 4000)
      this.lines.forEach(line => {
        ctx.beginPath();
        ctx.lineWidth = 0.2;
        ctx.moveTo(line[0][0], line[0][1]);
        ctx.lineTo(line[1][0], line[1][1]);
        ctx.strokeStyle = '#ffffff'
        ctx.stroke();
      })
      this.currentPlanets.forEach((otherPlanet) => {
        otherPlanet.display(this.withImage)
        if (this.basePlanet === otherPlanet || this.basePlanet.x === 0 || otherPlanet.x === 0) return
        this.lines.unshift([[this.basePlanet.x + this.basePlanet.size / 2, this.basePlanet.y + this.basePlanet.size / 2], [otherPlanet.x + otherPlanet.size / 2, otherPlanet.y + otherPlanet.size / 2]])
      })
    })
  }
}