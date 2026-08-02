import { characters } from "../data/characters.js";

export const charactersView = {
  render() {
    const cards = characters
      .map(
        (c) => `
        <a class="character-card" href="/chat/${c.id}" data-link style="--card-color: ${c.color}">
          <div class="character-card__avatar">${c.iniciales}</div>
          <div class="character-card__body">
            <p class="character-card__name">${c.nombre}</p>
            <p class="character-card__franchise">${c.franquicia}</p>
            <p class="character-card__desc">${c.descripcion}</p>
          </div>
          <span class="character-card__cta">→</span>
        </a>
      `
      )
      .join("");

    return `
      <section class="gallery">
        <div class="gallery__header">
          <h1 class="gallery__title">Elige tu personaje</h1>
          <p class="gallery__subtitle">¿Con quién quieres chatear hoy?</p>
        </div>
        ${cards}
      </section>
    `;
  },
};
