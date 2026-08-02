export const homeView = {
  render() {
    return `
      <section class="home">
        <p class="home__badge">ComicSansCon</p>
        <h1 class="home__title">Chatea con personajes que amas</h1>
        <p class="home__subtitle">
          Elige un personaje y conversa con él gracias a la inteligencia artificial.
          Una prueba de concepto de ComicSansCon.
        </p>
        <a class="btn" href="/characters" data-link>Elegir personaje</a>
      </section>
    `;
  },
};
