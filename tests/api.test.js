import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendChat } from "../src/services/api.js";

describe("sendChat", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("envía systemPrompt y messages y devuelve el texto", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ text: "respuesta del personaje" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const text = await sendChat({
      systemPrompt: "Eres un personaje",
      messages: [{ role: "user", content: "hola" }],
    });

    expect(text).toBe("respuesta del personaje");

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/functions");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body);
    expect(body.systemPrompt).toBe("Eres un personaje");
    expect(body.messages).toEqual([{ role: "user", content: "hola" }]);

    vi.unstubAllGlobals();
  });

  it("lanza un error si la respuesta no es OK", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    await expect(
      sendChat({ systemPrompt: "p", messages: [] })
    ).rejects.toThrow();

    vi.unstubAllGlobals();
  });

  it("lanza un error si fetch falla", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("red caída")));

    await expect(
      sendChat({ systemPrompt: "p", messages: [] })
    ).rejects.toThrow("red caída");

    vi.unstubAllGlobals();
  });
});