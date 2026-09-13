# Preinscripción — Fundación Mis Habilidades

Formulario **público** (lo llenan las familias desde su celular o computador, sin
necesidad de cuenta ni instalación) que guarda cada preinscripción como una fila
nueva en una Google Sheet, en tiempo real.

Es la versión corta del formulario de matrícula (repo `AgentePersonalIA`, carpeta
`apps/matricula`): mismos datos del estudiante, pero de la madre y el padre solo
se pide **nombre y celular** (sin cédula, dirección ni email). No incluye firmas
ni "documentos entregados" — eso se hace después, en la matrícula presencial.

> Este repositorio es público solo para poder usar GitHub Pages gratis. El
> proyecto completo del Agente Personal IA (privado) vive en otro repositorio;
> este aquí contiene únicamente el formulario de preinscripción, que de todas
> formas es una página pública pensada para que la llenen las familias.

## Qué archivos hay aquí

- **`index.html`** — el formulario que ven las familias. Se sube a un sitio público
  (GitHub Pages).
- **`Codigo.gs`** — el "backend": un script de Google que recibe cada envío y lo
  guarda en una hoja de cálculo.

## Paso 1 — Crear la hoja de cálculo y el backend

1. Entra a [sheets.google.com](https://sheets.google.com) con la cuenta de Google
   de la Fundación y crea una hoja nueva. Ponle de nombre, por ejemplo,
   **"Preinscripciones 2027"**.
2. Menú **Extensiones → Apps Script**.
3. Borra el código de ejemplo que aparece y pega **todo** el contenido de
   [`Codigo.gs`](Codigo.gs).
4. Guarda el proyecto (ícono de disquete, o Ctrl+S). Ponle nombre, por ejemplo
   "Backend preinscripción".
5. Arriba a la derecha, botón **Implementar → Nueva implementación**.
6. En "Selecciona el tipo", el ícono de engranaje → **Aplicación web**.
7. Configura:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
8. Clic en **Implementar**. Google va a pedirte autorizar el script (es tuyo, es
   normal que salga la advertencia de "app no verificada"): clic en **Avanzado**
   → **Ir a "Backend preinscripción" (no seguro)** → **Permitir**.
9. Copia la **URL de la aplicación web** que aparece (termina en `/exec`). La
   necesitas en el siguiente paso.

> Cada vez que edites `Codigo.gs` más adelante, tienes que volver a
> **Implementar → Gestionar implementaciones → ✏️ Editar → Nueva versión → Implementar**
> para que el cambio quede activo. La URL no cambia.

## Paso 2 — Conectar el formulario con el backend

1. Abre `index.html` con un editor de texto (Bloc de notas sirve).
2. Busca la línea:
   ```js
   const APPS_SCRIPT_URL = "PEGA_AQUI_LA_URL_DE_TU_APPS_SCRIPT";
   ```
3. Reemplaza el texto entre comillas por la URL que copiaste en el paso 1.9.
4. Guarda el archivo.

## Paso 3 — Publicar el formulario en un link público

Este repositorio ya está en GitHub, así que la forma más rápida y gratis es
**GitHub Pages**:

1. En GitHub, entra al repositorio → **Settings → Pages**.
2. En "Build and deployment" → **Source: Deploy from a branch**.
3. Elige la rama `main` y la carpeta **/ (root)**.
4. Guarda. GitHub tarda 1–2 minutos en publicar.
5. El link para compartir con las familias queda así:
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`

Comparte ese link por WhatsApp, redes sociales o el sitio web de la Fundación.

## Cómo revisar las preinscripciones

Abre la Google Sheet del paso 1: cada envío aparece como una fila nueva en la
pestaña **"Preinscripciones"**, con número consecutivo y fecha automáticos.
Desde ahí puedes pasar los datos a la app de matrícula cuando la familia sea
aceptada.

## Notas

- Si una familia pierde la conexión a mitad de llenar el formulario, sus
  respuestas quedan guardadas en ese navegador (borrador local) y las
  encuentra igual si vuelve a abrir el link, sin tener que escribir todo de
  nuevo.
- El campo **"Año lectivo al que aspira"** viene marcado por defecto con el año
  siguiente al actual; la familia puede cambiarlo si aplica para el año en
  curso.
- Para cambiar los grados de la lista desplegable, edita el arreglo
  `GRADOS_ASPIRA` al inicio del `<script>` de `index.html`.
