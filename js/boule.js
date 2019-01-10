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
    let boulePat = new Image();
    switch(this.couleur) {
      case "red":
        boulePat.src = "images/red.png";
        break;
      case "green":
        boulePat.src = "images/green.png";
        break;
      case "orange":
        boulePat.src = "images/orange.png";
        break;
      case "yellow":
        boulePat.src = "images/yellow.png";
        break; 
      case "purple":
        boulePat.src = "images/purple.png";
        break;
    }
    var pattern = ctx.createPattern(boulePat, "repeat");
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.restore();
  }


  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

}