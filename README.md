# 🗨️ ComicSansCon — Chatea con personajes que amas

Prueba de concepto de ComicSansCon: una SPA responsiva que permite conversar con
personajes ficticios de películas y series usando **inteligencia artificial (Google Gemini)**.

> **Aplicación desplegada:** https://proyecto-m3-felix-figueroa.vercel.app/home

---

## ⚙️ Requisitos previos

- **Node.js** 18+ (incluye npm)
- Una **API key de Google Gemini** ([console.cloud.google.com](https://console.cloud.google.com))

---

## 🚀 Ejecutar en local

Sigue estos pasos en orden:

### 1. Clonar el repositorio

```bash
git clone https://github.com/FFigueroa26/ProyectoM3_FelixFigueroa.git
cd ProyectoM3_FelixFigueroa
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto y agrega tu API key de Gemini:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

### 4. Iniciar el servidor

```bash
npm run vercel-dev
```

> ⚠️ **Importante:** Debes usar `npm run vercel-dev` (no `npm run dev`). Este proyecto tiene Serverless Functions en `/api/functions` que solo funcionan con Vercel CLI.

### 5. Abrir en el navegador

Una vez que veas el mensaje **"Ready! Available at http://localhost:3000"**, abre:

```
http://localhost:3000
```

---

### 🔧 Solución de problemas

**En Windows con PowerShell:**
Si PowerShell bloquea la ejecución, usa `cmd.exe` o este comando:
```bash
npx.cmd vercel dev --yes
```

**Primera ejecución con Vercel:**
Si te pide autenticación, inicia sesión:
```bash
vercel login
```

---

> **🔒 Seguridad:** la clave `GEMINI_API_KEY` se usa solo en el servidor y **nunca se expone** al navegador.

---

## 📁 Estructura del proyecto

```
├── api/
│   └── functions.js          # Serverless Function (proxy a Gemini)
├── public/images/            # Imágenes de los personajes
├── src/
│   ├── data/                 # Datos de los personajes
│   ├── server/               # Lógica de servidor (construcción del payload de Gemini)
│   ├── services/             # API, historial y prompts
│   ├── styles/               # CSS (variables, layout, componentes, galería)
│   ├── views/                # Vistas (home, characters, chat, about, notFound)
│   ├── theme.js              # Modo oscuro/claro
│   ├── router.js             # Router SPA (History API)
│   └── main.js
├── tests/                    # Pruebas unitarias (Vitest)
└── vercel.json               # Configuración de Vercel
```

---

## 🧑‍⚕️ Personajes elegidos

El proyecto cuenta con **tres personajes seleccionables** desde la galería, cada uno con su
propio prompt de contexto:

### Dr. Shaun Murphy — *The Good Doctor*

> Cirujano autista savant del Hospital St. Bonaventure. Piensa en datos, evidencia y
> anatomía. Honesto hasta la incomodidad, pero con un corazón clínico enorme.

### Joe Goldberg — *You*

> Librero encantador con un monólogo interno obsesivo. Parece el novio perfecto, pero sus
> pensamientos guardan un lado mucho más oscuro.

### Boyd Stevens — *From*

> Sheriff y líder de la ciudad de From. Pragmático, protector y de pocas palabras. Lleva
> sobre sus hombros el peso de mantener viva a su gente.

---

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML, CSS y **JavaScript vanilla** con **Vite** |
| Enrutado | SPA con **History API** |
| Backend | **Vercel Serverless Functions** (`/api/functions`) |
| IA | **Google Gemini** (`gemini-3.1-flash-lite`) |
| Persistencia | `localStorage` del navegador |
| Tests | **Vitest** (unit, con `fetch` mockeado) |
| Deploy | **Vercel** (GitHub + auto-deploy) |

---

## ✅ Funcionalidades

- **SPA con History API**: rutas `/home`, `/characters`, `/chat/:id` y `/about` sin recargar, con back/forward funcional.
- **Chat con IA**: cada personaje tiene un system/context prompt que define su personalidad.
- **Estilos visuales**: diferenciación clara entre mensaje del usuario y del personaje.
- **Estado "escribiendo..."** animado mientras la IA responde.
- **Manejo de errores** de la API.
- **Scroll automático** al último mensaje.
- **Persistencia con `localStorage`**: guarda el historial por personaje, lo retoma al recargar, botón "Borrar historial" e indicador de historial guardado.
- **Timestamps** en cada mensaje.
- **Botón para copiar** las respuestas de la IA.
- **Enviar con Enter** o con el botón.
- **Modo oscuro/claro** con toggle (persistido y sigue la preferencia del sistema).
- **Responsive mobile-first** (celulares, tablets y desktop).

---

## 🧪 Ejecutar los tests

Los tests unitarios usan **Vitest** y **mockean `fetch`** para que corran sin conexión ni consumo de API.

```bash
npm test
```

---

## ☁️ Desplegar en Vercel

1. Sube el repositorio a **GitHub**.
2. En [vercel.com](https://vercel.com), **Import Project** → importa el repositorio de GitHub.
3. El framework se detectará automáticamente (Vite). Asegúrate de que el **directorio raíz** sea `.` (se elige automática).
4. En **Environment Variables**, agrega:

   ```
   GEMINI_API_KEY=<tu_key_de_gemini>
   ```

5. Haz clic en **Deploy**.
6. Vercel crea una URL pública (`https://TU-PROYECTO.vercel.app`) y redespliega automáticamente en cada  push a `main`.

El archivo `vercel.json` define el reescribo para que la SPA maneje las rutas:
una Serverless Function (`/api/functions`) y el resto se redirija a `index.html`.

---

## 📸 Capturas de pantalla

### Home

![Home](public/images/screenshot-home.png)

### Galería de personajes

![Galería de personajes](public/images/screenshot-personajes.png)

### Chat con un personaje

![Chat](public/images/screenshot-chat.png)

### Modo oscuro

![Modo oscuro](public/images/screenshot-modo-oscuro.png)

---

## 🤖 Registro del uso de IA

Durante el desarrollo consulté a una IA (asistente de código) para estas tareas:

| # | Prompt que hice | Respuesta de la IA | Cómo lo integre |
|---|---|---|---|
| 1 | ¿Cómo hago para que el chat use IA? | Propuso una Serverless Function que actúa como proxy a la API de Gemini. | Creé `api/functions.js` que recibe el mensaje, lo envía a Gemini y devuelve la respuesta. |
| 2 | ¿Cómo muestro los mensajes del chat? | Sugirió renderizar cada mensaje como burbuja y el historial en `localStorage`. | Lo apliqué en `src/views/chat.js` y `src/services/messages.js`. |
| 3 | ¿Cómo hago que el campo de texto se enfoque solo? | Recomendó autofocus en escritorio y un cursor animado en móvil. | Agregué autofocus con `matchMedia` y un cursor decorativo en `layout.css`. |
| 4 | ¿Qué modelo de Gemini usar? | Señaló que `gemini-2.5-flash-lite` ya no está disponible y sugirió `gemini-3.1-flash-lite`. | Lo configuré en `src/server/chatPayload.js`. |
| 5 | ¿Cómo evito borrar el historial por accidente? | Sugirió pedir confirmación antes de borrar. | Agregué un `window.confirm` en el botón "Borrar" de `src/views/chat.js`. |

La clave de API solo se usa en el servidor y **nunca se expone** al navegador.