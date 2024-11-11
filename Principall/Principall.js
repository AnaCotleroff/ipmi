
let ppal; // Instancia global de la clase Main
let botonReiniciar; // Variable para el botón de reiniciar

function setup() {
  createCanvas(640, 480); // Establece las dimensiones del canvas
  ppal = new Main(); // Crear una instancia del juego

  // Crear el botón de reiniciar, pero inicialmente no se muestra
  botonReiniciar = createButton('Reiniciar');
  botonReiniciar.position(width / 2 - 50, height / 2 + 80); // Lo posicionamos debajo del mensaje
  botonReiniciar.mousePressed(reiniciarJuego); // Vincula la acción de hacer click en el botón con la función reiniciarJuego
  botonReiniciar.hide(); // Lo escondemos al principio
}

// Función draw() se ejecuta en cada fotograma
function draw() {
  // Fondo blanco
  background(255);

  // Dibujar los bordes rosas
  stroke(255, 105, 180); // Rosa
  strokeWeight(8); // Grosor de 8
  rect(0, 0, width, height); // Borde alrededor del canvas

  // Si el juego ha terminado, mostramos el mensaje de "¡Perdiste!" y el botón
  if (ppal.juegoTerminado) {
    ppal.mostrarMensajeFinJuego(); // Muestra el mensaje de fin de juego
    botonReiniciar.show(); // Muestra el botón de reiniciar
    return; // Detiene el resto del juego
  }

  // Si el juego no ha terminado, continúa normalmente
  ppal.mostrar(); // Llama a la función que maneja la lógica del juego (muestra el estado actual)
  checkColision(); // Verifica si Dora debe saltar o agacharse
}

// Función para manejar las colisiones
function checkColision() {
  // Iterar sobre todos los obstáculos
  for (let i = 0; i < ppal.obstaculos.length; i++) {
    let obstaculo = ppal.obstaculos[i];

    // Si el obstáculo es amarillo y está en la parte naranja de Dora (por debajo), Dora debe agacharse
    if (obstaculo.tipo === 'abajo' && obstaculo.y >= ppal.dora.y + 40 && obstaculo.y <= ppal.dora.y + 80) {
      ppal.dora.agacharse(); // Dora se agacha si está en la zona correcta
    }
  }
}

function keyPressed() {
  // Si se presiona la barra espaciadora y Dora no está saltando, que inicie el salto
  if (keyCode === 32 && !ppal.dora.saltando) {
    ppal.dora.saltar();
  }

  // Si se presiona 'A', Dora se agacha
  if (key === 'a' || key === 'A') {
    ppal.dora.agacharse();
  }
}

// Cuando se suelta la tecla 'A', Dora deja de agacharse 
function keyReleased() {
  if (key === 'a' || key === 'A') {
    ppal.dora.dejarDeAgacharse();
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  ppal = new Main(); // Reinicia el juego creando una nueva instancia
  botonReiniciar.hide(); // Esconde el botón después de reiniciar
}
