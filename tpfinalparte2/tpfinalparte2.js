// Video: https://youtu.be/rxNSxMLE_Kw


let tiempoInicio;
let limiteTiempo = 30000;
let pantallaCreditos;
let escenas = [];
let texto= [];
let estado;
let sonidoDerrota;
let sonidoVictoria;
let objJuego;
let imgDora;
let imgFondo;
let imgZorro;
let imgCuchillo;
let instrucciones;


function preload() {
  for (let i = 0; i < 5; i++) {
    escenas[i] = loadImage("data/escena" + i + ".jpg");
  }

  imgDora = loadImage('data/dora.png');
  imgFondo = loadImage ('data/fondo.jpg');
  imgCuchillo = loadImage ('data/cuchillo.png');
  imgZorro = loadImage ('data/zorro.png');
  texto = loadStrings ("data/texto.txt");
  sonidoDerrota = loadSound('data/miau.mp3');
  sonidoVictoria = loadSound('data/happy.mp3');
}
function setup() {
  createCanvas(640, 480);
  objJuego = new Juego();
  estado = "inicio";
  pantallaCreditos = new PantallaCreditos();  
}

function draw() {
  background(200);

  if (estado === "inicio") {
    image(escenas[0], 0, 0, width, height);
    fill(213, 232, 234);
    rect (0, 0, 640, 55);
    cargaTextoArriba(0);
    dibujarBoton(40, height - 75, 200, 60, "Instrucciones");
    dibujarBoton(400, height - 75, 200, 60, "Jugar");
    reiniciarJuego();
  } else if (estado === "primera") {
    image(escenas[4], 0, 0, width, height);
    cargaTextoArriba(1);
    dibujarBoton(240, height - 80, 150, 60, "Volver");
    reiniciarJuego();
  } else if (estado === "segunda") {
    if (!tiempoInicio) {
      tiempoInicio = millis();
    }
    let tiempoTranscurrido = millis() - tiempoInicio;

    objJuego.dibujar();
    fill(213, 232, 234);
    rect(0, 0, 640, 60);
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("Tiempo: " + floor((limiteTiempo - tiempoTranscurrido) / 1000), width / 2, 30);

    if (tiempoTranscurrido >= limiteTiempo) {
      estado = "victoria";
    }
} else if (estado === "muerte") {
   
    image(escenas[2], 0, 0, width, height);
    cargaTexto(2);
    dibujarBoton(40, height - 75, 200, 60, "Volver al Inicio");
    dibujarBoton(400, height - 75, 200, 60, "Creditos");
    reiniciarJuego();
    
    
    if (!sonidoDerrota.isPlaying()) {
      sonidoDerrota.play();
    }

  } else if (estado === "victoria") {
    image(escenas[3], 0, 0, width, height);
    cargaTexto(3);
    dibujarBoton(40, height - 75, 200, 60, "Volver al Inicio");
    dibujarBoton(400, height - 75, 200, 60, "Creditos");
    reiniciarJuego();

   if (!sonidoVictoria.isPlaying()) {
      sonidoVictoria.play();
    }
    
  } else if (estado === "tercera") {
    pantallaCreditos.mostrar();
    reiniciarJuego();
  }
}
function reiniciarJuego() {

  objJuego = new Juego();
  tiempoInicio = null;
  
 
  if (estado !== "muerte" && sonidoDerrota.isPlaying()) {
    sonidoDerrota.stop();
  }
  
  if (estado !== "victoria" && sonidoVictoria.isPlaying()) {
    sonidoVictoria.stop();
  }
}

function keyPressed() {
  objJuego.teclaPresionada (key);
}

function keyReleased() {
  objJuego.personaje.teclaLiberada(key);
}

function cargaTexto(indice) {
  textSize(25);
  noStroke();
  fill(213, 232, 234);
  rect(0, 330, 640, 170);
  fill(0);
  textAlign(CENTER, TOP);
  text(texto[indice], 25, 345, 580);
}

function cargaTextoArriba(indice) {
  textSize(25);
  noStroke();
  fill(213, 232, 234);
  rect(0, 370, 640, 170);
  fill(0);
  textAlign(CENTER, TOP);
  text(texto[indice], 20, 15, 580);
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
    if (detectarBoton(40, height - 100, 200, 60)) { //(PANTALLA INICIO) instrucciones
      estado = "primera";
    } else if (detectarBoton(400, height - 100, 200, 60)) { // o Jugar
      estado = "segunda";
    }
  } else if (estado === "primera") {
    if (detectarBoton(240, height - 80, 150, 60 )) { //(PANTALLA DE instrucciones) opcion de volver al inicio
      estado = "inicio";
    }
  } else if (estado === "muerte") {
    if (detectarBoton(40, height - 100, 200, 60)) { //(PANTALLA muerte) ir al inicio
      estado = "inicio";
    } else if (detectarBoton(400, height - 100, 200, 60)) { // creditos
      estado = "tercera";
    }
  } else if (estado === "tercera") {
    if (detectarBoton(240, height - 80, 150, 60 )) { //(PANTALLA DE creditos) ir al inicio
      estado = "inicio";
    }
  } else if (estado === "victoria") {
    if (detectarBoton(40, height - 100, 200, 60)) { //(PANTALLA victoria) ir al inicio
      estado = "inicio";
    } else if (detectarBoton(400, height - 100, 200, 60)) { // creditos
      estado = "tercera";
    }
  }
}
