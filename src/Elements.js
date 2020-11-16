module.exports.canvas = document.querySelector("canvas");
module.exports.body = document.querySelector("body");
module.exports.ctx = this.canvas.getContext('2d')
module.exports.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;