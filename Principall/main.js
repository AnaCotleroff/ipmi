class Main {
  constructor() {
    this.dora = new Dora();
    this.zorro = new Zorro();
    this.obstaculos = []; // Array para almacenar los obstáculos
    this.contador = 0; // Puntaje del juego
    this.juegoTerminado = false; // Bandera para saber si el juego terminó
    this.fondo = loadImage('data/fondo.jpg'); // Imagen de fondo
    this.tiempoRestante = 15; // 15 segundos para ganar
    this.tiempoLimite = this.tiempoRestante * 60; // Convertimos los segundos a fotogramas (15 * 60 = 900 fotogramas)
  }

  mostrar() {
    if (this.juegoTerminado) {
      this.mostrarMensajeFinJuego(); // Si el juego terminó, mostramos el mensaje
      return; // Detenemos el juego
    }

    // Mostrar fondo
    background(255); // Borra el fondo anterior
    image(this.fondo, 0, 0, width, height); // Dibuja el fondo

    // Mover y mostrar a Dora
    this.dora.mover();
    this.dora.mostrar();

    // Mostrar al Zorro
    this.zorro.mostrar();

    // Gestionar los obstáculos (crear, mover y mostrar)
    this.manejarObstaculo();

    // Verificar colisiones entre Dora y los obstáculos
    this.chocar();

    // Mostrar puntaje
    this.mostrarPuntaje();

    // Mostrar tiempo restante
    this.mostrarTiempoRestante();
  }

  manejarObstaculo() {
    // Cada 90 frames el Zorro lanza un obstáculo
    if (frameCount % 90 === 0) {
      let obstaculo = this.zorro.lanzarObstaculo(); // Lanza un obstáculo
      if (obstaculo) {
        this.obstaculos.push(obstaculo); // Agregarlo a la lista de obstáculos
      }
    }

    // Mover y mostrar cada obstáculo
    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      let obstaculo = this.obstaculos[i];
      obstaculo.mover();
      obstaculo.mostrar();

      // Si el obstáculo se sale de la pantalla, eliminarlo
      if (obstaculo.x > width) {
        this.obstaculos.splice(i, 1); // Eliminar obstáculo
        this.contador++; // Incrementar puntaje
      }
    }
  }

  chocar() {
    // Verificar si Dora choca con algún obstáculo
    for (let obstaculo of this.obstaculos) {
      if (obstaculo.colisionaCon(this.dora)) {
        this.juegoTerminado = true; // Termina el juego si hay colisión
        break; // Terminar el ciclo si se detectó una colisión
      }
    }
  }

  mostrarPuntaje() {
    fill(255);
    textSize(24);
    text("Puntaje: " + this.contador, 10, 30); // Mostrar puntaje en la esquina superior izquierda
  }

  mostrarTiempoRestante() {
    // Calculamos el tiempo restante basado en el frameCount
    let tiempoRestante = this.tiempoLimite - frameCount; // Restamos el frameCount para obtener el tiempo restante

    // Convertimos el tiempo a segundos
    let segundosRestantes = Math.floor(tiempoRestante / 60);

    // Si el tiempo restante es mayor o igual a 0, lo mostramos
    if (segundosRestantes >= 0) {
      fill(255, 0, 0); // Color rojo para el tiempo restante
      textSize(24);
      textAlign(RIGHT);
      text("Tiempo restante: " + segundosRestantes + "s", width - 10, 30); // Mostrar tiempo en la esquina superior derecha
    } else {
      // Si el tiempo se acaba, el jugador ha ganado
      this.juegoTerminado = true; // Terminar el juego
      this.mostrarMensajeFinJuego("¡Has ganado!"); // Mostrar mensaje de victoria
    }
  }

  mostrarMensajeFinJuego(mensaje = "¡Dora ha sido asesinada por el Zorro!") {
    fill(0, 255, 255); // Color del mensaje de fin de juego
    textSize(32); // Reducir el tamaño del texto
    textAlign(CENTER, CENTER); // Centrar el mensaje en la pantalla
    text(mensaje, width / 2, height / 3); // Mostrar el mensaje en el centro de la pantalla

    textSize(24); // Tamaño de fuente más pequeño para el puntaje
    text("Puntaje final: " + this.contador, width / 2, height / 2 + 60); // Mostrar el puntaje final
  }
}
