let cuchilloImg; // Variable global para almacenar la imagen del cuchillo

function preload() {
  // Cargar la imagen del cuchillo solo una vez
  cuchilloImg = loadImage('data/cuchillo.png'); // Asegúrate de que la ruta sea correcta
}

class Obstaculo {
  constructor(x, y, d, tipo) {
    this.x = x;    // Posición inicial X
    this.y = y;    // Posición inicial Y
    this.d = 50;    // Tamaño del obstáculo
    this.tipo = tipo; // Tipo de obstáculo ('abajo' en este caso)
    this.vel = 4;  // Velocidad más lenta para que Dora tenga tiempo de saltar y caer
  }

  mover() {
    this.x += this.vel; // Mueve el obstáculo hacia la derecha
  }

  mostrar() {
    if (this.tipo === 'abajo') {
      if (cuchilloImg) {
        image(cuchilloImg, this.x, this.y, this.d, this.d); // Ajusta el tamaño si es necesario
      }
    }
  }

  // Método para detectar colisiones con Dora
  colisionaCon(dora) {
    let distanciaX = this.x - dora.x;
    let distanciaY = this.y - dora.y;

    // Calculamos la distancia entre los dos objetos (centros)
    let distancia = sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

    // Si la distancia es menor que la suma de sus radios, hay colisión
    if (distancia < (this.d / 2 + dora.d / 2)) {
      return true; // Colisión detectada
    }
    return false; // No hay colisión
  }
}
