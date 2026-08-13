import fs from "node:fs";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getMessages, addMessage, clearMessages, hasHistory } from "../src/services/messages.js";

const componentsCss = fs.readFileSync(new URL("../src/styles/components.css", import.meta.url), "utf8");

function createStorageMock() {
  const store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
}

describe("messages store", () => {
  let storage;

  beforeEach(() => {
    storage = createStorageMock();
    globalThis.localStorage = storage;
  });

  afterEach(() => {
    delete globalThis.localStorage;
  });

  it("alinea las burbujas del usuario y del personaje de forma consistente", () => {
    expect(componentsCss).toContain(".message--user");
    expect(componentsCss).toContain("justify-content: flex-end");
    expect(componentsCss).toContain(".message--character");
    expect(componentsCss).toContain("justify-content: flex-start");
  });

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
    expect(getMessages("shaun-murphy")).toHaveLength(0);
  });

  it("agrega un timestamp numérico a cada mensaje", () => {
    addMessage("shaun-murphy", "user", "hola");
    const messages = getMessages("shaun-murphy");
    expect(messages[0]).toHaveProperty("timestamp");
    expect(typeof messages[0].timestamp).toBe("number");
  });

  it("persiste en localStorage", () => {
    addMessage("boyd-stevens", "user", "hola boyd");
    const raw = storage.getItem("chat-historial-boyd-stevens");
    expect(raw).toContain("hola boyd");
  });

  it("clearMessages elimina el historial", () => {
    addMessage("shaun-murphy", "user", "adios");
    expect(hasHistory("shaun-murphy")).toBe(true);
    clearMessages("shaun-murphy");
    expect(hasHistory("shaun-murphy")).toBe(false);
    expect(getMessages("shaun-murphy")).toHaveLength(0);
  });
});