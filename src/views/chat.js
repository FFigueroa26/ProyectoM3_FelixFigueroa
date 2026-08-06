import { getCharacterById } from "../data/characters.js";
import { getMessages, addMessage, clearMessages, hasHistory } from "../services/messages.js";
import { getPrompt } from "../services/prompts.js";
import { sendChat } from "../services/api.js";
import { escapeHtml } from "../utils.js";

function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const chatView = {
  render({ id }) {
    const character = getCharacterById(id);
    if (!character) {
      return `<h1>404</h1><p>Personaje no encontrado</p>`;
    }

    const saved = hasHistory(id);

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

  mount({ id }) {
    const character = getCharacterById(id);
    const prompt = getPrompt(id);
    if (!character || !prompt) return;

    if (getMessages(id).length === 0) {
      addMessage(id, "character", prompt.saludo);
    }

    const messagesEl = document.querySelector("#chat-messages");
    const inputEl = document.querySelector(".chat-input__field");
    const sendBtn = document.querySelector(".chat-input__send");
    const clearBtn = document.querySelector(".chat-header__clear");

    function updateHistoryBadge() {
      const badge = document.querySelector(".history-badge");
      if (hasHistory(id) && !badge) {
        document
          .querySelector(".chat-header__actions")
          .insertAdjacentHTML("afterbegin", `<span class="history-badge">Historial guardado</span>`);
      } else if (!hasHistory(id) && badge) {
        badge.remove();
      }
    }

    function renderMessages() {
      const messages = getMessages(id);
      messagesEl.innerHTML = messages
        .map((msg) => {
          const content = escapeHtml(msg.content);
          const time = `<span class="message__time">${formatTime(msg.timestamp)}</span>`;
          if (msg.role === "user") {
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
        })
        .join("");
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setTyping(visible) {
      const typing = messagesEl.querySelector(".typing");
      if (visible && !typing) {
        messagesEl.insertAdjacentHTML(
          "beforeend",
          `
          <div class="message message--character typing">
            <div class="message__avatar"><img class="avatar__img" src="${character.imagen}" alt="Retrato de ${character.nombre}"></div>
            <div class="message__bubble typing__bubble">
              <span class="typing__dot"></span>
              <span class="typing__dot"></span>
              <span class="typing__dot"></span>
            </div>
          </div>
        `
        );
      } else if (!visible && typing) {
        typing.remove();
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleSend() {
      const text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = "";
      addMessage(id, "user", text);
      renderMessages();
      updateHistoryBadge();
      requestReply();
    }

    function handleClear() {
      clearMessages(id);
      addMessage(id, "character", prompt.saludo);
      renderMessages();
      updateHistoryBadge();
    }

    async function requestReply() {
      inputEl.disabled = true;
      sendBtn.disabled = true;
      setTyping(true);

      try {
        const messages = getMessages(id).map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));
        const text = await sendChat({ systemPrompt: prompt.texto, messages });
        addMessage(id, "character", text);
      } catch (error) {
        addMessage(id, "character", "Lo siento, hubo un problema. Inténtalo de nuevo.");
      } finally {
        setTyping(false);
        inputEl.disabled = false;
        sendBtn.disabled = false;
        inputEl.focus();
        renderMessages();
        updateHistoryBadge();
      }
    }

    sendBtn.addEventListener("click", handleSend);
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") handleSend();
    });
    if (clearBtn) clearBtn.addEventListener("click", handleClear);

    messagesEl.addEventListener("click", async (event) => {
      const copyBtn = event.target.closest("[data-copy]");
      if (!copyBtn) return;
      const bubble = copyBtn.closest(".message__bubble");
      const p = bubble ? bubble.querySelector("p") : null;
      const text = p ? p.textContent : "";
      try {
        await navigator.clipboard.writeText(text);
        const original = copyBtn.textContent;
        copyBtn.textContent = "¡Copiado!";
        copyBtn.dataset.copied = "true";
        setTimeout(() => {
          copyBtn.textContent = original;
          delete copyBtn.dataset.copied;
        }, 1500);
      } catch {
        copyBtn.textContent = "Error";
      }
    });

    renderMessages();
  },
};
