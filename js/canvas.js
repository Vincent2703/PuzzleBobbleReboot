//import * as Lanceur from './js/lanceur.js';

window.onload = init;

let canvas, ctx;
let aiguilleLanceur; 



document.addEventListener('keypress',  function(event){
  	gereTouches(event);
});


function gereTouches(event) {
	if(event.key == "ArrowRight") {
		angleAiguille -= 0.1;
		bougerAiguille(angleAiguille);
	}else if(event.key == "ArrowLeft") {
		angleAiguille += 0.1;
		bougerAiguille(angleAiguille);
	}
	//console.log(angleAiguille);
}


  
function init() {
  
  canvas = document.querySelector("#jeu");
  ctx = canvas.getContext("2d");
  
	lanceur = new Lanceur(0);

  w = canvas.width;
  h = canvas.height;

  drawLanceur(ctx);

    
  // on demarre la boucle d'animation
  requestAnimationFrame(bouclePrincipale); //Créer la fonction
}


function bouclePrincipale() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	
	Lanceur.drawLanceur(ctx);

	requestAnimationFrame(bouclePrincipale);
}



