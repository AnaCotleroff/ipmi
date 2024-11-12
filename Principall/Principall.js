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
  background(255);

  // Dibujar los bordes rosas
  stroke(255, 105, 180); // Rosa
  strokeWeight(8); // Grosor de 8
  rect(0, 0, width, height); // Borde alrededor del canvas

  // Si el juego ha terminado, mostramos el mensaje de "¡Perdiste!" o "¡Ganaste!" y el botón
  if (ppal.juegoTerminado) {
    ppal.mostrarMensajeFinJuego(); // Muestra el mensaje de fin de juego
    // Esperamos un poco antes de mostrar el botón para que el jugador vea el mensaje
    setTimeout(() => {

      botonReiniciar.show(); // Muestra el botón de reiniciar después del retraso
    }, 1000); // Retraso de 1 segundo

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

    // Si el obstáculo es un cuchillo y Dora está agachada
    if (obstaculo.tipo === 'abajo' && ppal.dora.agachada) {
      // Si Dora está agachada, y el cuchillo está a una altura mayor que Dora
      if (obstaculo.y + obstaculo.d / 2 > ppal.dora.y + ppal.dora.d / 2) {
        // El obstáculo pasa por encima de Dora, entonces no hay colisión
        continue; 
      }
    }

    // Verifica si hay colisión con un obstáculo (general)
    let distX = ppal.dora.x - obstaculo.x;
    let distY = ppal.dora.y - obstaculo.y;
    let distancia = sqrt(distX * distX + distY * distY); // Calcula la distancia entre los centros

    // Si la distancia es menor que la suma de los radios de Dora y el obstáculo, hay colisión
    if (distancia < ppal.dora.d / 2 + obstaculo.d / 2) {
      ppal.juegoTerminado = true; // Si Dora toca el obstáculo, termina el juego
    }
  }
}

function keyPressed() {
  // Si se presiona la barra espaciadora y Dora no está saltando, que inicie el salto
  if (keyCode === 32 && !ppal.dora.saltando) {
    ppal.dora.saltar();
  }

  // Si se presiona 'A' y Dora no está saltando, Dora se agacha
  if (key === 'a' && !ppal.dora.saltando) {
    ppal.dora.agacharse();
  }
}

function keyReleased() {
  if (key === 'a') {
    ppal.dora.dejarDeAgacharse();
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  ppal = new Main(); // Reinicia el juego creando una nueva instancia
  botonReiniciar.hide(); // Esconde el botón después de reiniciar
}
