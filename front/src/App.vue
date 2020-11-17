<template>
<div>
  <conf
    :conf="conf"
    @change-base-planet="changeBasePlanet"
    @toggle-planet="togglePlanet"
    @change-speed="changeSpeed"
    @change-draw-image="changeDrawImage"
    @change-color="changeColor"
    @change-pause="changePause"
    />
  <canvas ref="lines"/>
  <canvas ref="planets"/>
</div>
</template>

<script>
import loop from './services/loop'
import Canvas from './services/Canvas'
import ConfVue from './components/Conf.vue'
import Planets from './services/Planets'
export default {
  name: 'App',
  components: {
    conf: ConfVue
  },
  data() {
    return  {
      /** @type {HTMLCanvasElement} */
      canvasPlanets: null,
      /** @type {CanvasRenderingContext2D} */
      ctxPlanets: null,
      /** @type {HTMLCanvasElement} */
      canvasLines: null,
      /** @type {CanvasRenderingContext2D} */
      ctxLines: null,
      conf: {
        /** @type {import('./Planet')[]} */
        currentPlanets: [],
        basePlanet: null,
        withImage: true,
        globalSpeed: 8,
        lineColor: '#ffffff',
        pause: false,
      }
    }
  },
  async mounted() {
    /** @type {HTMLCanvasElement} */
    this.canvasPlanets = this.$refs.planets
    this.ctxPlanets = this.canvasPlanets.getContext('2d')
    /** @type {HTMLCanvasElement} */
    this.canvasLines = this.$refs.lines
    this.ctxLines = this.canvasLines.getContext('2d')
    Canvas.resize(this.canvasPlanets)
    Canvas.resize(this.canvasLines)
    this.reset(this.canvasPlanets, this.ctxPlanets)
    Object.keys(Planets).forEach(planetName => Planets[planetName].setCanvas(this.canvasPlanets, this.ctxPlanets))
    loop(this.tick)
  },
  methods: {
    togglePlanet(planet) {
      if (this.conf.currentPlanets.includes(planet)) { // remove planet 
        this.conf.currentPlanets.splice(this.conf.currentPlanets.indexOf(planet), 1)
        if (this.conf.basePlanet === planet && this.conf.currentPlanets.length) {
          this.conf.basePlanet = this.conf.currentPlanets[0]
        }
      } else { // add planet 
        this.conf.currentPlanets.unshift(planet)
        if(!this.conf.basePlanet) this.conf.basePlanet = planet
      }
      
      this.reset(this.canvasPlanets, this.ctxPlanets)
    },
    reset() {
      this.conf.currentPlanets.sort((a, b) => a.daysToMakeATurn - b.daysToMakeATurn)
      this.conf.currentPlanets.forEach((planet, i) => {
        planet.offset = (i + 1) * 100
        planet.speed = (360 / planet.daysToMakeATurn) * this.conf.globalSpeed
      })
      Canvas.reset(this.canvasPlanets, this.ctxPlanets)
      Canvas.reset(this.canvasLines, this.ctxLines)
    },
    changeBasePlanet(planet) {
      console.log(planet)
      if(planet) {
        this.conf.basePlanet = planet
      }
      this.reset(this.canvasPlanets, this.ctxPlanets)
    },
    changeSpeed(value) {
      this.conf.globalSpeed = +value
      this.reset(this.canvasPlanets, this.ctxPlanets)
    },
    changeDrawImage(checked) {
      this.conf.withImage = checked
      this.reset(this.canvasPlanets, this.ctxPlanets)
    },
    changePause(checked) {
      this.conf.pause = checked
    },
    changeColor(value) {
      this.conf.lineColor = value
    },
    tick() {
      if(this.conf.pause) return
      Canvas.reset(this.canvasPlanets, this.ctxPlanets)
      this.movePlanet()
    },
    movePlanet() {
      this.conf.currentPlanets.forEach((otherPlanet) => {
        otherPlanet.display(this.conf.withImage)
        if (this.conf.basePlanet === otherPlanet || this.conf.basePlanet.x === 0 || otherPlanet.x === 0) return
        const planetCoordinate = {
          x: this.conf.basePlanet.x + this.conf.basePlanet.size / 2,
          y: this.conf.basePlanet.y + this.conf.basePlanet.size / 2
        }
        const otherPlanetCoordinate = {
          x: otherPlanet.x + otherPlanet.size / 2,
          y: otherPlanet.y + otherPlanet.size / 2
        }
        this.ctxLines.beginPath();
        this.ctxLines.lineWidth = 0.2;
        this.ctxLines.moveTo(planetCoordinate.x, planetCoordinate.y);
        this.ctxLines.lineTo(otherPlanetCoordinate.x, otherPlanetCoordinate.y);
        this.ctxLines.strokeStyle = this.conf.lineColor
        this.ctxLines.stroke();
      })
    },
  }
}
</script>

<style lang="scss">
body {
  width: 100vw;
  height: 100vh;
  background-color: black;
  margin: 0;
  color: white;
}
.overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
