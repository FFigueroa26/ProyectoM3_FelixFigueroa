import { characters } from "../data/characters.js";

export const charactersView = {
  render() {
    const cards = characters
      .map(
        (c) => `
        <a class="character-card" href="/chat/${c.id}" data-link style="--card-color: ${c.color}">
          <div class="character-card__media">
            <img class="character-card__img" src="${c.imagen}" alt="Retrato de ${c.nombre}">
          </div>
          <div class="character-card__body">
            <h2 class="character-card__name">${c.nombre}</h2>
            <span class="character-card__franchise">${c.franquicia}</span>
            <p class="character-card__desc">${c.descripcion}</p>
            <span class="character-card__cta">Chatear →</span>
          </div>
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
