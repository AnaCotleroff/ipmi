// https://youtu.be/FFMDYgvfuAM


PImage img;
int tamañoCirculos = 132;
int tamañoMinimoCirculos = 92;
int tamañoCuadrados = 133;
color colorCirculo1, colorCirculo2, colorCirculo3, colorCirculo4, colorCirculo5, colorCirculo6, colorCirculo7, colorCirculo8, colorCirculo9;



void setup() {
  size(800, 400);
  img = loadImage("IIMM.jpg");
   coloresCircus();
}



void draw() {
  background(255);
  image(img, 0, 0, 400, 400);
  dibujarObra();
  }



void keyPressed() {
  if (key == '-') {
    if (tamañoCirculos > tamañoMinimoCirculos) {
      tamañoCirculos -= 10;
    }
  } else if (key == '+') {
    if (tamañoCirculos < 132) {
      tamañoCirculos += 10;
    } else {
      tamañoCirculos = 132;
    }
  } else if (key == 'r') {
    resetearVariables();
  }
}
