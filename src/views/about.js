export const aboutView = {
  render() {
    return `
      <section class="about">
        <h1 class="about__title">Sobre el proyecto</h1>
        <p class="about__text">
          Esta es una prueba de concepto de ComicSansCon, una agencia digital que crea
          experiencias interactivas para fans de videojuegos, películas y series.
          La idea: poder chatear con personajes ficticios usando inteligencia artificial.
        </p>
        <h2 class="about__subtitle">Los personajes</h2>
        <ul class="about__list">
          <li><strong>Dr. Shaun Murphy</strong> — The Good Doctor</li>
          <li><strong>Joe Goldberg</strong> — You</li>
          <li><strong>Boyd Stevens</strong> — From</li>
        </ul>
        <p class="about__text">
          El historial de conversación se mantiene solo durante tu sesión: al recargar
          la página, la conversación comienza de nuevo.
        </p>
      </section>
    `;
  },
};
