class Personaje {
  constructor() {
    this.posX = 400;
    this.posY = 245;
    this.vida = 1;
    this.moviendoseArriba = false;
    
  }
  dibujar() {
  
    if (this.vida > 0) {
      image(imgDora, this.posX, this.posY, 180, 180);
      this.mover();
    } else {
      textSize(32);
      fill(255, 0, 0);
      text("¡Game Over!", width / 2 - 100, height / 2);
    }
  }
  mover() {

    if (this.moviendoseArriba == true) {
      this.posY -= 20;
      if (this.posY <= 10) {
        this.moviendoseArriba = false;
      }
    } else {
      if (this.posY < 240) {
        this.posY += 7;
      }
    }
  }
  matar() {
    this.vida--;
  }
  haSidoGolpeado(obstaculo) {
    let distancia = dist(this.posX + 90, this.posY + 90, obstaculo.posX + 30, obstaculo.posY + 30);
    if (distancia < 80) { 
      this.matar();
    }
  }
  teclaPresionada(key) {

    if (key === ' ') {
      this.moviendoseArriba = true;
      
      
    }
  }
}
