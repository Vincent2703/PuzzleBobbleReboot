window.onload = init;

let canvas, ctx;
let mousePos;
let angle = 0;
let idBoule = 0;
let score = 0;
let temps = 45;
temps = temps*60;
let barre = 0;
let tempsBonus = 0;
let prochaineCouleur = setBouleSuivanteCouleur();

let tableauBoules = [];
let tableauBoulesCollisions = [];

var ImagesACharger = {};
ImagesACharger["aiguille"] = "images/aiguille.png";
ImagesACharger["aiguilleBonus"] = "images/aiguilleBonus.png";

let aiguille = new Image();
aiguille.src = ImagesACharger["aiguille"];

var sonsACharger = {};
sonsACharger["tire"] = "sons/tire.wav";
sonsACharger["bonus"] = "sons/bonus.wav";
sonsACharger["termine"] = "sons/termine.wav";
sonsACharger["touche"] = "sons/touche.wav";
sonsACharger["disparition"] = "sons/disparition.wav";



let sonTire = new Audio(sonsACharger["tire"]);
let sonBonus = new Audio(sonsACharger["bonus"]);
let sonTermine = new Audio(sonsACharger["termine"]);
let sonTouche = new Audio(sonsACharger["touche"]);
let sonDisparition = new Audio(sonsACharger["disparition"]);


function init() {
  canvas = document.querySelector("#jeu");
  ctx = canvas.getContext("2d");
  w = canvas.width = 300;
  h = canvas.height = 500;

  l = new Lanceur();
  requestAnimationFrame(mainloop);
  }


  function mainloop() {
  	dessinerBarreHoriz();
  	l.update(ctx, l.getCouleur);
  	l.drawSocleLanceur(ctx, prochaineCouleur);


  if(tableauBoules.length > 0) {
      dessiner(); //b.[...]
      deplacer();
      testCollisionCoteLat(b);
      testCollisionCercles();
      testCollisionBarre();
  }
  document.getElementById("score").innerHTML = "Score : " + score/3;
  document.getElementById("temps").innerHTML = "Il reste " + Math.round(temps/60) + "s";
  temps--;
  if(aiguille.src != ImagesACharger["aiguille"]) {

  	tempsBonus--;
  	if(tempsBonus == 0) {
  		aiguille.src = ImagesACharger["aiguille"];
  	}
  }
  if(temps > 0 && barre == 0) {
  	requestAnimationFrame(mainloop);
  }else if(temps == 0) {
  	sonTermine.play();
  	document.getElementById("score").innerHTML = "<h3>Vous avez un score total de " + score/3 + "</h3>";
  	document.getElementById("temps").innerHTML ="<h3>Temps écoulé !</h3>";
  }else if(barre == 1) {
  	sonTouche.play();
  	document.getElementById("score").innerHTML = "<h3>Vous avez un score total de " + score/3 + "</h3>";
	document.getElementById("temps").innerHTML = "<h3>Vous avez franchi la <b style='color: red'>limite</b> !</h3>";
  }
}


  document.addEventListener('mousemove', function(event) {
  	var sourisPos = getSourisPos(canvas, event);
  	if(sourisPos.x >= 0 && sourisPos.x <= w) {
  		l.angle = -(1-sourisPos.x/(w/2));
  	}
  });

  document.addEventListener('click', function(event) {
    sonTire.play();
    b = new Boule(idBoule, w/2+(25*l.getAngle()), h*0.88, prochaineCouleur, l.getAngle());
    l.changeCouleur(prochaineCouleur);
    prochaineCouleur = setBouleSuivanteCouleur();
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


  function setBouleSuivanteCouleur() {
    var alea = Math.random();
    var couleur;
    if(alea<=0.2) {
      couleur = "red";
    }else if(alea<=0.4) {
      couleur = "blue";
    }else if(alea<=0.6) {
      couleur = "orange";
    }else if(alea<=0.8) {
      couleur = "yellow";
    }else{
      couleur = "purple";
    }
    return couleur;
  }

  function dessinerBarreHoriz() {
	  ctx.clearRect(0, 0, w, h);
	  ctx.save();
	  ctx.fillStyle = "#FF0000";
	  ctx.fillRect(0, h*0.5, w, 5);
	  ctx.restore()
  }

  function testCollisionBarre() {
	tableauBoules.forEach((b) => {
		if(b.etat == 2) {
	        if(b.y > h/2){
	        	barre = 1;
	        }
		}
	});
  }


/** A déplacer dans Boule plus tard **/
  function dessiner() { 
    for(i=0; i<tableauBoules.length; i++) {
    	if(tableauBoules[i].etat != 0) {
      		tableauBoules[i].draw(ctx);
  		}
    }
  }

  function deplacer() {
    for(i=0; i<tableauBoules.length; i++) {
   		if(tableauBoules[i].etat != 0) {
      		tableauBoules[i].move();
  		}
    }
  }

  function testCollisionCoteLat(b) {    
    tableauBoules.forEach((b) => { //Obliger de vérifier pour chaque sinon ça marche pas des fois, pourquoi ?
    if(b.etat != 0) {
      if(((b.x + 15) > w) || (b.x - 15 < 0)) { 
        b.vx = -b.vx;
      } 
      if(b.y - 15 < 0) {
        b.vy = 0;
        b.vx = 0;
        b.etat = 2;
      }
  }
    }); 

  }

  function testCollisionCercles(){
    tableauBoules.forEach((b) => {
      tableauBoules.forEach((b2) => {
        var dx = b.x - b2.x;
        var dy = b.y - b2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if(distance <= 30 && b.id !== b2.id && b.etat != 0 && b2.etat != 0){
          b.vx = 0;
          b.vy = 0;
          b.etat = 2;
          boulesACote(b);
        }
      });
    });

    function boulesACote(b) {
    	var tabBoulesACote = [];
    	tableauBoules.forEach((b2) => {
    		if(b2.id != b.id && b2.couleur == b.couleur) {
    			var dx = b.x - b2.x;
        		var dy = b.y - b2.y;
		        var distance = Math.sqrt(dx * dx + dy * dy);
		        if(distance <= 33) {
		        	tabBoulesACote.push(b2);
		        	if(tabBoulesACote.length == 2) { 
		        		sonDisparition.play();
		        		disparaitreBoule(tabBoulesACote[0]);
		        		disparaitreBoule(b);
		        		disparaitreBoule(tabBoulesACote[1]);
		        		aiguille.src = ImagesACharger["aiguilleBonus"];
		        		tempsBonus = 300; //5 secondes
		        		sonBonus.play();
		        	}
		        }
    		}
    	});
    }

    function disparaitreBoule(b) {
    	b.etat = 0;
    	score++;
    	b.x = 1000;
    	b.y = 1000;
    }

  }