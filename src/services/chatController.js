import { getMessages, addMessage, clearMessages, hasHistory } from "./messages.js";
import { sendChat } from "./api.js";
import { lastMessages } from "../utils.js";
import { messageTemplate, typingTemplate } from "./chatTemplates.js";

const MAX_HISTORY = 12;

export function createChatController({ id, character, prompt }) {
  const messagesEl = document.querySelector("#chat-messages");
  const inputEl = document.querySelector(".chat-input__field");
  const caretEl = document.querySelector(".chat-input__caret");
  const sendBtn = document.querySelector(".chat-input__send");
  const clearBtn = document.querySelector(".chat-header__clear");
  const canAutofocus = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function updateCaret() {
    const isEmpty = inputEl.value.trim() === "";
    const isFocused = document.activeElement === inputEl;
    caretEl.hidden = isFocused || !isEmpty;
  }

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
    messagesEl.innerHTML = getMessages(id)
      .map((message) => messageTemplate({ message, character }))
      .join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setTyping(visible) {
    const typing = messagesEl.querySelector(".typing");
    if (visible && !typing) {
      messagesEl.insertAdjacentHTML("beforeend", typingTemplate(character));
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
    const sure = window.confirm("¿Seguro que quieres borrar todo el historial de esta conversación?");
    if (!sure) return;
    clearMessages(id);
    addMessage(id, "character", prompt.saludo);
    renderMessages();
    updateHistoryBadge();
  }

  async function requestReply() {
    inputEl.disabled = true;
    sendBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;
    setTyping(true);

    try {
      const messages = lastMessages(getMessages(id), MAX_HISTORY).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
      const text = await sendChat({ systemPrompt: prompt.texto, messages });
      addMessage(id, "character", text);
    } catch (error) {
      const message =
        error?.status === 429
          ? "Se alcanzó el límite de peticiones. Espera un momento y vuelve a intentarlo."
          : "Lo siento, hubo un problema. Inténtalo de nuevo.";
      addMessage(id, "character", message);
    } finally {
      setTyping(false);
      inputEl.disabled = false;
      sendBtn.disabled = false;
      if (clearBtn) clearBtn.disabled = false;
      if (canAutofocus) inputEl.focus();
      renderMessages();
      updateHistoryBadge();
    }
  }

  function setupCopyHandler() {
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
  }

  function init() {
    if (getMessages(id).length === 0) {
      addMessage(id, "character", prompt.saludo);
    }

    sendBtn.addEventListener("click", handleSend);
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") handleSend();
    });
    inputEl.addEventListener("focus", updateCaret);
    inputEl.addEventListener("blur", updateCaret);
    inputEl.addEventListener("input", updateCaret);
    if (clearBtn) clearBtn.addEventListener("click", handleClear);
    setupCopyHandler();

    if (canAutofocus) inputEl.focus();
    renderMessages();
    updateCaret();
  }

  return { init };
}