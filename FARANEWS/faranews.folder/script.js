document.addEventListener("DOMContentLoaded", function() {
  var formulario = document.getElementById("formulario-suscripcion");
  var modal = document.getElementById("modal-confirmacion");

  formulario.addEventListener("submit", function(event) {


    var input_nombre = document.getElementById("nombre");
    var input_apellido = document.getElementById("apellido");
    var input_email = document.getElementById("email");
    var input_apodotortu = document.getElementById("apodotortu");

    var valor_nombre = input_nombre.value;
    var valor_apellido = input_apellido.value;
    var valor_apodotortu = input_apodotortu.value;
    var valor_email = input_email.value;

    console.log("Nombre:", valor_nombre);
    console.log("Apellido:", valor_apellido);
    console.log("Email:", valor_email);
    console.log("Apodo:", valor_apodotortu);

    
    modal.classList.remove("oculto");

   
    var modalTitulo = document.getElementById("modal-titulo");
    const apodoFinal = valor_apodotortu ? valor_apodotortu.toUpperCase() : valor_nombre.toUpperCase();
    modalTitulo.innerHTML = ` GRACIAS, ${apodoFinal}!`;

  
    var mensajeModal = document.getElementById("mensaje-modal");
    var mensajeCorreo = document.getElementById("mensaje-correo");
    mensajeModal.innerHTML = `TU SUSCRIPCIÓN FUE MÁS RÁPIDA QUE UNA FUNA COLECTIVA EN TWITTER. <br> YA SOS PARTE DE FARANEWS: CARTELERA MINUTO A MINUTO, LINKS SIN CENSURA, EL BARDO ANTES QUE NADIE Y DESCUENTOS EXCLUSIVOS.<br>REVISÁ TU CORREO <span id="email-confirmado">${valor_email}</span><br>Y SI NO ESTÁ… DENUNCIÁ A GMAIL, AMOR.`;

    var botonCerrarModal = document.getElementById("cerrar-modal-boton");
    botonCerrarModal.addEventListener("click", function () {
      modal.classList.add("oculto");
    });

    formulario.reset();
  });
});

let index = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    index += step;
    if (index >= totalSlides) {
        index = 0;
    }
    if (index < 0) {
        index = totalSlides - 1;
    }

    document.querySelector('.carousel').style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => moveSlide(1), 5000);