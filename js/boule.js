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
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
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
    this.x += 1;
    this.y += 1;
  }

  déplacer() {
    for(i=0; i<tableauBoules.length; i++) {
      move();
    }
  }

}