import { homeView } from "./views/home.js";
import { charactersView } from "./views/characters.js";
import { chatView } from "./views/chat.js";
import { aboutView } from "./views/about.js";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", view: homeView },
  { path: "/characters", view: charactersView },
  { path: "/chat/:id", view: chatView },
  { path: "/about", view: aboutView },
];

const app = document.querySelector("#app");

function parsePath(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  for (const route of routes) {
    const routeParts = route.path.split("/").filter(Boolean);
    if (routeParts.length !== parts.length) continue;
    const params = {};
    let match = true;
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        params[routeParts[i].slice(1)] = parts[i];
      } else if (routeParts[i] !== parts[i]) {
        match = false;
        break;
      }
    }
    if (match) return { route, params };
  }
  return null;
}

export function navigate(path) {
  history.pushState({}, "", path);
  render();
}

function render() {
  const { pathname } = window.location;
  const found = parsePath(pathname);

  if (!found) {
    app.innerHTML = "<h1>404</h1><p>Página no encontrada</p>";
    return;
  }

  const { route, params } = found;
  if (route.redirect) {
    navigate(route.redirect);
    return;
  }

  app.innerHTML = route.view.render(params);
  if (route.view.mount) route.view.mount(params);
  window.scrollTo(0, 0);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");
  if (!link) return;
  event.preventDefault();
  navigate(link.getAttribute("href"));
});

window.addEventListener("popstate", render);

export function initRouter() {
  render();
}
