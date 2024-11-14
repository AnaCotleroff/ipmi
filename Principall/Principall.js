let juego;

function setup() {
  createCanvas(640, 480); 
  juego = new Main(); 
}
function draw() {
  background(255); // Fondo blanco para cada frame

  // Dibujar los bordes rosas
  stroke(255, 105, 180); // Rosa
  strokeWeight(8); // Grosor de 8
  rect(0, 0, width, height); // Borde alrededor del canvas

  // Si el juego ha terminado, muestra los mensajes y el botón de reiniciar
  if (juego.juegoTerminado) {
    // Mensaje de victoria o derrota
    juego.mostrar(); // Muestra el mensaje de fin del juego (victoria o derrota)

    return; // Detenemos el juego para que no siga ejecutando la lógica de la parte activa del juego
  }

  // Si el juego no ha terminado, ejecutamos la lógica normal del juego
  juego.mostrar(); // Llama a la función que maneja la lógica del juego (muestra el estado actual)

  // Verifica las colisiones de Dora con los obstáculos
  checkColision(); // Verifica si Dora debe saltar o agacharse (o si hay colisión)

}

// Función para manejar las colisiones entre Dora y los obstáculos
function checkColision() {
  // Iterar sobre todos los obstáculos
  for (let i = 0; i < juego.obstaculos.length; i++) {
    let obstaculo = juego.obstaculos[i];

    // Si el obstáculo es un cuchillo y Dora está agachada
    if (obstaculo.tipo === 'abajo' && juego.dora.agachada) {
      // Si Dora está agachada y el cuchillo está por encima de ella
      if (obstaculo.y + obstaculo.d / 2 > juego.dora.y + juego.dora.d / 2) {
        continue; // El obstáculo pasa por encima de Dora, entonces no hay colisión
      }
    }

    // Verificar si hay colisión con un obstáculo (general)
    let distX = juego.dora.x - obstaculo.x;
    let distY = juego.dora.y - obstaculo.y;
    let distanciaAlCuadrado = distX * distX + distY * distY;
    let radioTotal = (juego.dora.d / 2 + obstaculo.d / 2) * (juego.dora.d / 2 + obstaculo.d / 2);

    // Si la distancia al cuadrado es menor que el radio total al cuadrado, hay colisión
    if (distanciaAlCuadrado < radioTotal) {
      juego.juegoTerminado = true; // Termina el juego si hay colisión
    }
  }
}

// Función de control para el teclado
function keyPressed() {
  // Si se presiona la barra espaciadora y Dora no está saltando, que inicie el salto
  if (keyCode === 32 && !juego.dora.saltando) {
    juego.dora.saltar();
  }

  // Si se presiona 'A' y Dora no está saltando, Dora se agacha
  if (key === 'a' && !juego.dora.saltando) {
    juego.dora.agacharse();
  }
}

function keyReleased() {
  // Si se suelta la tecla 'A', Dora deja de agacharse
  if (key === 'a') {
    juego.dora.dejarDeAgacharse();
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  juego = new Main(); // Reinicia el juego creando una nueva instancia
  juego.juegoTerminado = false; // Reinicia el estado de fin de juego
}

// Función para dibujar botones
function dibujarBoton(px, py, pan, pal, texto) {
  // Detectamos si el mouse está sobre el botón
  if (detectarBoton(px, py, pan, pal)) {
    fill(200); // Fondo blanco cuando el mouse está sobre el botón
    // Si el mouse está sobre el botón, el color de texto será diferente para resaltarlo
    fill(0, 255, 204); // Verde agua cuando el mouse está sobre el botón
  } else {
    fill(255); // Fondo blanco cuando el mouse no está sobre el botón
  }

  rect(px, py, pan, pal, pal / 4); // Dibuja el rectángulo con bordes redondeados
  fill(61, 89, 99); // Color del texto verde agua
  textAlign(CENTER, CENTER);
  textSize(40); // Aumentar aún más el tamaño del texto para que sea más visible
  text(texto, px + pan / 2, py + pal / 2); // Centra el texto en el botón
  
  // Detectar clic en el botón
  if (detectarBoton(px, py, pan, pal) && mouseIsPressed) {
    reiniciarJuego(); // Reiniciar el juego si se hace clic sobre el botón
  }
}

// Función para detectar si el mouse está sobre un botón
function detectarBoton(x, y, an, al) {
  return mouseX > x && mouseX < x + an && mouseY > y && mouseY < y + al;
}
