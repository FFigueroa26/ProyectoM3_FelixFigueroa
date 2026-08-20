import { escapeHtml } from "../utils.js";

export function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function messageTemplate({ message, character }) {
  const content = escapeHtml(message.content);
  const time = `<span class="message__time">${formatTime(message.timestamp)}</span>`;

  if (message.role === "user") {
    return `
      <div class="message message--user">
        <div class="message__bubble"><p>${content}</p>${time}</div>
      </div>
    `;
  }

  return `
    <div class="message message--character">
      <div class="message__avatar"><img class="avatar__img" src="${character.imagen}" alt="Retrato de ${character.nombre}"></div>
      <div class="message__bubble"><p>${content}</p>
        <div class="message__footer">
          <button class="message__copy" type="button" data-copy aria-label="Copiar respuesta">Copiar</button>
          ${time}
        </div>
      </div>
    </div>
  `;
}

export function typingTemplate(character) {
  return `
    <div class="message message--character typing">
      <div class="message__avatar"><img class="avatar__img" src="${character.imagen}" alt="Retrato de ${character.nombre}"></div>
      <div class="message__bubble typing__bubble">
        <span class="typing__dot"></span>
        <span class="typing__dot"></span>
        <span class="typing__dot"></span>
      </div>
    </div>
  `;
}

export function chatPageTemplate({ character, saved }) {
  return `
    <section class="chat-app" style="--color-primary: ${character.color}; --color-primary-dark: ${character.colorDark}; --color-primary-soft: ${character.colorSoft}; --color-on-primary: #ffffff">
      <header class="chat-header">
        <div class="avatar avatar--header"><img class="avatar__img" src="${character.imagen}" alt="Retrato de ${character.nombre}"></div>
        <div class="chat-header__info">
          <h1 class="chat-header__name">${character.nombre}</h1>
          <span class="chat-header__status">
            <span class="status-dot"></span>
            En línea
          </span>
        </div>
        <div class="chat-header__actions">
          ${saved ? '<span class="history-badge">Historial guardado</span>' : ""}
          <button class="chat-header__clear" type="button" aria-label="Borrar historial">Borrar</button>
        </div>
      </header>

      <main class="chat-messages" aria-live="polite" id="chat-messages"></main>

      <footer class="chat-input">
        <div class="chat-input__wrap">
          <input
            class="chat-input__field"
            type="text"
            placeholder="Escribe un mensaje..."
            aria-label="Mensaje"
          >
          <span class="chat-input__caret" hidden></span>
        </div>
        <button class="chat-input__send" type="button" aria-label="Enviar">➤</button>
      </footer>
    </section>
  `;
}