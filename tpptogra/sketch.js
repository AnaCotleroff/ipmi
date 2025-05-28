let imgColor;
let imgForma;
let resultado;
let boca;
let nariz;
let currentTonoFactor = 1.0;
let targetTonoFactor = 1.0;
let calor = 0.0;         
let calorActual = 0.0;   
let bocaSeMueve = false;
let bocaOffset = 0;
let narizSeMueve = false;
let narizOffset = 0;
let narizcostado;


function preload() {
    imgColor = loadImage('data/foto1.jpg');
    imgForma = loadImage('data/foto2.jpg');
    boca = loadImage('data/boca.png');
    nariz = loadImage('data/nariz.png');
    narizcostado = loadImage('data/narizcostado.png');
}

function setup() {

    imgForma.resize(imgColor.width, imgColor.height);
    let escala = 0.5;
    
    imgForma.resize(imgColor.width, imgColor.height);

    createCanvas(imgColor.width, imgColor.height);

    imgColor.loadPixels();
    imgForma.loadPixels();
    resultado = createImage(imgColor.width, imgColor.height);
    resultado.loadPixels();

    for (let y = 0; y < imgColor.height; y++) {
        for (let x = 0; x < imgColor.width; x++) {
            let index = (x + y * imgColor.width) * 4;

            
            let r = imgColor.pixels[index];
            let g = imgColor.pixels[index + 1];
            let b = imgColor.pixels[index + 2];

            
            let br = imgForma.pixels[index];
            let bg = imgForma.pixels[index + 1];
            let bb = imgForma.pixels[index + 2];
            let brillo = (br + bg + bb) / 3;
            let escala = brillo / 255;

             
            resultado.pixels[index] = r * escala;
            resultado.pixels[index + 1] = g * escala;
            resultado.pixels[index + 2] = b * escala;
            resultado.pixels[index + 3] = 255;
        }
    }

    resultado.updatePixels();

   

}


function draw() {
    background(0);

    if (keyIsDown(84)) { // 'T' (oscurecerrr)
        targetTonoFactor = constrain(targetTonoFactor - 0.01, 0.3, 2.0);
    }
    if (keyIsDown(80)) { // 'P' (aclararrrr)
        targetTonoFactor = constrain(targetTonoFactor + 0.01, 0.3, 2.0);
    }
  
    if (keyIsDown(67)) { // 'C' (calidezzzz)
        calor += 0.05;
    }
    if (keyIsDown(70)) { // 'F' (frialdaddd)
        calor -= 0.05;
    }


    
   
    let factor = transicionarTonalidad();
    calorActual = lerp(calorActual, calor, 0.08);

    loadPixels();
    resultado.loadPixels();

    for (let i = 0; i < resultado.pixels.length; i += 4) {
        let r = resultado.pixels[i];
        let g = resultado.pixels[i + 1];
        let b = resultado.pixels[i + 2];

        
        r = constrain(r + calorActual * 20, 0, 255);
        b = constrain(b - calorActual * 20, 0, 255);

        
        r *= factor;
        g *= factor;
        b *= factor;

        pixels[i] = constrain(r, 0, 255);
        pixels[i + 1] = constrain(g, 0, 255);
        pixels[i + 2] = constrain(b, 0, 255);
        pixels[i + 3] = 255;
    }

    updatePixels();

   
 imageMode(CENTER);

    let centroX = width / 2;
    let centroY = height / 2;

    let anchoNariz = 100;
    let altoNariz = 600;

    let anchoBoca = 400;
    let altoBoca = 150;

    if (narizSeMueve) {
    narizOffset = random(-10, 5); 
     } else {
    narizOffset = 0;
    }
    image(nariz, centroX, centroY - 100 + narizOffset, anchoNariz, altoNariz);
    image(narizcostado, centroX, centroY - 20, anchoNariz, altoNariz);

    
    if (bocaSeMueve) {
    bocaOffset = random(-10, 5); 
     } else {
    bocaOffset = 0;
    }
    image(boca, centroX, centroY + 490 + bocaOffset, anchoBoca, altoBoca);

}

function keyPressed() {
    if (key === 'n' || key === 'N') {
        targetTonoFactor = 1.0;
        calor = 0.0;
    }

    if (key === 'j' || key === 'J') {
        bocaSeMueve = true;
        narizSeMueve = true;
    }

    if (key === 'k' || key === 'K') {
        bocaSeMueve = false; 
        narizSeMueve = false;
    }



}

function transicionarTonalidad() {
    currentTonoFactor = lerp(currentTonoFactor, targetTonoFactor, 0.05);
    return currentTonoFactor;
}