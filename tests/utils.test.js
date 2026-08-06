import { describe, it, expect } from "vitest";
import { escapeHtml, lastMessages } from "../src/utils.js";

describe("escapeHtml", () => {
  it("escapa caracteres HTML peligrosos", () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  it("deja el texto plano sin cambios", () => {
    expect(escapeHtml("hola mundo")).toBe("hola mundo");
  });

  it("escapa el ampersand", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });
});

describe("lastMessages — límite MaxHistory", () => {
  const messages = Array.from({ length: 15 }, (_, i) => ({ id: i }));

  it("devuelve solo los últimos N mensajes cuando hay más", () => {
    const result = lastMessages(messages, 12);
    expect(result).toHaveLength(12);
    expect(result[0].id).toBe(3);
  });

  it("no recorta si hay menos del límite", () => {
    const few = [{ id: 1 }, { id: 2 }];
    expect(lastMessages(few, 12)).toHaveLength(2);
  });

  it("devuelve array vacío si la entrada no es un array", () => {
    expect(lastMessages("no-array", 12)).toEqual([]);
  });
});