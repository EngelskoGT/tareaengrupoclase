document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/encuestas";
  let encuestaID = 1;

  const surveyTitle = document.getElementById("survey-title");
  const surveyDesc = document.getElementById("survey-desc");
  const questionsContainer = document.getElementById("questions");
  const summaryContainer = document.getElementById("summary");
  const formEncuesta = document.getElementById("form-encuesta");
  const payloadPre = document.getElementById("payloadPre");
  const tipoEncuestaSelect = document.getElementById("tipo-encuesta");
  const tipoEncuestaResumen = document.getElementById("tipo-encuesta-resumen");

  let encuestaGlobal = null;

  async function cargarEncuesta() {
    try {
      const res = await fetch(`${API_URL}/${encuestaID}`);
      if (!res.ok) throw new Error("Error al cargar la encuesta");

      const data = await res.json();
      const encuesta = JSON.parse(data[0].JsonResult);
      encuestaGlobal = encuesta;

      surveyTitle.textContent = encuesta.Nombre;
      surveyDesc.textContent = encuesta.Descripcion;

      questionsContainer.innerHTML = encuesta.Preguntas.map(p => `
        <div class="card shadow-sm question-card" data-pregunta-id="${p.PreguntaID}">
          <div class="card-body">
            <h5 class="card-title">${p.TextoPregunta} <span class="required-asterisk">*</span></h5>
            ${p.Opciones.map(o => `
              <div class="form-check">
                <input class="form-check-input" type="radio" name="pregunta-${p.PreguntaID}" value="${o.OpcionID}" required>
                <label class="form-check-label">${o.TextoOpcion}</label>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("");
    } catch (err) {
      console.error(err);
      surveyDesc.textContent = "Error cargando encuesta 😢";
    }
  }

  async function cargarResumen() {
    try {
      const res = await fetch(`${API_URL}/resumen/${encuestaID}`);
      if (!res.ok) throw new Error("Error al cargar el resumen");

      const result = await res.json();
      if (!result.success) throw new Error(result.error);

      const resumen = result.data;

      // ✅ Cabecera con nombre y descripción de la encuesta
      let header = `
        <div class="card shadow-sm mb-4 border-primary">
          <div class="card-body">
            <h4 class="card-title text-primary">${resumen.Encuesta}</h4>
            <p class="card-text text-muted">${resumen.Descripcion}</p>
          </div>
        </div>
      `;

      let preguntasHtml = resumen.Preguntas.map(p => {
        let indicador = "";
        if (p.Porcentaje >= 60) {
          indicador = "✅ &#128512;";
        } else if (p.Porcentaje >= 30) {
          indicador = "🟡 😐";
        } else {
          indicador = "🔴 😢";
        }

        return `
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <h5 class="card-title">${p.TextoPregunta}</h5>
              <p class="mb-1">
                <strong>Porcentaje:</strong> ${p.Porcentaje.toFixed(2)}% ${indicador}
              </p>
              <p class="small text-muted">
                Respondieron: ${p.NumeroUsuariosRespondieron} /
                Total opciones: ${p.TotalOpcionesDisponibles}
              </p>
            </div>
          </div>
        `;
      }).join("");

      summaryContainer.innerHTML = header + preguntasHtml;

    } catch (err) {
      console.error(err);
      summaryContainer.innerHTML = `<div class="alert alert-danger">No se pudo cargar el resumen</div>`;
    }
  }

  // 🔹 Cambio de encuesta en RESPONDER
  tipoEncuestaSelect.addEventListener("change", () => {
    const selectedID = parseInt(tipoEncuestaSelect.value, 10);
    if (!isNaN(selectedID)) {
      encuestaID = selectedID;
      formEncuesta.reset();
      questionsContainer.innerHTML = "";
      cargarEncuesta();
    }
  });

  // 🔹 Cambio de encuesta en RESUMEN (ahora también actualiza título y descripción)
  tipoEncuestaResumen.addEventListener("change", () => {
    const selectedID = parseInt(tipoEncuestaResumen.value, 10);
    if (!isNaN(selectedID)) {
      encuestaID = selectedID;
      summaryContainer.innerHTML = "";
      cargarResumen();
    }
  });

  // Inicial
  cargarEncuesta();
  cargarResumen();
});
