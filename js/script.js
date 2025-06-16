/*  VARIABLES GLOBALES */
let indicePregunta = 0;
let nivelActual = 1;
const preguntasPorNivel = 3;
let puntaje = 0;
let vidas = 2;

/*  DATOS DEL JUEGO  */
const preguntas = [
  [
    // Nivel 1
    {
      pregunta:
        "¿Qué tiene ciudades, pero no casas; bosques, pero no árboles; y agua, pero no peces?",
      opciones: [
        "a) Un holograma",
        "b) Un sueño",
        "c) Un mapa",
        "d) Un planeta desierto",
      ],
      respuestaCorrecta: "c",
    },
    {
      pregunta:
        "Si me tienes, quieres compartirme. Si me compartes, no me tienes. ¿Qué soy?",
      opciones: ["a) Un tesoro", "b) Un secreto", "c) Un chiste", "d) Comida"],
      respuestaCorrecta: "b",
    },
    {
      pregunta: "Siempre estoy llegando, pero nunca llego. ¿Qué soy?",
      opciones: ["a) El pasado", "b) El futuro", "c) El tren", "d) Una carta"],
      respuestaCorrecta: "b",
    },
  ],
  [
    // Nivel 2
    {
      pregunta:
        "Tiene hojas pero no es árbol, te cuenta historias pero no tiene voz. ¿Qué es?",
      opciones: ["a) Un río", "b) Un eco", "c) Un libro", "d) El viento"],
      respuestaCorrecta: "c",
    },
    {
      pregunta:
        "Oro parece, plata no es. El que no lo adivine, bien tonto es. ¿Qué es?",
      opciones: [
        "a) El sol",
        "b) Un plátano",
        "c) Un espejo",
        "d) Una moneda de latón",
      ],
      respuestaCorrecta: "b",
    },
    {
      pregunta:
        "Vuelo de noche, duermo de día, y nunca verás plumas en ala mía. ¿Qué soy?",
      opciones: [
        "a) Un avión sigiloso",
        "b) Un fantasma",
        "c) Un murciélago",
        "d) Un dron espía",
      ],
      respuestaCorrecta: "c",
    },
  ],
  [
    // Nivel 3
    {
      pregunta:
        "Entras en una habitación oscura con una cerilla. Dentro hay una lámpara de queroseno, una vela y una antorcha. ¿Qué enciendes primero?",
      opciones: [
        "a) La vela",
        "b) La lámpara",
        "c) La antorcha",
        "d) La cerilla",
      ],
      respuestaCorrecta: "d",
    },
    {
      pregunta: "Soy alto cuando joven y corto cuando viejo.  ¿Qué soy?",
      opciones: [
        "a) Un árbol",
        "b) Un explorador",
        "c) Una vela / antorcha",
        "d) Un día en Xylos",
      ],
      respuestaCorrecta: "c",
    },
    {
      pregunta:
        "Tiene llaves pero no abre puertas, tiene espacio pero no habitaciones. ¿Qué es?",
      opciones: [
        "a) Un piano",
        "b) Un mapa estelar",
        "c) Un teclado",
        "d) Un cofre con clave",
      ],
      respuestaCorrecta: "c",
    },
  ],
];

const descripcionNivel = [
  "Nivel 1: ¡Emergencia! Reactiva el sistema de comunicaciones de 'El Cometa Veloz'.",
  "Nivel 2: Adéntrate en la jungla de Xylos para rescatar a la Dra. Astra.",
  "Nivel 3: Descifra los enigmas de las ruinas y libera al Oficial Kael.",
];

const historiaNivel = [
  "¡Lo lograste! El sistema de comunicación está online.",
  "¡Excelente! Has rescatado a la Dra. Astra.",
  "¡Misión cumplida! Tripulación reunida, hora de volver a casa.",
];

/*  UTILIDADES DE INTERFAZ  */
function mostrarModal(id) {
  document.getElementById(id).style.display = "flex";
}
function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}

function actualizarHUD() {
  const puntajes = document.querySelectorAll("#hud-puntaje");
  const vidasSpans = document.querySelectorAll("#hud-vidas");
  for (let i = 0; i < puntajes.length; i++) {
    puntajes[i].textContent = `Puntaje: ${puntaje}`;
  }
  for (let j = 0; j < vidasSpans.length; j++) {
    vidasSpans[j].textContent = `Vidas: ${vidas}`;
  }
}

/*  FLUJO PRINCIPAL  */
function mostrarModalIntroduccion() {
  mostrarModal("modal-intro");
}

function iniciarJuego() {
  indicePregunta = 0;
  nivelActual = 1;
  puntaje = 0;
  vidas = 2;
  document.getElementById("game-output").innerHTML = "";
  actualizarHUD();
  mostrarModalNivel();
}

function mostrarModalNivel() {
  document.getElementById("texto-nivel").textContent =
    descripcionNivel[nivelActual - 1];
  mostrarModal("modal-nivel");
}

function mostrarModalPregunta() {
  const obj = preguntas[nivelActual - 1][indicePregunta];
  document.getElementById("pregunta").textContent = obj.pregunta;

  const cont = document.getElementById("opciones-container");
  cont.innerHTML = "";
  for (let i = 0; i < obj.opciones.length; i++) {
    const div = document.createElement("div");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "respuesta";
    radio.id = "op" + i;
    radio.value = String.fromCharCode(97 + i); // a,b,c,d
    const label = document.createElement("label");
    label.htmlFor = radio.id;
    label.textContent = obj.opciones[i];
    div.appendChild(radio);
    div.appendChild(label);
    cont.appendChild(div);
  }
  actualizarHUD();
  mostrarModal("modal-pregunta");
}

function verificarRespuesta() {
  const radios = document.getElementsByName("respuesta");
  let val = null,
    i = 0;
  while (i < radios.length && !val) {
    if (radios[i].checked) val = radios[i].value;
    i++;
  }
  if (!val) {
    alert("Selecciona una respuesta.");
    return;
  }

  const correcta = preguntas[nivelActual - 1][indicePregunta].respuestaCorrecta;

  if (val === correcta) {
    puntaje += 10;
    actualizarHUD();
    cerrarModal("modal-pregunta");

    if (indicePregunta < preguntasPorNivel - 1) {
      indicePregunta++;
      mostrarModalProgreso();
    } else if (nivelActual < preguntas.length) {
      mostrarModalHistoria();
      nivelActual++;
      indicePregunta = 0;
    } else {
      mostrarModalHistoria();
      setTimeout(() => {
        cerrarModal("modal-historia");
        document.getElementById(
          "game-output"
        ).innerHTML = `<p><strong>¡FELICIDADES, CAPITÁN PEPO!</strong><br>Puntaje final: ${puntaje}</p>`;
      }, 500);
    }
  } else {
    vidas--;
    actualizarHUD();
    cerrarModal("modal-pregunta");
    vidas > 0
      ? mostrarModal("modal-gameover-parcial")
      : mostrarModal("modal-gameover");
  }
}

function mostrarModalProgreso() {
  document.getElementById("mensaje-progreso").textContent =
    "¡Correcto! Sigue así, Capitán.";
  actualizarHUD();
  mostrarModal("modal-progreso");
}

function mostrarModalHistoria() {
  document.getElementById("texto-historia").textContent =
    historiaNivel[nivelActual - 1];
  actualizarHUD();
  mostrarModal("modal-historia");
}

function reiniciarJuego() {
  cerrarModal("modal-gameover");
  iniciarJuego();
}
