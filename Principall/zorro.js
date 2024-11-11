class Zorro {
  constructor() {
    this.x = 100; // Posición inicial del Zorro en el eje X
    this.y = height - 100; // Posición inicial en el eje Y
    this.d = 100; // Tamaño del Zorro (hago el zorro más grande)
    this.imagenZorro = loadImage('data/ZORRO.jpg'); // Cargar la imagen del Zorro
  }

  mostrar() {
    if (this.imagenZorro) { // Verificar si la imagen se cargó correctamente
      image(this.imagenZorro, this.x - this.d / 2, this.y - this.d / 2, this.d, this.d); // Dibuja la imagen del Zorro
    } else {
      fill(0, 255, 0); // Si no se cargó la imagen, dibuja un rectángulo verde como reemplazo
      rect(this.x - this.d / 2, this.y - this.d / 2, this.d, this.d);
    }
  }

  lanzarObstaculo() {
    // El Zorro lanza solo un obstáculo amarillo (sin pelotitas rojas)
    let tipo = 'abajo'; // Siempre va a lanzar un obstáculo amarillo
    let y = random(height / 2 + 50, height - 50); // Posición en la parte inferior (más cerca de la mitad naranja)

    return new Obstaculo(this.x, y, 30, tipo); // Crea y devuelve el obstáculo amarillo
  }
}
