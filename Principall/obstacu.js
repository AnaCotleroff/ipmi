let cuchilloImg; // Variable global para almacenar la imagen del cuchillo

function preload() {
  // Cargar la imagen del cuchillo solo una vez
  cuchilloImg = loadImage('data/cuchillo.png'); // Asegúrate de que la ruta sea correcta
}

class Obstaculo {
  constructor(x, y, d, tipo) {
    this.x = x;    // Posición inicial X
    this.y = y;    // Posición inicial Y
    this.d = d;    // Tamaño del obstáculo
    this.tipo = tipo; // Tipo de obstáculo ('abajo' en este caso)
    this.vel = 2;  // Velocidad más lenta para que Dora tenga tiempo de saltar y caer
  }

  mover() {
    this.x += this.vel; // Mueve el obstáculo hacia la derecha
  }

  mostrar() {
    if (this.tipo === 'abajo') {
      if (cuchilloImg) {
        image(cuchilloImg, this.x, this.y, 70, 70); // Ajusta el tamaño si es necesario
      }
    }
  }
}
