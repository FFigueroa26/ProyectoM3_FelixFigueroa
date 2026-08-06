import { beforeEach, describe, expect, it, vi } from "vitest";
import { initTheme } from "../src/theme.js";

const store = new Map();

const fakeClickHandler = () => {};
const fakeDocument = {
  documentElement: { dataset: {} },
  querySelector: vi.fn(() => null),
  addEventListener: vi.fn((event, handler) => {
    if (event === "click") fakeClickHandler();
  }),
};

const fakeWindow = {
  matchMedia: vi.fn(() => ({ matches: false })),
};

describe("theme", () => {
  beforeEach(() => {
    store.clear();
    fakeDocument.documentElement.dataset = {};
    fakeWindow.matchMedia.mockReturnValue({ matches: false });
    vi.resetModules();
    globalThis.document = fakeDocument;
    globalThis.window = fakeWindow;
    globalThis.localStorage = {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, v),
    };
  });

  it("aplica el tema guardado preferido", () => {
    store.set("comicsanscon-theme", "dark");
    initTheme();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("usa light por defecto cuando no hay tema ni preferencia del sistema", () => {
    initTheme();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("respeta la preferencia del sistema si no hay tema guardado", () => {
    fakeWindow.matchMedia.mockReturnValue({ matches: true });
    initTheme();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("persiste el tema elegido", () => {
    initTheme();
    expect(store.get("comicsanscon-theme")).toBe("light");
    store.set("comicsanscon-theme", "dark");
  });
});