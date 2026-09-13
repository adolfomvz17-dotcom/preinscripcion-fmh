/**
 * Backend de "Preinscripción" — Fundación Mis Habilidades.
 * Recibe el formulario de apps/preinscripcion/index.html y guarda cada
 * preinscripción como una fila nueva en la hoja "Preinscripciones".
 *
 * Instalación: ver README.md de esta misma carpeta.
 */

const HOJA = "Preinscripciones";

const COLUMNAS = [
  ["numero", "No."],
  ["fechaEnvio", "Fecha de envío"],
  ["anioIngreso", "Año lectivo al que aspira"],
  ["est_gradoAspira", "Grado al que aspira"],
  ["est_nombre", "Nombres y apellidos del estudiante"],
  ["est_tipoDoc", "Tipo de documento"],
  ["est_doc", "Número de documento"],
  ["est_expedido", "Expedido en"],
  ["est_nacDia", "Fecha de nacimiento"],
  ["est_edad", "Edad cumplida"],
  ["est_ciudadNac", "Ciudad de nacimiento"],
  ["est_rh", "Grupo sanguíneo y R.H."],
  ["est_eps", "E.P.S."],
  ["est_religion", "Religión que profesa"],
  ["est_dir", "Dirección"],
  ["est_cel1", "Celular 1 estudiante"],
  ["est_cel2", "Celular 2 estudiante"],
  ["est_colegioAnt", "Colegio actual"],
  ["est_gradoCurso", "Grado que cursa actualmente"],
  ["mad_nombre", "Nombre de la madre"],
  ["mad_cel1", "Celular de la madre"],
  ["pad_sinInfo", "Sin información del padre"],
  ["pad_nombre", "Nombre del padre"],
  ["pad_cel1", "Celular del padre"],
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(HOJA);
  if (!sheet) sheet = ss.insertSheet(HOJA);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNAS.map(c => c[1]));
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = getSheet_();
    const data = JSON.parse(e.postData.contents);

    if (!data.est_nombre || !data.est_nacDia) {
      throw new Error("Faltan datos obligatorios del estudiante.");
    }

    const numero = sheet.getLastRow(); // fila 1 = encabezado, así que la primera preinscripción queda con el No. 1
    const fila = COLUMNAS.map(([key]) => {
      if (key === "numero") return numero;
      if (key === "fechaEnvio") return new Date();
      if (key === "pad_sinInfo") return data.pad_sinInfo ? "Sí" : "No";
      return data[key] || "";
    });
    sheet.appendRow(fila);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, numero: numero }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err.message || err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, mensaje: "El backend de preinscripción está activo." }))
    .setMimeType(ContentService.MimeType.JSON);
}
