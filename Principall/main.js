class Main {
  constructor() {
    this.dora = new Dora();
    this.zorro = new Zorro();
    this.obstaculos = []; // Array de obstáculos
    this.contador = 0;
    this.juegoTerminado = false; // Bandera para saber si el juego terminó
  }

  mostrar() {
    if (this.juegoTerminado) {
      this.mostrarMensajeFinJuego();
      return; // Detiene el juego si está terminado
    }

    this.dora.mover(); // Mueve a Dora
    this.dora.mostrar(); // Muestra a Dora

    this.zorro.mostrar(); // Muestra al Zorro (estático a la izquierda)

    this.manejarObstaculo(); // Controla y maneja el obstáculo
    this.chocar(); // Verifica si hubo colisiones
    this.mostrarPuntaje(); // Muestra el puntaje
  }

  manejarObstaculo() {
    if (frameCount % 60 === 0) { // Cada 60 cuadros, el Zorro lanza un obstáculo
      let obstaculo = this.zorro.lanzarObstaculo();
      this.obstaculos.push(obstaculo); // Agrega el obstáculo al array
    }

    // Mueve y muestra los obstáculos
    for (let i = 0; i < this.obstaculos.length; i++) {
      let obstaculo = this.obstaculos[i];
      obstaculo.mover();
      obstaculo.mostrar();

      // Si el obstáculo se sale de la pantalla, lo eliminamos
      if (obstaculo.x > width) {
        this.obstaculos.splice(i, 1);
        i--;
        this.contador++; // Aumenta el puntaje
      }
    }
  }

  chocar() {
    // Si hay un obstáculo, verificamos la colisión con Dora
    for (let obstaculo of this.obstaculos) {
      let distX = abs(this.dora.x - obstaculo.x);
      let distY = abs(this.dora.y - obstaculo.y);

      // Verificamos si hay colisión entre Dora y el obstáculo
      if (distX < this.dora.d / 2 + obstaculo.d / 2 && distY < this.dora.d / 2 + obstaculo.d / 2) {
        this.juegoTerminado = true; // Si Dora toca el obstáculo, el juego termina
      }
    }
  }

  mostrarPuntaje() {
    fill(255);
    textSize(24);
    text("Puntaje: " + this.contador, 10, 30); // Muestra el puntaje en la esquina superior izquierda
  }

  mostrarMensajeFinJuego() {
    fill( 0, 255, 255); // Color rojo para el mensaje de fin de juego
    textSize(48); // Tamaño de la fuente
    textAlign(CENTER, CENTER); // Centra el texto en la pantalla
    text("¡Perdiste!", width / 2, height / 2); // Muestra el mensaje en el centro

    textSize(24); // Tamaño de fuente más pequeño para el puntaje
    text("Puntaje final: " + this.contador, width / 2, height / 2 + 60); // Muestra el puntaje final debajo del mensaje
  }
}
