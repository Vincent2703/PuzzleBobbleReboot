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
    /*switch(this.couleur) {
      case "red":
        boule.src = ImagesBoulesACharger["rouge"];
        break;
      case "green":
        boule.src = ImagesBoulesACharger["vert"];
        break;
      case "orange":
        boule.src = ImagesBoulesACharger["orange"];
        break;
      case "yellow":
        boule.src = ImagesBoulesACharger["jaune"];
        break; 
      case "purple":
        boule.src = ImagesBoulesACharger["violet"];
        break;
    }

    ctx.drawImage(boule, this.x-15, this.y-15);*/
    
    
    ctx.fillStyle = this.couleur; //A enlever si image
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

  }


  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

}