class Lanceur { 
  constructor(angleAiguille) {
    this.angleAiguille = angleAiguille;
  }

 drawAiguilleLanceur(ctx) {
	ctx.save();
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth=3;
    ctx.beginPath();
    //ctx.translate(10,1)
    ctx.rotate = angleAiguille;
    ctx.moveTo(w/2, h-h*0.12);
    ctx.lineTo(w/2, h-h*0.035);
    console.log(angleAiguille);
    ctx.stroke();
    ctx.restore();
}

 drawSocleLanceur(ctx) {
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 2;
    ctx.arc(w/2, h, 20, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.restore();
}

 drawLanceur(ctx) {
	drawAiguilleLanceur(ctx);
	drawSocleLanceur(ctx);
}

 bougerAiguille(angle) {
	angleAiguille = angle;	
}

}
