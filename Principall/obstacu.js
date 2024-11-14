
function preload() {
  cuchilloImg = loadImage('data/cuchillo.png'); 
}

class Obstaculo {
  constructor(x, y, d, direccion) {
    this.x = x;    
    this.y = y;    
    this.tam = 50;   
    this.direccion = direccion; 
    this.vel = 4;  
  }

  mover() {
    this.x += this.vel; // Mueve el obstáculo hacia la derecha
  }

  mostrar() {
    if (this.direccion === 'abajo') {
      if (cuchilloImg) {
        image(cuchilloImg, this.x, this.y, this.tam, this.tam); // Ajusta el tamaño si es necesario
      }
    }
  }

  // Método para detectar colisiones con Dora
  colisionaCon(dora) {
    // Calculamos las distancias entre los centros de los dos objetos (sin usar sqrt)
    let distX = this.x - dora.x;
    let distY = this.y - dora.y;
    let distanciaAlCuadrado = distX * distX + distY * distY;

    // Calculamos el radio total (la suma de los radios de los dos objetos)
    let radioTotal = (this.tam / 2 + dora.d / 2) * (this.tam / 2 + dora.d / 2);

    // Si la distancia al cuadrado es menor que el radio total al cuadrado, hay colisión
    if (distanciaAlCuadrado < radioTotal) {
      return true; // Colisión detectada
    }
    return false; // No hay colisión
  }
}
