window.onload = init;

let canvas, ctx;
let mousePos;
let angle = 0;
let idBoule = 0;

let tableauBoules = [];

let tableauBoulesCollisions = [];

var ImagesACharger = {};
ImagesACharger["aiguille"] = "images/aiguille.png";

let aiguille = new Image();
aiguille.src = ImagesACharger["aiguille"];

function init() {
  canvas = document.querySelector("#jeu");
  ctx = canvas.getContext("2d");

  w = canvas.width = 300;
  h = canvas.height = 500;

  l = new Lanceur();

  //let couleurSuivante = null;

  requestAnimationFrame(mainloop);
  }

function mainloop() {
  ctx.clearRect(0, 0, w, h);
  l.update(ctx, l.getCouleur);
  //if(couleurSuivante == null) {
   // l.drawSocleLanceur(ctx, "pink");
  //}else{
    l.drawSocleLanceur(ctx, "pink");
  //}

  if(tableauBoules.length > 0) {
      dessiner(); //b.[...]
      deplacer();
      testCollisionCoteLat();
      testCollisionCercles();
  }
  requestAnimationFrame(mainloop);
}

  document.addEventListener('keydown',  function(event) {
      gereTouches("down", event);
  });

  document.addEventListener('mousemove', function(event) {
  	var sourisPos = getSourisPos(canvas, event);
  	if(sourisPos.x >= 0 && sourisPos.x <= w) {
  		l.angle = -(1-sourisPos.x/(w/2));
  	}
  });

  document.addEventListener('click', function(event) {
  	couleur = setBouleSuivanteCouleur();
    b = new Boule(idBoule, w/2+(25*l.getAngle()), h*0.88, couleur, l.getAngle());
    l.changeCouleur(couleur);
    tableauBoules.push(b);
    idBoule++;
  });

  function getSourisPos(canvas, event) {
  	var rect = canvas.getBoundingClientRect();
  	return {
  		x : event.clientX - rect.left,
  		y : event.clientY - rect.top
  	};
  }

function gereTouches(type, event) {
    if(l.getAngle() <= 1.3 && (event.key == "ArrowRight" || event.key == "d" || event.keyCode == 39)) {
      l.changeAngle(Math.round((l.getAngle() + 0.1)*100)/100);
    }else if(l.getAngle() >= - 1.3 && (event.key == "ArrowLeft" || event.key == "q" || event.keyCode == 37)) {
      l.changeAngle(Math.round((l.getAngle() - 0.1)*100)/100);
    }
  if(event.key == "b" || event.keyCode == 0) {
    couleur = setBouleSuivanteCouleur();
    b = new Boule(idBoule, w/2+(10*l.getAngle()), h*0.88, couleur, l.getAngle());
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
      if(((b.x + 17) > w) || (b.x - 17 < 0)) { 
        b.vx = -b.vx;  
      } 
      if(b.y - 17 < 0) {
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
        if(distance <= 36 && b.id !== b2.id){
          b.vx = 0;
          b.vy = 0;
          var tab2Boules;
          if(b.couleur == b2.couleur) {
          	if(b.id < b2.id) {
          		tab2Boules = [b.id, b2.id];
          		if(tableauBoulesCollisions.indexOf(tab2Boules) == -1) {
          			tableauBoulesCollisions.push(tab2Boules);
          			console.log(tableauBoulesCollisions);
          		}
          	}
      	  }
        }
      });
    });

  }