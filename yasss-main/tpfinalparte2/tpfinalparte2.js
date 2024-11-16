let escenas = [];
let texto= [];
let estado;


let objJuego;
let imgDora;
let imgFondo;
let imgZorro;
let imgCuchillo;
let instrucciones;
let sonidoSalto;

function preload() {
  for (let i = 0; i < 5; i++) {
    escenas[i] = loadImage("data/escena" + i + ".jpg");
  }

  imgDora = loadImage('data/dora.png');
  imgFondo = loadImage ('data/fondo.jpg');
  imgCuchillo = loadImage ('data/cuchillo.png');
  imgZorro = loadImage ('data/zorro.png');
  texto = loadStrings ("data/texto.txt");
  sonidoSalto = loadSound('data/saltito.mp3');
}
function setup() {
  createCanvas(640, 480);
  objJuego = new Juego();
  estado = "inicio";
}

function draw() {
  background(200);

  if (estado === "inicio") {
    image(escenas[0], 0, 0, width, height);
    textSize(20);
    noStroke();
    fill(213, 232, 234);
    rect (0, 0, 640, 55);
    fill(0);
    textAlign(CENTER);
   cargaTexto(0);
    fill(213, 232, 234);
    rect(0, 380, 640, 170);
    dibujarBoton(40, height - 75, 200, 60, "Instrucciones");
    dibujarBoton(400, height - 75, 200, 60, "Jugar");
  } else if (estado === "primera") {
    image(escenas[4], 0, 0, width, height);
    cargaTexto(1);
    dibujarBoton(240, height - 80, 150, 60, "Volver");
  } else if (estado === "segunda") {
    objJuego.dibujar();
  }
}
function keyPressed() {
  objJuego.teclaPresionada(key);
}

function cargaTexto(indice) {
  textSize(25);
  noStroke();
  fill(213, 232, 234);
  rect(0, 330, 640, 170); // Fondo para el texto
  fill(0); // Color del texto
  textAlign(CENTER, TOP);
  text(texto[indice], 20, 20, 600); // Muestra el texto cargado desde el archivo
}

function dibujarBoton(px, py, pan, pal, texto) {
  if (detectarBoton(px, py, pan, pal)) {
    fill(255, 0, 0);
  } else {
    fill(0, 0, 100);
  }
  rect(px, py, pan, pal, pal / 4);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(texto, px + pan / 2, py + pal / 2);
}

function detectarBoton(x, y, an, al) {
  return mouseX > x && mouseX < x + an && mouseY > y && mouseY < y + al;
}

function mousePressed() {
  if (estado === "inicio") {
    if (detectarBoton(20, height - 100, 200, 60)) { //(PANTALLA INICIO) instrucciones
      estado = "primera";
    } else if (detectarBoton(420, height - 100, 200, 60)) { // o Jugar
      estado = "segunda";
    }
  } else if (estado === "primera") {
    if (detectarBoton(240, height - 80, 120, 60 )) { //(PANTALLA DE instrucciones) opcion de volver al inicio
      estado = "inicio";
    }
  }
}
