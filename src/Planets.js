const Planet = require('./Planet')

module.exports = {
  sun: new Planet({
    name: 'sun',
    img: './assets/sun.png',
    size: 1.3,
    daysToMakeATurn: 0,
    kmFromSun: 0,
  }),
  mercure: new Planet({
    name: 'mercure',
    img: './assets/mercure.png',
    size: 50,
    daysToMakeATurn: 88,
    kmFromSun: 58,
  }),
  venus: new Planet({
    name: 'venus',
    img: './assets/venus.png',
    size: 50,
    daysToMakeATurn: 225,
    kmFromSun: 108,
  }),
  earth: new Planet({
    name: 'earth',
    img: './assets/earth.png',
    size: 50,
    daysToMakeATurn: 365,
    kmFromSun: 150,
  }),
  mars: new Planet({
    name: 'mars',
    img: './assets/mars.png',
    size: 10,
    daysToMakeATurn: 687,
    kmFromSun: 228,
  }),
  jupiter: new Planet({
    name: 'jupiter',
    img: './assets/jupiter.png',
    size: 50,
    daysToMakeATurn: 4329,
    kmFromSun: 778,
  }),
  saturne: new Planet({
    name: 'saturne',
    img: './assets/saturne.png',
    size: 50,
    daysToMakeATurn: 10751,
    kmFromSun: 1443,
  }),
  uranus: new Planet({
    name: 'uranus',
    img: './assets/uranus.png',
    size: 50,
    daysToMakeATurn: 30664,
    kmFromSun: 2872,
  }),
  neptune: new Planet({
    name: 'neptune',
    img: './assets/neptune.png',
    size: 50,
    daysToMakeATurn: 60148,
    kmFromSun: 4495,
  }),
}