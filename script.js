// ---------- Vista previa de la foto ----------
const entradaFoto = document.getElementById("entrada-foto");
const fotoPerfil = document.getElementById("foto-perfil");

entradaFoto.addEventListener("change", () => {
  const archivo = entradaFoto.files[0];
  if (!archivo || !archivo.type.startsWith("image/")) return;
  fotoPerfil.src = URL.createObjectURL(archivo);
});

// ---------- Botones "+ Agregar" (manipulación del DOM) ----------

// Recibe un objeto (como en JSON) y devuelve el <li> que se agrega a la lista
function crearHito(item) {
  const li = document.createElement("li");
  li.className = "hito";

  if (item.icono) {
    const contenedorIcono = document.createElement("div");
    contenedorIcono.className = "hito-icono";

    const imagen = document.createElement("img");
    imagen.src = item.icono;
    imagen.alt = `${item.titulo} icono`;
    imagen.loading = "lazy";

    contenedorIcono.appendChild(imagen);
    li.appendChild(contenedorIcono);
  }

  const titulo = document.createElement("p");
  titulo.className = "hito-titulo";
  titulo.textContent = item.titulo;

  li.appendChild(titulo);
  return li;
}

document.querySelectorAll(".agregar").forEach((formulario) => {
  const campoIcono = formulario.querySelector("input[data-role='icono']");

  if (campoIcono) {
    campoIcono.addEventListener("change", () => {
      const archivo = campoIcono.files[0];
      if (!archivo || !archivo.type.startsWith("image/")) return;
      formulario.dataset.iconoSeleccionado = URL.createObjectURL(archivo);
    });
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const campo = formulario.querySelector("input[type='text']");
    const texto = campo.value.trim();
    if (!texto) return;

    const icono = campoIcono ? formulario.dataset.iconoSeleccionado || "" : "";
    const nuevoItem = { titulo: texto, icono };
    const lista = document.getElementById(formulario.dataset.lista);
    lista.appendChild(crearHito(nuevoItem));

    campo.value = "";
    if (campoIcono) {
      campoIcono.value = "";
      delete formulario.dataset.iconoSeleccionado;
    }
    campo.focus();
  });
});