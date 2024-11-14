class Dora {
  constructor() {
    this.x = 400; // Posición en el eje X
    this.y = height - 100; // Posición inicial de Dora en el eje Y (nivel de suelo)
    this.d = 200; // Tamaño de Dora (ancho de la imagen)
    this.saltando = false;
    this.agachada = false;
    this.velY = 0; // Velocidad vertical para el salto
    this.aceleracion = 0.5; // Aceleración de la gravedad
    this.saltoMax = -20; // Velocidad inicial del salto
    this.imagenDora = loadImage('data/dora.png'); // Cargar la imagen de Dora
    this.vida = 1; // Dora tiene solo 1 vida
  }

  mover() {
    // Si está saltando, aumentamos la velocidad de caída (gravedad)
    if (this.saltando) {
      this.velY += this.aceleracion; // Aceleración hacia abajo (gravedad)
      this.y += this.velY; // Mueve a Dora hacia arriba o abajo

      // Si Dora toca el suelo, termina el salto
      if (this.y >= height - 100) {
        this.y = height - 100; // Resetea la posición de Dora al suelo
        this.saltando = false; // Termina el salto
        this.velY = 0; // Reset de la velocidad vertical
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
      this.velY = this.saltoMax; // Inicia el salto con la nueva velocidad
      this.agachada = false; // Asegúrate de que Dora deje de estar agachada al saltar
    }
  }

  agacharse() {
    if (!this.saltando) {
      this.agachada = true;
      this.y = height - 90; // Baja la posición de Dora cuando se agacha
    }
  }

  dejarDeAgacharse() {
    this.agachada = false; // Dora deja de agacharse
    this.y = height - 100; // Resetea la posición de Dora al nivel del suelo
    this.x = 400; // Resetea la posición horizontal a 400
  }
}
