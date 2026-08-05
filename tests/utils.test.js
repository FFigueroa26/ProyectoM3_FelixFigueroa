import { describe, it, expect } from "vitest";
import { escapeHtml } from "../src/utils.js";

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