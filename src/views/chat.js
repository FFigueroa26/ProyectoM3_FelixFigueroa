import { getCharacterById } from "../data/characters.js";
import { getPrompt } from "../services/prompts.js";
import { hasHistory } from "../services/messages.js";
import { createChatController } from "../services/chatController.js";
import { chatPageTemplate } from "../services/chatTemplates.js";

export const chatView = {
  render({ id }) {
    const character = getCharacterById(id);
    if (!character) {
      return `<h1>404</h1><p>Personaje no encontrado</p>`;
    }

    return chatPageTemplate({ character, saved: hasHistory(id) });
  },

  mount({ id }) {
    const character = getCharacterById(id);
    const prompt = getPrompt(id);
    if (!character || !prompt) return;

    createChatController({ id, character, prompt }).init();
  },
};