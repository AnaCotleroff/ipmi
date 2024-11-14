class Zorro {
  constructor() {
    this.x = 85; 
    this.y = height - 100; // Posición inicial en el eje Y
    this.d = 180; // Tamaño del Zorro (hago el zorro más grande)
    this.imagenZorro = loadImage('data/zorrozorro.png'); // Cargar la imagen del Zorro
    this.tiempoLanzar = 0; // Variable para controlar el tiempo de lanzamiento de los obstáculos
  }

  mostrar() {
    if (this.imagenZorro) { // Verificar si la imagen se cargó correctamente
      image(this.imagenZorro, this.x - this.d / 2, this.y - this.d / 2, this.d, this.d); // Dibuja la imagen del Zorro
    } else {
      fill(0, 255, 0); // Si no se cargó la imagen, dibuja un rectángulo verde como reemplazo
      rect(this.x - this.d / 2, this.y - this.d / 2, this.d, this.d); // Dibuja un rectángulo de reserva
    }
  }

  lanzarObstaculo() {
    // Controla el tiempo de lanzamiento para no lanzar obstáculos demasiado rápido
    let intervaloLanzamiento = 100; // 100 cuadros entre lanzamientos

    if (frameCount - this.tiempoLanzar > intervaloLanzamiento) {
      let tipo = 'abajo'; 
      
      // Establecer las posiciones fijas de y para los cuchillos
      let y = random([265, 400]); // El cuchillo se lanzará en y = 300 o y = 400

      // Actualiza el tiempo de lanzamiento
      this.tiempoLanzar = frameCount;

      return new Obstaculo(this.x, y, 30, tipo); // Crear y devolver el obstáculo tipo 'abajo'
    }
    return null; // No lanzar obstáculo si no ha pasado suficiente tiempo
  }
}
