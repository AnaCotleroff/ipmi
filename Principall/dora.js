class Dora {
  constructor() {
    this.x = 400; // Posición de Dora en el eje X
    this.y = height - 100; // Posición de Dora en el eje Y (nivel de suelo)
    this.d = 200; // Tamaño de Dora (ancho de la imagen)
    this.saltando = false;
    this.agachada = false;
    this.velY = 0; // Velocidad vertical para el salto
    this.aceleracion = 0.8; // Aceleración de la gravedad
    this.saltoMax = -12; // Velocidad del salto hacia arriba (más lento)
    this.imagenDora = loadImage('data/dora.png'); // Cargar la imagen de Dora
    this.vida = 1; // Dora tiene solo 1 vida
  }

  mover() {
    if (this.saltando) {
      this.velY += this.aceleracion; // Aceleración hacia abajo (gravedad)
      this.y += this.velY; // Mueve a Dora hacia arriba o abajo

      // Si Dora toca el suelo, detiene el salto
      if (this.y >= height - 100) {
        this.y = height - 100; // Resetea la posición de Dora al suelo
        this.saltando = false; // Termina el salto
        this.velY = 0; // Reset de velocidad vertical
      }
    }
  }

  mostrar() {
    // Si Dora está agachada, la dibujamos más cerca del suelo
    if (this.agachada) {
      if (this.imagenDora) {
        image(this.imagenDora, this.x - this.d / 2, this.y + 20, this.d, this.d); // Dora agachada
      }
    } else {
      if (this.imagenDora) {
        image(this.imagenDora, this.x - this.d / 2, this.y - this.d / 2, this.d, this.d); // Dora normal
      }
    }
  }

  saltar() {
    if (!this.saltando) {
      this.saltando = true;
      this.velY = this.saltoMax; // Inicia el salto
    }
  }

  agacharse() {
    this.agachada = true; // Dora se agacha
  }

  dejarDeAgacharse() {
    this.agachada = false; // Dora deja de agacharse
  }
}
