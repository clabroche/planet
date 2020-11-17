<template>
  <div class="overlay">
    <div>
      Primary planet
      <select @change="changeBasePlanet($event.target.value)" :value="conf.basePlanet ? conf.basePlanet.name : ''" class="base-planet">
        <option value=""></option>
        <option v-for="planet of activePlanets" :key="'option-' + planet.name" :value="planet.name" :name="planet.name">
          {{planet.name}}
        </option>
      </select>
    </div>

    <div v-for="planet of planets" :key="'input-' + planet.name">
      {{planet.name}}
      <input type="checkbox" @input="$emit('toggle-planet', planet)">
    </div>
    <div>
      Speed
      <input type="range" min="1" max="120" :value="conf.globalSpeed" @input="$emit('change-speed', $event.target.value)">
    </div>
    <div>
      Draw image
      <input type="checkbox" :value="conf.withImage" @input="$emit('change-draw-image', $event.target.checked)" checked="true">
    </div>
    <div>
      Color
      <input type="color" @input="$emit('change-color', $event.target.value)" :value="conf.lineColor">
    </div>
    <div>
      Pause
      <input type="checkbox" :value="conf.pause" @input="$emit('change-pause', $event.target.checked)">
    </div>
    
  </div>
</template>

<script>
import Planets from '../services/Planets'
export default {
  props: {
    conf: {default: () => ({})}
  },
  computed: {
    activePlanets() {
      const activePlanetsName = this.conf.currentPlanets.map(planet => planet.name)
      return this.planets.filter(planet => {
        return activePlanetsName.includes(planet.name)
      })
    }
  },
  data() {
    return {
      planets: Object.keys(Planets).map(planetName => Planets[planetName])
    }
  },
  methods: {
    changeBasePlanet(planetName) {
      const planet = Planets[planetName]
      this.$emit('change-base-planet', planet)
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    height: 100vh;
    background-color: rgba(255,255,255, 0.1);
    &>div {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      &:hover {
        background-color: rgba(255,255,255,0.2);
        transition: 300ms;
      }
    }
  }

</style>