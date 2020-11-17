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
  <div class="downloads">
    <button class="as-png" @click="downloadAsPng">Download as png</button>
    <button class="as-svg" @click="downloadAsSvg">Download as svg</button>
  </div>
</div>
</template>

<script>
import loop from './services/loop'
import Canvas from './services/Canvas'
import ConfVue from './components/Conf.vue'
import Planets from './services/Planets'
let lines = []
console.log(lines)
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
    downloadAsSvg() {
      const svg = `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg
          width="${this.canvasLines.width}mm"
          height="${this.canvasLines.height}mm"
          viewBox="0 0 ${this.canvasLines.width} ${this.canvasLines.height}"
          version="1.1"
          id="svg8">
          <rect
            style="fill:#000000;fill-rule:evenodd;stroke-width:0.264583"
            id="rect1358"
            width="${this.canvasLines.width}"
            height="${this.canvasLines.height}"
            x="0"
            y="0" />
          <g>
          ${lines.map(line => this.getPath(line)).join('')}
          </g>
        </svg>
      `.split('\n').join(' ').trim()
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(svg);
      var dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href",     dataStr     );
      dlAnchorElem.setAttribute("download", "scene.svg");
      dlAnchorElem.click();
      return svg
    },
    getPath(line) {
      return `
        <path
          style="fill:none;stroke:${line[4]};stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
          d="M ${line[0]},${line[1]} ${line[2]},${line[3]}"
          id="path14" />
        `
    },
    downloadAsPng() {
      const canvas = this.canvasLines
      const link = document.createElement('a')
      let e
      link.download = 'planets.png'
      link.href = canvas.toDataURL("image/png;base64")
      /// create a "fake" click-event to trigger the download
      if (document.createEvent) {
        e = document.createEvent("MouseEvents")
        e.initMouseEvent("click", true, true, window,
                        0, 0, 0, 0, 0, false, false, false,
                        false, 0, null)

        link.dispatchEvent(e)
      } else if (link.fireEvent) {
        link.fireEvent("onclick")
      }
    },
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
      lines = []
      Canvas.reset(this.canvasPlanets, this.ctxPlanets)
      Canvas.reset(this.canvasLines, this.ctxLines)
    },
    changeBasePlanet(planet) {
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
        if(lines.length < 10000) {
          lines.push([planetCoordinate.x, planetCoordinate.y, otherPlanet.x, otherPlanet.y, this.conf.lineColor])
        }
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

.downloads {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
