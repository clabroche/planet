module.exports.canvas = document.querySelector("canvas");
module.exports.body = document.querySelector("body");
module.exports.basePlanet = document.querySelector(".base-planet");
module.exports.ctx = this.canvas.getContext('2d')
module.exports.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;