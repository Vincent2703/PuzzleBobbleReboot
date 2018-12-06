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
  if(event.key == "ArrowRight" || event.key == "d" || event.keyCode == 39) {
    l.changeAngle(Math.round((l.getAngle() + 0.1)*100)/100);
  }else if(event.key == "ArrowLeft" || event.key == "q" || event.keyCode == 37) {
    l.changeAngle(Math.round((l.getAngle() - 0.1)*100)/100);
  }
  if(event.key == "b" || event.keyCode == 0) {
    b = new Boule(idBoule, w/2+(l.getAngle()*80), h*0.82+(Math.abs(l.getAngle())*40), "red");
    console.log(b);
    tableauBoules.push(b);
    idBoule++;
  }
}


/** A déplacer dans Boule plus tard **/
  function dessiner() { 
    for(i=0; i<tableauBoules.length; i++) {
      tableauBoules[i].draw(ctx);
    }
  }

  function deplacer() {
    for(i=0; i<tableauBoules.length; i++) {
      tableauBoules[i].move();
    }
  }

  function testeCollisionAvecMurs() {    
    tableauBoules.forEach((b) => {
      if(((b.x + 15) > w) || (c.x - 15 < 0)) { 
        c.vx = -c.vx;  
      }
    
      if(((c.y + 15) > hc) || (c.y - 15 < 0)) {
        b.vy = -b.vy;
      }
    }); 
  }