class Boule { 
  constructor(id, x, y, couleur, angle, etat) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.couleur = couleur;
    this.angle = angle;
    this.vx = 10*angle;
    this.vy = -10+Math.abs(angle);
    this.etat = 1;
  }

  getCouleur() {
    return this.couleur;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    ctx.restore();
  }


  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

}