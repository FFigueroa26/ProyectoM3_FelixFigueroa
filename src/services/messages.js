const chats = {};

export function getMessages(characterId) {
  if (!chats[characterId]) {
    chats[characterId] = [];
  }
  return chats[characterId];
}

export function addMessage(characterId, role, content) {
  const message = { role, content };
  getMessages(characterId).push(message);
  return message;
}
