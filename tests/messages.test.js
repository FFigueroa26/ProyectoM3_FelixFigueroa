import { describe, it, expect } from "vitest";
import { getMessages, addMessage } from "../src/services/messages.js";

describe("messages store", () => {
  it("agrega y obtiene mensajes por personaje", () => {
    addMessage("shaun-murphy", "user", "hola");
    const messages = getMessages("shaun-murphy");
    expect(messages).toHaveLength(1);
    expect(messages[0].role).toBe("user");
    expect(messages[0].content).toBe("hola");
  });

  it("mantiene historiales separados por personaje", () => {
    addMessage("joe-goldberg", "user", "mensaje para Joe");
    expect(getMessages("joe-goldberg")).toHaveLength(1);
    expect(getMessages("shaun-murphy")).toHaveLength(1);
  });
});