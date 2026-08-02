import { getCharacterById } from "../data/characters.js";

export const chatView = {
  render({ id }) {
    const character = getCharacterById(id);
    if (!character) {
      return `<h1>404</h1><p>Personaje no encontrado</p>`;
    }

    return `
      <section class="chat-app" style="--color-primary: ${character.color}; --color-primary-dark: ${character.colorDark}; --color-primary-soft: ${character.colorSoft}">
        <header class="chat-header">
          <div class="avatar avatar--header">${character.iniciales}</div>
          <div class="chat-header__info">
            <h1 class="chat-header__name">${character.nombre}</h1>
            <span class="chat-header__status">
              <span class="status-dot"></span>
              En línea
            </span>
          </div>
        </header>

        <main class="chat-messages" aria-live="polite" id="chat-messages">
          <div class="message message--character">
            <div class="message__avatar">${character.iniciales}</div>
            <div class="message__bubble">
              <p>Hola, soy ${character.nombre}. ¿En qué puedo ayudarte?</p>
            </div>
          </div>
        </main>

        <footer class="chat-input">
          <input
            class="chat-input__field"
            type="text"
            placeholder="Escribe un mensaje..."
            aria-label="Mensaje"
          >
          <button class="chat-input__send" type="button" aria-label="Enviar">➤</button>
        </footer>
      </section>
    `;
  },

  mount() {},
};
