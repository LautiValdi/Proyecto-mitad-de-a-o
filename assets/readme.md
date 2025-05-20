Este código JavaScript crea la lógica para un juego de acertijos con niveles y preguntas. Las funciones que contiene controlan el flujo del juego, gestionan los modales y verifican las respuestas. Veamos cada sección en detalle.

1. Variables Globales y Estructuras de Datos
Estas variables y matrices almacenan información que el juego necesita para avanzar entre niveles, preguntas, y gestionar el estado general del jugador.

Variables Globales:
javascript
Copiar código
let indicePregunta = 0;
let nivelActual = 1;
const preguntasPorNivel = 3;
indicePregunta: Lleva la cuenta de cuál pregunta en el nivel está respondiendo el jugador.
nivelActual: Guarda el nivel en el que se encuentra el jugador, comenzando en el nivel 1.
preguntasPorNivel: Define cuántas preguntas hay en cada nivel (en este caso, 3).
Matrices de Preguntas, Descripción y Historia del Nivel
preguntas:

javascript
Copiar código
const preguntas = [
  [
    { pregunta: "¿Cuántos meses tienen 28 días?", respuesta: "12" },
    { pregunta: "Soy más largo que una palabra y comienzo con P. ¿Qué soy?", respuesta: "pregunta" },
    { pregunta: "¿Qué sube pero nunca baja?", respuesta: "edad" },
  ],
  [
    { pregunta: "El padre de Clara tiene 5 hijas...", respuesta: "clara" },
    { pregunta: "Es tuyo, pero otros lo usan más...", respuesta: "nombre" },
    { pregunta: "Cuanto más seca, más moja...", respuesta: "esponja" },
  ],
  [
    { pregunta: "Estoy lleno de agujeros...", respuesta: "esponja" },
    { pregunta: "Si me nombras, me rompes...", respuesta: "silencio" },
    { pregunta: "¿Qué palabra es siempre...", respuesta: "incorrectamente" },
  ]
];
Cada subarreglo representa un nivel, y cada objeto en el subarreglo contiene una pregunta y su respuesta correcta.
Esta estructura permite al juego buscar la pregunta correcta de acuerdo al nivel y la posición de la pregunta en el nivel.
descripcionNivel:

javascript
Copiar código
const descripcionNivel = [
  "Nivel 1: Se llevaron a tus alumnos y te encerraron...",
  "Nivel 2: Avanzas al siguiente nivel...",
  "Nivel 3: Estás cerca del final..."
];
Describe el contexto o misión del jugador en cada nivel. Se muestra cuando el jugador pasa de un nivel al siguiente.
historiaNivel:

javascript
Copiar código
const historiaNivel = [
  "Resolviste los acertijos y lograste encontrar la llave...",
  "Resuelves los acertijos y logras conseguir dinero...",
  "Vences a Felix y logras rescatar a tus alumnos..."
];
Describe lo que sucede después de completar un nivel, sirviendo como narrativa de progreso en el juego.
2. Funciones para Gestionar Modales
Los modales son ventanas emergentes que permiten mostrar información y recibir entradas del jugador (por ejemplo, respuestas). Las siguientes funciones abren y cierran estos modales.

mostrarModal(id) y cerrarModal(id):
javascript
Copiar código
function mostrarModal(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}
mostrarModal: Muestra un modal específico, cambiando el display a flex.
cerrarModal: Oculta el modal, estableciendo su display en none.
La función usa el parámetro id para identificar el modal específico en el HTML.
3. Funciones del Flujo del Juego
Estas funciones gestionan el avance del juego desde el inicio hasta el final, además de controlar el avance entre niveles y preguntas.

3.1 Función mostrarModalIntroduccion()
javascript
Copiar código
function mostrarModalIntroduccion() {
  mostrarModal("modal-intro");
}
Llama a mostrarModal con el ID del modal de introducción. Esto se ejecuta cuando el usuario hace clic en el botón "Iniciar Juego" en la interfaz de usuario.
3.2 Función iniciarJuego()
javascript
Copiar código
function iniciarJuego() {
  nivelActual = 1;
  indicePregunta = 0;
  mostrarModalNivel();
}
nivelActual = 1 y indicePregunta = 0: Reinicia el juego, estableciendo el primer nivel y la primera pregunta.
mostrarModalNivel(): Muestra el modal del primer nivel con su descripción inicial.
3.3 Función mostrarModalNivel()
javascript
Copiar código
function mostrarModalNivel() {
  const textoNivel = descripcionNivel[nivelActual - 1];
  document.getElementById("texto-nivel").textContent = textoNivel;
  mostrarModal("modal-nivel");
}
textoNivel: Extrae la descripción del nivel actual desde descripcionNivel.
mostrarModal("modal-nivel"): Muestra el modal con el texto actualizado para que el jugador entienda la misión del nivel.
3.4 Función mostrarModalPregunta()
javascript
Copiar código
function mostrarModalPregunta() {
  const preguntaActual = preguntas[nivelActual - 1][indicePregunta];
  document.getElementById("pregunta").textContent = preguntaActual.pregunta;
  document.getElementById("respuesta").value = ""; // Limpia el campo de respuesta
  mostrarModal("modal-pregunta");
}
preguntaActual: Selecciona la pregunta actual basada en nivelActual e indicePregunta.
document.getElementById("pregunta").textContent: Muestra la pregunta en el modal de preguntas.
document.getElementById("respuesta").value = "": Limpia el campo de entrada para que el jugador pueda ingresar su respuesta.
3.5 Función verificarRespuesta()
javascript
Copiar código
function verificarRespuesta() {
  const respuestaUsuario = document.getElementById("respuesta").value.toLowerCase();
  const respuestaCorrecta = preguntas[nivelActual - 1][indicePregunta].respuesta;

  if (respuestaUsuario === respuestaCorrecta) {
    cerrarModal("modal-pregunta");

    if (indicePregunta < preguntasPorNivel - 1) {
      indicePregunta++;
      mostrarModalProgreso();
    } else if (nivelActual < 3) {
      mostrarHistoriaNivel();
      nivelActual++;
      indicePregunta = 0;
    } else {
      document.getElementById("game-output").innerHTML += "<p><strong>¡Ganaste el juego!</strong></p>";
    }
  } else {
    cerrarModal("modal-pregunta");
    mostrarModal("modal-gameover");
  }
}
respuestaUsuario: Captura la respuesta ingresada por el usuario y la convierte a minúsculas.
Verificación de respuesta:
Si la respuesta es correcta:
cerrarModal("modal-pregunta"): Cierra el modal de preguntas.
Si hay más preguntas en el nivel actual, incrementa indicePregunta y muestra el modal de progreso.
Si no quedan más preguntas en el nivel y hay niveles disponibles, muestra la historia del nivel actual, luego incrementa nivelActual y reinicia indicePregunta.
Si no hay más niveles, muestra un mensaje de victoria.
Si la respuesta es incorrecta, muestra el modal de Game Over.
3.6 Función mostrarModalProgreso()
javascript
Copiar código
function mostrarModalProgreso() {
  document.getElementById("mensaje-progreso").textContent = "¡Respuesta correcta! Avanzas en tu misión.";
  mostrarModal("modal-progreso");
}
Muestra un mensaje de progreso tras una respuesta correcta y abre el modal de progreso.
3.7 Funciones mostrarModalHistoria() y mostrarHistoriaNivel()
Ambas funciones muestran la historia del nivel actual en el modal de historia. Son casi idénticas y se llaman en distintos puntos del juego.

3.8 Función reiniciarJuego()
javascript
Copiar código
function reiniciarJuego() {
  cerrarModal("modal-gameover");
  iniciarJuego();
}
Permite al usuario reiniciar el juego tras un Game Over. Cierra el modal de Game Over y llama a iniciarJuego() para empezar de nuevo desde el nivel 1 y la primera pregunta.
Este desglose debería darte una comprensión detallada de cómo cada parte del código contribuye al funcionamiento completo del juego, desde la gestión de preguntas y niveles hasta la apertura y cierre de los modales.

Number: Para índices y control de niveles.
String: Para almacenar textos de preguntas, respuestas y narraciones.
Array: Para agrupar colecciones de preguntas, descripciones y narrativas.
Object: Para estructurar cada pregunta como un par pregunta-respuesta.
Boolean (implícito): En las condiciones de control de flujo (if).