// Ana Cotleroff. Comision 2.

int estado;
PImage img1, img2, img3, img4, img44, img5;
PFont fuente1;
float posX;
float posY;
float velX;
float tamX;
int alpha = 255;
int tam = 30;
color colorcitosTexto;
int esquinabotonX1 = 215;
int esquinabotonY1 = 400;
int ancho = 200;
int alto = 50;




void setup(){
  size(640, 480);
  textSize(tam);
  fuente1 = loadFont("tipografia1.1.vlw");
  textFont(fuente1);
  textAlign(CENTER, CENTER);
  estado = 1;
  img1 = loadImage("clue1.png");
  img2 = loadImage("clue2.jpg");
  img3 = loadImage("clue3.jpg");
  img4 = loadImage("clue4.jpg");
  img44 = loadImage("cluecuatrodos.jpg");
  img5 = loadImage("clue5.jpg");
  posX = width / 5;
  posY = height / 8;
  velX = 0.8;
}




void draw(){
println(mouseX + "/" + mouseY);
  
  
  
if (estado == 1){
  background(245, 70, 10);
  image(img1, 0, 130, 640, 430);
  textSize(tam);
  text("CLUE:\n¿Quién?, ¿Con qué?, ¿Dónde?\nUn clásico juego de misterio y estrategia.", posX, posY); 
  posX += velX;
if (posX >= width - textWidth("CLUE:\n¿Quién?, ¿Con qué?, ¿Dónde?\nUn clásico juego de misterio y estrategia.")/2){
  velX = -1;
}
if (posX <= textWidth("CLUE:\n¿Quién?, ¿Con qué?, ¿Dónde?\nUn clásico juego de misterio y estrategia.")/2){
  velX = 1;
}
if (frameCount / 60 >= 8){
estado = 2;
 }
} 



else if (estado == 2) {
  background(255);
  image(img2, 0, 0, 420, 480);
if (alpha > 5){
  alpha -= 0.02;
}
  fill(0, alpha);
  textSize(tam);
  textAlign(CENTER, CENTER);
  text("1 asesinato \n6 sospechosos \nEn este \nescenario, los \njugadores deben \ndescubrir al \nresponsable de \nasesinar al \nSr. Boddy de \nTudo en su \npropia casa.", 535, 235);
if (frameCount / 60 >= 12){
  estado = 3;
 }
}



else if (estado == 3) {
  background(113,35,10);
  image(img3, 250, 0, 390, 480);
if (tam < 38) {
  tam += 1;
}
  textAlign(CENTER, CENTER);
  textSize(tam);
  fill(255);
  text("No solo deben \ndescubrir al \nasesino, ¡Sino \ntambién \nen qué \nhabitación \nlo llevó \na cabo!", 130, 240);
if (frameCount / 60 >= 15) {
  estado = 4;
  tam = 30;
 }
}



else if (estado == 4) {
  background(255);
  image(img4, 95, 190, 460, 285);
  image(img44, 0, 0, 640, 150);
if (tam < 38){
  tam += 1;
}
  textAlign(CENTER, CENTER);
  textSize(tam);
  fill(113,35,10);
  text("¡Y qué arma utilizó!", width/2, 155);
if (frameCount / 60 >= 20) {
  estado = 5;
  tam = 30;
 }
}



else if (estado == 5) {
  background(0);
  image(img5, 60, 40, 520, 400);
  colorcitosTexto = color(random(255), random(255), random(255)); 
  fill(colorcitosTexto);
  textAlign(CENTER, CENTER);
  textSize(45);
  text("¿Qué esperas para jugarlo?", width/2, 60);
  fill(91, 36, 206);
  rect(esquinabotonX1, esquinabotonY1, ancho, alto);
  fill(255);
  text("Reiniciar", esquinabotonX1 + ancho/2, esquinabotonY1 + alto/2);
 }
}



void mousePressed() {
  if (estado == 5 && mouseX > esquinabotonX1 && mouseX < esquinabotonX1+ancho && mouseY > esquinabotonY1 && mouseY < esquinabotonY1+alto){
    estado = 1;
    frameCount = 0;
    tam = 30;
    posX = width / 5;
    posY = height / 8;
    velX = 0.8;
    alpha = 255;
  }
}
