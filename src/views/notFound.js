export const notFoundView = {
  render() {
    return `
      <section class="notfound">
        <h1 class="notfound__title">404</h1>
        <p class="notfound__text">Página no encontrada</p>
        <a class="notfound__link" href="/home" data-link>Volver al inicio</a>
      </section>
    `;
  },
};
