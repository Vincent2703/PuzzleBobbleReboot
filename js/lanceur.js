class Lanceur {
    constructor() { 
      this.angle = 0;
      this.changeAngle(this.angle);
    }
  
    update(ctx) {
      this.drawAiguille(ctx);
    }
  
    drawSocleLanceur(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(w/2, h, 20, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
    }
  
    drawAiguille(ctx) {
      ctx.save();
      ctx.translate(w/2, h*0.95);
      ctx.rotate(this.angle);
      ctx.drawImage(aiguille, -aiguille.width/2, -aiguille.height+5);
      ctx.restore();
    }
  
    changeAngle(a) {
        this.angle =  a;
    }
  
    getAngle() {
        return this.angle;
    }
  
  }