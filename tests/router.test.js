import { describe, it, expect } from "vitest";
import { parsePath } from "../src/routerMatcher.js";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", view: "home" },
  { path: "/characters", view: "characters" },
  { path: "/chat/:id", view: "chat" },
  { path: "/about", view: "about" },
];

describe("parsePath", () => {
  it("coincide con una ruta estática exacta", () => {
    const found = parsePath("/home", routes);
    expect(found.route.view).toBe("home");
    expect(found.params).toEqual({});
  });

  it("coincide con una ruta dinámica y captura el parámetro", () => {
    const found = parsePath("/chat/shaun-murphy", routes);
    expect(found.route.view).toBe("chat");
    expect(found.params).toEqual({ id: "shaun-murphy" });
  });

  it("captura distintos valores del parámetro dinámico", () => {
    const first = parsePath("/chat/joe-goldberg", routes);
    const second = parsePath("/chat/boyd-stevens", routes);
    expect(first.params.id).toBe("joe-goldberg");
    expect(second.params.id).toBe("boyd-stevens");
  });

  it("coincide con la ruta raíz aunque no tenga segmentos", () => {
    const found = parsePath("/", routes);
    expect(found.route.redirect).toBe("/home");
    expect(found.params).toEqual({});
  });

  it("devuelve null cuando ninguna ruta coincide", () => {
    expect(parsePath("/no-existe", routes)).toBeNull();
  });

  it("devuelve null cuando la cantidad de segmentos no coincide", () => {
    expect(parsePath("/chat/shaun/mas", routes)).toBeNull();
    expect(parsePath("/home/extra", routes)).toBeNull();
  });

  it("ignora barras diagonales finales al hacer el parseo", () => {
    const found = parsePath("/home/", routes);
    expect(found.route.view).toBe("home");
  });

  it("devuelve la primera ruta que coincida cuando hay solapamiento", () => {
    const overlapping = [
      { path: "/chat/:id", view: "dinamica" },
      { path: "/chat/fijo", view: "estatica" },
    ];
    const found = parsePath("/chat/fijo", overlapping);
    expect(found.route.view).toBe("dinamica");
  });
});