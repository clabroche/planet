const loop = require('./loop')
const { ctx, basePlanet: basePlanetEl } = require('./Elements')
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
  currentPlanets: [],
  basePlanet: null,
  withImage: true,
  globalSpeed: 8,
  lines:[], 
  lineColor: '#ffffff',
  togglePlanet(planet) {
    console.log(planet)
    if (this.currentPlanets.includes(planet)) { // remove planet 
      this.currentPlanets.splice(this.currentPlanets.indexOf(planet), 1)
      if (this.basePlanet === planet && this.currentPlanets.length) {
        this.basePlanet = this.currentPlanets[0]
        basePlanetEl.selectedIndex = Object.keys(Planets).indexOf(this.basePlanet.name)
      } else if (!this.currentPlanets.length) {
        basePlanetEl.selectedIndex = 0
      }
    } else { // add planet 
      this.currentPlanets.unshift(planet)
      if (!basePlanetEl.selectedIndex) {
        this.basePlanet = planet
        basePlanetEl.selectedIndex = Object.keys(Planets).indexOf(this.basePlanet.name)
      }
    }
    
    this.syncBasePlanetSelector()
    this.reset()
  },
  syncBasePlanetSelector() {
    const currentPlanetsNames = this.currentPlanets.map(planet => planet.name)
    Object.keys(Planets).forEach(planetName => {
      const el = document.querySelector(`#option-${planetName}`)
      if (el) {
        if (currentPlanetsNames.includes(planetName)) {
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      }
    })
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
  changeBasePlanet(el) {
    const planet = Planets[el.value]  
    if(planet) {
      this.basePlanet = planet
    }
    this.reset()
  },
  changeSpeed(el) {
    this.globalSpeed = +el.value
    this.reset()
  },
  changeDrawImage(el) {
    this.withImage = el.checked
    this.reset()
  },
  changeColor(el) {
    this.lineColor = el.value
  },
  launch() {
    this.reset()
    this.syncBasePlanetSelector()
    loop(_ => {
      Canvas.reset()
      this.lines = this.lines.slice(0, 4000)
      this.lines.forEach(line => {
        ctx.beginPath();
        ctx.lineWidth = 0.2;
        ctx.moveTo(line[0][0], line[0][1]);
        ctx.lineTo(line[1][0], line[1][1]);
        ctx.strokeStyle = this.lineColor
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