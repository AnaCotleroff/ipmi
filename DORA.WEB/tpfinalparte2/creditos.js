class PantallaCreditos {
  mostrar() {

    image(escenas[1], 0, 0, width, 350);
    fill(213, 232, 234);

    dibujarBoton(240, height - 75, 150, 60, "Volver al Inicio");
    rect(0, 0, 640, 55);

    textAlign(CENTER);
    fill(255);
    textSize(22);
    text("Ana Belen Cotleroff", 195, 210);
    text("Comisión 2 - 2024.", 195, 230);
    text("Legajo:120292/7 .", 195, 250);

    text("Brunella Brancaleone", 440, 210);
    text("Comisión 2 - 2024.", 440, 230);
    text("Legajo: 118976/9.", 440, 250);
  }
}
