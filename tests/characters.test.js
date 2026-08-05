import { describe, it, expect } from "vitest";
import { characters, getCharacterById } from "../src/data/characters.js";

describe("characters", () => {
  it("expone al menos 3 personajes", () => {
    expect(characters.length).toBeGreaterThanOrEqual(3);
  });

  it("devuelve un personaje por su id", () => {
    const shaun = getCharacterById("shaun-murphy");
    expect(shaun.nombre).toBe("Dr. Shaun Murphy");
  });

  it("devuelve null si el id no existe", () => {
    expect(getCharacterById("no-existe")).toBeNull();
  });
});