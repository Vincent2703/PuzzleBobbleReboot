class Boule { 
  constructor(id, x, y, couleur, angle) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.couleur = couleur;
    this.angle = angle;
    this.vx = 10*angle;
    this.vy = -10+Math.abs(angle);
  }

  getCouleur() {
    return this.couleur;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 17, 0, 2 * Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    ctx.restore();
  }

  dessiner() { //Pas utilisée pour le moment : dans canvas
    for(i=0; i<tableauBoules.length; i++) {
      b.draw(ctx);
      console.log(tableauBoules);
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  deplacer() {
    //for(i=0; i<tableauBoules.length; i++) {
      move();
    //}
  }

}