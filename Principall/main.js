class Main {
  constructor() {
    this.dora = new Dora();
    this.zorro = new Zorro();
    this.obstaculos = []; // Array para almacenar los obstáculos
    this.juegoTerminado = false; // Bandera para saber si el juego terminó
    this.fondo = loadImage('data/fondo.jpg'); // Imagen de fondo
    this.tiempoRestante = 25; // 25 segundos para ganar
    this.tiempoLimite = this.tiempoRestante * 60; // Convertimos los segundos a fotogramas (25 * 60 = 1500 fotogramas)
    this.contadorFrames = 0; // Contador de frames personalizado
  }

  mostrar() {
    if (this.juegoTerminado) {
      // Si el juego terminó, mostramos el mensaje de fin de juego
      if (this.doraEscapo()) {
        this.mostrarMensajeVictoria(); // Si Dora escapó, mostrar mensaje de victoria
      } else {
        this.mostrarMensajeDerrota(); // Si Dora fue atrapada, mostrar mensaje de derrota
      }
      return; // Detenemos el juego
    }

    // Mostrar fondo
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

    // Mostrar tiempo restante
    this.mostrarTiempoRestante();
  }

  manejarObstaculo() {
    // Cada 90 frames el Zorro lanza un obstáculo
    if (this.contadorFrames % 90 === 0) {
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

  mostrarTiempoRestante() {
    // Incrementamos el contador de frames en cada fotograma
    this.contadorFrames++;

    // Calculamos el tiempo restante basado en el contador de frames
    let tiempoRestante = this.tiempoLimite - this.contadorFrames; // Restamos el contador de frames para obtener el tiempo restante

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
      if (!this.juegoTerminado) { // Solo si el juego no ha terminado aún
        this.juegoTerminado = true; // Marcar el juego como terminado
        this.mostrarMensajeVictoria(); // Mostrar mensaje de victoria
      }
    }
  }

  doraEscapo() {
    let tiempoRestante = this.tiempoLimite - this.contadorFrames;
    return tiempoRestante <= 0 && !this.juegoTerminado; // Si el tiempo se acaba y no hubo colisión, ganó
  }

  mostrarMensajeDerrota(mensaje = "¡Dora ha sido asesinada por el Zorro!") {
    fill(255, 0, 0); // Color del mensaje de derrota (rojo)
    textSize(32); // Reducir el tamaño del texto
    textAlign(CENTER, CENTER); // Centrar el mensaje en la pantalla
    text(mensaje, width / 2, height / 3); // Mostrar el mensaje en el centro de la pantalla

    // Dibujar el botón de reiniciar
    this.dibujarBoton(width / 2 - 150, height / 2 + 100, 300, 80, "Reiniciar");
  }

  mostrarMensajeVictoria(mensaje = "¡Has ayudado a Dora a escapar del Zorro!") {
    fill(0, 255, 0); // Color del mensaje de victoria (verde)
    textSize(32); // Reducir el tamaño del texto
    textAlign(CENTER, CENTER); // Centrar el mensaje en la pantalla
    text(mensaje, width / 2, height / 3); // Mostrar el mensaje en el centro de la pantalla

    // Dibujar el botón de reiniciar
    this.dibujarBoton(width / 2 - 150, height / 2 + 100, 300, 80, "Reiniciar");
  }

  dibujarBoton(x, y, ancho, alto, texto) {
    fill(0, 255, 0); // Color verde para el botón
    rect(x, y, ancho, alto, 20); // Dibujar el rectángulo del botón con bordes redondeados
    fill(255); // Color blanco para el texto
    textSize(24);
    textAlign(CENTER, CENTER);
    text(texto, x + ancho / 2, y + alto / 2); // Dibujar el texto en el centro del botón

    // Verificar si el mouse está dentro del área del botón
    if (mouseIsPressed && mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto) {
      this.reiniciarJuego(); // Llamar a la función de reinicio si se hace clic en el botón
    }
  }

  reiniciarJuego() {
    this.dora = new Dora(); // Reiniciar la instancia de Dora
    this.zorro = new Zorro(); // Reiniciar la instancia del Zorro
    this.obstaculos = []; // Vaciar la lista de obstáculos
    this.juegoTerminado = false; // Marcar el juego como no terminado
    this.contadorFrames = 0; // Reiniciar el contador de frames
  }
}
