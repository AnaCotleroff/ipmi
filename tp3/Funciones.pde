

void coloresCircus() {
  colorCirculo1 = color(0);
  colorCirculo2 = color(48, 39, 185);
  colorCirculo3 = color(0);
  colorCirculo4 = color(48, 39, 185);
  colorCirculo5 = color(0);
  colorCirculo6 = color(48, 39, 185);
  colorCirculo7 = color(0);
  colorCirculo8 = color(48, 39, 185);
  colorCirculo9 = color(0);
}



void dibujarObra() {
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      int xCuadrado = 400 + i * tamañoCuadrados;
      int yCuadrado = j * tamañoCuadrados;
      int xCirculo = xCuadrado + tamañoCuadrados / 2;
      int yCirculo = yCuadrado + tamañoCuadrados / 2;
      float distancia = dist(mouseX, mouseY, xCirculo, yCirculo);
      float sombrita = map(distancia, 0, 180, 0, 255);
      color colorCuadrado;

      if ((i + j) % 2 == 0) {
        colorCuadrado = color(48, 39, 185, sombrita);
      } else {
        colorCuadrado = color(0, sombrita);
      }

      fill(colorCuadrado);
      rect(xCuadrado, yCuadrado, tamañoCuadrados, tamañoCuadrados);

      if (distancia < 66 && mousePressed) {
        actualizarColorCirculo(i, j);
      }

      dibujarCirculo(i, j, xCirculo, yCirculo);
    }
  }
}



void dibujarCirculo(int i, int j, int x, int y){
  if (i == 0 && j == 0) {
    fill(colorCirculo1);
  } else if (i == 1 && j == 0) {
    fill(colorCirculo2);
  } else if (i == 2 && j == 0) {
    fill(colorCirculo3);
  } else if (i == 0 && j == 1) {
    fill(colorCirculo4);
  } else if (i == 1 && j == 1) {
    fill(colorCirculo5);
  } else if (i == 2 && j == 1) {
    fill(colorCirculo6);
  } else if (i == 0 && j == 2) {
    fill(colorCirculo7);
  } else if (i == 1 && j == 2) {
    fill(colorCirculo8);
  } else if (i == 2 && j == 2) {
    fill(colorCirculo9);
  }
  ellipse(x, y, tamañoCirculos, tamañoCirculos);
  
}


void actualizarColorCirculo(int i,int j){
   if (i == 0 && j == 0) {
    colorCirculo1 = randomColor(255);
  } else if (i == 1 && j == 0) {
    colorCirculo2 = randomColor(255);
  } else if (i == 2 && j == 0) {
    colorCirculo3 = randomColor(255);
  } else if (i == 0 && j == 1) {
    colorCirculo4 = randomColor(255);
  } else if (i == 1 && j == 1) {
    colorCirculo5 = randomColor(255);
  } else if (i == 2 && j == 1) {
    colorCirculo6 = randomColor(255);
  } else if (i == 0 && j == 2) {
    colorCirculo7 = randomColor(255);
  } else if (i == 1 && j == 2) {
    colorCirculo8 = randomColor(255);
  } else if (i == 2 && j == 2) {
    colorCirculo9 = randomColor(255);
  }
  // Indico cada circulo para que cambien de manera individual.
}

color randomColor(float alpha) {
  return color(random(255), random(255), random(255), alpha);
}

void resetearVariables() {
  tamañoCirculos = 132;
  coloresCircus();
  mouseX = 0;
  mouseY = 0;
}
