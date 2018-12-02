window.onload = init;

let canvas, ctx;
let mousePos;
let angle = 0;

var ImagesACharger = {};
ImagesACharger["aiguille"] = "images/aiguille.png";

let aiguille = new Image();
aiguille.src = ImagesACharger["aiguille"];

function init() {
  canvas = document.querySelector("#jeu");
  ctx = canvas.getContext("2d");

  w = canvas.width = 500;
  h = canvas.height = 500;

  l = new Lanceur();

  requestAnimationFrame(mainloop);
  }

function mainloop() {
  ctx.clearRect(0, 0, w, h);
  l.update(ctx);
  requestAnimationFrame(mainloop);
}

document.addEventListener('keypress',  function(event) {
    gereTouches(event);
});


function gereTouches(event) {
  if(event.key == "ArrowRight") {
    l.changeAngle(Math.round((l.getAngle() + 0.1)*100)/100);
  }else if(event.key == "ArrowLeft") {
    l.changeAngle(Math.round((l.getAngle() - 0.1)*100)/100);
 }
 if(event.keyCode == 0) {
   console.log("coucou");
 }
}