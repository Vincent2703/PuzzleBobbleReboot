window.onload = init;

let canvas, ctx;
let mousePos;
let angle = 0;
let idBoule = 0;

let tableauBoules = [];

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
  if(tableauBoules.length > 0) {
    dessiner(); //b.[...]
    deplacer();

  }
  requestAnimationFrame(mainloop);
}

  document.addEventListener('keypress',  function(event) {
      gereTouches(event);
  });


function gereTouches(event) {
  if(event.key == "ArrowRight" || event.keyCode == 39) {
    l.changeAngle(Math.round((l.getAngle() + 0.1)*100)/100);
  }else if(event.key == "ArrowLeft" || event.keyCode == 37) {
    l.changeAngle(Math.round((l.getAngle() - 0.1)*100)/100);
  }
  if(event.key == "backspace" || event.keyCode == 0) {
    b = new Boule(idBoule, 150, 150, "red");
    tableauBoules.push(b);
    idBoule++;
  }
}


/** A déplacer dans Boule plus tard **/
  function dessiner() { 
    for(i=0; i<tableauBoules.length; i++) {
      b.draw(ctx);
      console.log(tableauBoules);
    }
  }

  function deplacer() {
    for(i=0; i<tableauBoules.length; i++) {
      b.move();
    }
  }