class Boule { 
  constructor(id, x, y, couleur) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.couleur = couleur;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    ctx.restore();
  }

  dessiner() { 
    tableauBoules.forEach((b) => {
      b.draw(ctx);
    });
  }
  //Mouvements etc
}