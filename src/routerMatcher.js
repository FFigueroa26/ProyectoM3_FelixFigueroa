export function parsePath(pathname, routes) {
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