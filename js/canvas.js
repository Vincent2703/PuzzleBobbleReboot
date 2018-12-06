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
  l.update(ctx, l.getCouleur);


  if(tableauBoules.length > 0) {
      dessiner(); //b.[...]
      deplacer();
      testCollisionCoteLat();
      testCollisionCercles();
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
    var couleur = setBouleSuivanteCouleur();
    b = new Boule(idBoule, w/2+(l.getAngle()*80), h*0.88+(Math.abs(l.getAngle())*40), couleur, l.getAngle());
    l.changeCouleur(couleur);
    tableauBoules.push(b);
    idBoule++;
  }
}

  function setBouleSuivanteCouleur() {
    var alea = Math.random();
    var couleur;
    if(alea<=0.2) {
      couleur = "red";
    }else if(alea<=0.4) {
      couleur = "blue";
    }else if(alea<=0.6) {
      couleur = "green";
    }else if(alea<=0.8) {
      couleur = "yellow";
    }else{
      couleur = "purple";
    }
    console.log(alea);
    return couleur;
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

  function testCollisionCoteLat() {    
    tableauBoules.forEach((b) => {
      if(((b.x + 15) > w) || (b.x - 15 < 0)) { 
        b.vx = -b.vx;  
      }
    
      if(b.y - 15 < 0) {
        b.vy = 0;
        b.vx = 0;
      }
    }); 
  }

  function testCollisionCercles(){
    tableauBoules.forEach((b) => {
      tableauBoules.forEach((b2) => {
        var dx = b.x - b2.x;
        var dy = b.y - b2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < 30 && b.id !== b2.id){
          b.vx = 0;
          b.vy = 0;
          console.log("coucou");
        }
      });
    });
  }