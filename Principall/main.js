class Main {
  constructor() {
    this.dora = new Dora();
    this.zorro = new Zorro();
    this.obstaculos = []; // Array para almacenar los obstáculos
    this.contador = 0; // Puntaje
    this.juegoTerminado = false; // Bandera para indicar si el juego terminó
    this.fondo = loadImage('data/fondo.jpg'); // Fondo del juego
  }

  mostrar() {
    if (this.juegoTerminado) {
      this.mostrarMensajeFinJuego();
      return; // Detiene el juego si ha terminado
    }

    // Mostrar fondo
    background(255);
    image(this.fondo, 0, 0, width, height); // Dibuja el fondo

    // Mover y mostrar a Dora
    this.dora.mover();
    this.dora.mostrar();

    // Mostrar al Zorro
    this.zorro.mostrar();

    // Gestionar obstáculos
    this.manejarObstaculo();

    // Verificar colisiones
    this.chocar();

    // Mostrar puntaje
    this.mostrarPuntaje();
  }

  manejarObstaculo() {
    if (frameCount % 90 === 0) {
      let obstaculo = this.zorro.lanzarObstaculo();
      if (obstaculo) {
        this.obstaculos.push(obstaculo); // Agregar el obstáculo
      }
    }

    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      let obstaculo = this.obstaculos[i];
      obstaculo.mover();
      obstaculo.mostrar();

      // Si el obstáculo se sale de la pantalla, lo eliminamos
      if (obstaculo.x > width) {
        this.obstaculos.splice(i, 1);
        this.contador++; // Incrementa el puntaje
      }
    }
  }

  chocar() {
    for (let obstaculo of this.obstaculos) {
      // Verificar si Dora está agachada o no
      if (this.dora.agachada && obstaculo.tipo === "abajo") {
        // Si Dora está agachada y el obstáculo está en la parte de abajo, no colisiona
        continue;
      }

      // Calcular la distancia entre Dora y el obstáculo
      let distX = this.dora.x - obstaculo.x;
      let distY = this.dora.y - obstaculo.y;
      let distancia = sqrt(distX * distX + distY * distY); // Distancia entre Dora y el obstáculo

      // Si la distancia es menor que la suma de los radios, hay colisión
      if (distancia < this.dora.d / 2 + obstaculo.d / 2) {
        this.juegoTerminado = true;
        break; // Termina el ciclo si colisionó
      }
    }
  }

  mostrarPuntaje() {
    fill(255);
    textSize(24);
    text("Puntaje: " + this.contador, 10, 30);
  }

  mostrarMensajeFinJuego() {
    fill(0, 255, 255); // Mensaje en color cyan
    textSize(48);
    textAlign(CENTER, CENTER);
    text("¡Perdiste!", width / 2, height / 2); // Mensaje de fin de juego

    textSize(24);
    text("Puntaje final: " + this.contador, width / 2, height / 2 + 60);
  }
}
