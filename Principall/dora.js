class Dora {
  constructor() {
    this.x = 400; // Posición de Dora en X
    this.y = height - 100; // Posición de Dora en Y (nivel de suelo)
    this.d = 50; // Tamaño de Dora
    this.saltando = false;
    this.agachada = false;
    this.velY = 0; // Velocidad vertical para el salto
    this.aceleracion = 0.5; // Aceleración por la gravedad
    this.saltoMax = -15; // La velocidad de salto hacia arriba
  }

  mover() {
    // Si Dora está saltando, ajustamos la velocidad vertical con la gravedad
    if (this.saltando) {
      this.velY += this.aceleracion; // Aceleración hacia abajo
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
    // Parte rosa en la parte superior y parte naranja en la parte inferior
    fill(255, 200, 0); // Parte inferior naranja
    rect(this.x - 25, this.y, 50, 40); // Parte inferior de Dora (naranja)
    fill(255, 105, 180); // Parte superior rosa
    rect(this.x - 25, this.y - 40, 50, 40); // Parte superior de Dora (rosa)
  }

  saltar() {
    if (!this.saltando) {
      this.saltando = true; // Inicia el salto
      this.velY = this.saltoMax; // Le damos una velocidad inicial hacia arriba
    }
  }

  agacharse() {
    this.agachada = true; // Dora se agacha
  }

  dejarDeAgacharse() {
    this.agachada = false; // Dora deja de agacharse
  }
}
