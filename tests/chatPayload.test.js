import { describe, it, expect } from "vitest";
import { buildChatPayload, GEMINI_MODEL, GEMINI_URL } from "../src/server/chatPayload.js";

describe("buildChatPayload", () => {
  it("mapea los mensajes de usuario como role user", () => {
    const payload = buildChatPayload({
      systemPrompt: "Eres un personaje",
      messages: [{ role: "user", content: "hola" }],
    });

    expect(payload.contents).toEqual([
      { role: "user", parts: [{ text: "hola" }] },
    ]);
  });

  it("mapea cualquier rol que no sea user como model", () => {
    const payload = buildChatPayload({
      systemPrompt: "p",
      messages: [
        { role: "character", content: "respuesta" },
        { role: "model", content: "otra" },
      ],
    });

    expect(payload.contents[0].role).toBe("model");
    expect(payload.contents[1].role).toBe("model");
  });

  it("incluye el system prompt y la config de generación", () => {
    const payload = buildChatPayload({
      systemPrompt: "Eres Shaun",
      messages: [{ role: "user", content: "hola" }],
    });

    expect(payload.systemInstruction.parts[0].text).toBe("Eres Shaun");
    expect(payload.generationConfig).toEqual({ temperature: 0.9 });
  });

  it("expone la URL del modelo usado", () => {
    expect(GEMINI_URL).toBe(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`
    );
    expect(GEMINI_MODEL).toBe("gemini-3.5-flash");
  });
});