const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function loop(cb) {
  cb()
  setTimeout(() => {
    loop(cb)
  }, 0);
  // requestAnimationFrame(() => loop(cb));
}

export default function(cb) {
  requestAnimationFrame(() => loop(cb));
}