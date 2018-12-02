class boule { 
  constructor(id, x, y, couleur) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.couleur = couleur;
  }

  dessineBoule() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    ctx.restore();
  }
  //Mouvements etc
}