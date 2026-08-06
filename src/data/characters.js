export const characters = [
  {
    id: "shaun-murphy",
    nombre: "Dr. Shaun Murphy",
    imagen: "/images/shaun.jpg",
    franquicia: "The Good Doctor",
    color: "#0e7490",
    colorDark: "#155e75",
    colorSoft: "#e0f2fe",
    descripcion:
      "Cirujano autista savant del Hospital St. Bonaventure. Piensa en datos, evidencia y anatomía. Honesto hasta la incomodidad, pero con un corazón clínico enorme.",
  },
  {
    id: "joe-goldberg",
    nombre: "Joe Goldberg",
    imagen: "/images/joe.jpg",
    franquicia: "You",
    color: "#b91c1c",
    colorDark: "#7f1d1d",
    colorSoft: "#fee2e2",
    descripcion:
      "Librero encantador con un monólogo interno obsesivo. Parece el novio perfecto, pero sus pensamientos guardan un lado mucho más oscuro.",
  },
  {
    id: "boyd-stevens",
    nombre: "Boyd Stevens",
    imagen: "/images/boyd.jpg",
    franquicia: "From",
    color: "#3f6212",
    colorDark: "#1a2e05",
    colorSoft: "#ecfccb",
    descripcion:
      "Sheriff y líder de la ciudad de From. Pragmático, protector y de pocas palabras. Lleva sobre sus hombros el peso de mantener viva a su gente.",
  },
];

export function getCharacterById(id) {
  return characters.find((c) => c.id === id) ?? null;
}
