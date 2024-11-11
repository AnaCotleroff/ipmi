class Obstaculo {
  constructor(_x, _y, _d, _tipo) {
    this.x = _x; // Posición inicial en X
    this.y = _y; // Posición inicial en Y
    this.d = _d; // Tamaño del obstáculo
    this.tipo = _tipo; // Tipo de obstáculo: "arriba" o "abajo"
    this.vel = 4; // Velocidad moderada de los obstáculos
  }
  mover() {
    this.x += this.vel; // Mueve el obstáculo hacia la derecha
  }

  mostrar() {
    // Mostrar el obstáculo de acuerdo al tipo
    if (this.tipo === 'abajo') {
      fill(255, 255, 0); // Obstáculo amarillo (lanzado hacia abajo)
      ellipse(this.x, this.y, this.d); // Dibuja una pelota amarilla
    }
  }
}
