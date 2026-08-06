const STORAGE_PREFIX = "chat-historial-";

function key(characterId) {
  return `${STORAGE_PREFIX}${characterId}`;
}

export function getMessages(characterId) {
  try {
    const raw = localStorage.getItem(key(characterId));
    const messages = raw ? JSON.parse(raw) : [];
    if (Array.isArray(messages)) return messages;
    return [];
  } catch {
    return [];
  }
}

function persist(characterId, messages) {
  localStorage.setItem(key(characterId), JSON.stringify(messages));
}

export function addMessage(characterId, role, content) {
  const messages = getMessages(characterId);
  const message = { role, content };
  messages.push(message);
  persist(characterId, messages);
  return message;
}

export function clearMessages(characterId) {
  localStorage.removeItem(key(characterId));
}

export function hasHistory(characterId) {
  return getMessages(characterId).length > 0;
}