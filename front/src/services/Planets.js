import Planet from './Planet'
import imgsun from '../assets/saturne.png'
import imgmercure from '../assets/mercure.png'
import imgvenus from '../assets/venus.png'
import imgearth from '../assets/earth.png'
import imgmars from '../assets/mars.png'
import imgjupiter from '../assets/jupiter.png'
import imgsaturne from '../assets/saturne.png'
import imguranus from '../assets/uranus.png'
import imgneptune from '../assets/neptune.png'

export default {
  sun: new Planet({
    name: 'sun',
    img: imgsun,
    size: 1.3,
    daysToMakeATurn: 0,
    kmFromSun: 0,
  }),
  mercure: new Planet({
    name: 'mercure',
    img: imgmercure,
    size: 50,
    daysToMakeATurn: 88,
    kmFromSun: 58,
  }),
  venus: new Planet({
    name: 'venus',
    img: imgvenus,
    size: 50,
    daysToMakeATurn: 225,
    kmFromSun: 108,
  }),
  earth: new Planet({
    name: 'earth',
    img: imgearth,
    size: 50,
    daysToMakeATurn: 365,
    kmFromSun: 150,
  }),
  mars: new Planet({
    name: 'mars',
    img: imgmars,
    size: 10,
    daysToMakeATurn: 687,
    kmFromSun: 228,
  }),
  jupiter: new Planet({
    name: 'jupiter',
    img: imgjupiter,
    size: 50,
    daysToMakeATurn: 4329,
    kmFromSun: 778,
  }),
  saturne: new Planet({
    name: 'saturne',
    img: imgsaturne,
    size: 50,
    daysToMakeATurn: 10751,
    kmFromSun: 1443,
  }),
  uranus: new Planet({
    name: 'uranus',
    img: imguranus,
    size: 50,
    daysToMakeATurn: 30664,
    kmFromSun: 2872,
  }),
  neptune: new Planet({
    name: 'neptune',
    img: imgneptune,
    size: 50,
    daysToMakeATurn: 60148,
    kmFromSun: 4495,
  }),
}