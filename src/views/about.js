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
          <li><strong>Dr. Shaun Murphy</strong> — <strong>The Good Doctor:</strong>  cirujano autista sabio y honesto.</li>
          <li><strong>Joe Goldberg</strong> — <strong>You:</strong>  librero encantador con un lado muy oscuro.</li>
          <li><strong>Boyd Stevens</strong> — <strong>From:</strong>  sheriff pragmático y protector de su pueblo.</li>
        </ul>
        <p class="about__text">
          Tu historial de conversación se guarda en el navegador, así que al recargar
          la página puedes retomar tu charla donde la dejaste.
        </p>
      </section>
    `;
  },
};
