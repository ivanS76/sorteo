const resultado = document.getElementById("resultado");
const tablero = document.getElementById("tablero");
const listaGanadores = document.getElementById("listaGanadores");
const inputNombreContainer = document.getElementById("inputNombreContainer");
const nombreGanadorInput = document.getElementById("nombreGanador");
const cantidadNumerosInput = document.getElementById("cantidadNumeros");

let disponibles = [];
let numerosDOM = {};
let animando = false;
let numeroActual = null;

function crearTablero(cantidad = 200) {
  disponibles = [];
  numerosDOM = {};
  tablero.innerHTML = "";
  listaGanadores.innerHTML = "";
  resultado.innerText = "--";
  inputNombreContainer.style.display = "none";
  nombreGanadorInput.value = "";
  numeroActual = null;
  tablero.style.display = "grid";

  for (let i = 1; i <= cantidad; i++) {
    disponibles.push(i);
    const div = document.createElement("div");
    div.className = "numero";
    div.innerText = i;
    tablero.appendChild(div);
    numerosDOM[i] = div;
  }
}

function sortear() {
  if (animando || disponibles.length === 0) return;
  animando = true;

  let vueltas = 30;
  let cuenta = 0;

  inputNombreContainer.style.display = "none";
  nombreGanadorInput.value = "";

  let interval = setInterval(() => {
    const aleatorio = disponibles[Math.floor(Math.random() * disponibles.length)];
    mostrarNumero(aleatorio, false);

    cuenta++;

    if (cuenta >= vueltas) {
      clearInterval(interval);

      const idx = Math.floor(Math.random() * disponibles.length);
      const ganador = disponibles.splice(idx, 1)[0];
      numeroActual = ganador;

      mostrarNumero(ganador, true);
      animando = false;

      inputNombreContainer.style.display = "block";
      nombreGanadorInput.focus();

      if (disponibles.length === 0) {
        tablero.style.display = "none";
      }
    }
  }, 100);
}

function mostrarNumero(num, esGanador) {
  if (numeroActual !== null && numerosDOM[numeroActual]) {
    numerosDOM[numeroActual].classList.remove("destacado");
    numerosDOM[numeroActual].classList.add("salido");
  }

  resultado.innerText = num;
  resultado.classList.add("animar");

  setTimeout(() => resultado.classList.remove("animar"), 200);

  if (esGanador) {
    numerosDOM[num].classList.add("destacado");
    numerosDOM[num].classList.remove("salido");
  }
}

function agregarNombre() {
  const nombre = nombreGanadorInput.value.trim();
  if (numeroActual === null) {
    alert("No hay número sorteado para asignar nombre.");
    return;
  }
  if (!nombre) {
    alert("Por favor, escribí un nombre para el ganador.");
    return;
  }
  agregarGanador(numeroActual, nombre);

  if (numerosDOM[numeroActual]) {
    numerosDOM[numeroActual].classList.add("salido");
    numerosDOM[numeroActual].classList.remove("destacado");
  }

  nombreGanadorInput.value = "";
  inputNombreContainer.style.display = "none";
  numeroActual = null;
}

function agregarGanador(num, texto) {
  const li = document.createElement("li");
  li.textContent = `Número ${num} - ${texto}`;
  listaGanadores.appendChild(li);
}
function reiniciarTodo() {
  if (animando) return;
  let cantidad = parseInt(cantidadNumerosInput.value);
  if (isNaN(cantidad) || cantidad < 1) {
    alert("Ingresá un número válido mayor a 0.");
    return;
  }
  document.getElementById("tituloRango").innerText = `Del n° 1 al n° ${cantidad}`;
  crearTablero(cantidad);
}


function reiniciarDesdeInput() {
  if (animando) return;
  let cantidad = parseInt(cantidadNumerosInput.value);
  if (isNaN(cantidad) || cantidad < 1) {
    alert("Ingresá un número válido mayor a 0.");
    return;
  }
  crearTablero(cantidad);
}

crearTablero(); // inicializa con 200 si no se toca el input
