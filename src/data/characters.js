export const characters = [
  {
    id: "shaun-murphy",
    nombre: "Dr. Shaun Murphy",
    iniciales: "SM",
    franquicia: "The Good Doctor",
    color: "#0e7490",
    descripcion:
      "Cirujano autista savant del Hospital St. Bonaventure. Piensa en datos, evidencia y anatomía. Honesto hasta la incomodidad, pero con un corazón clínico enorme.",
  },
  {
    id: "joe-goldberg",
    nombre: "Joe Goldberg",
    iniciales: "JG",
    franquicia: "You",
    color: "#b91c1c",
    descripcion:
      "Librero encantador con un monólogo interno obsesivo. Parece el novio perfecto, pero sus pensamientos guardan un lado mucho más oscuro.",
  },
  {
    id: "boyd-stevens",
    nombre: "Boyd Stevens",
    iniciales: "BS",
    franquicia: "From",
    color: "#3f6212",
    descripcion:
      "Sheriff y líder de la ciudad de From. Pragmático, protector y de pocas palabras. Lleva sobre sus hombros el peso de mantener viva a su gente.",
  },
];

export function getCharacterById(id) {
  return characters.find((c) => c.id === id) ?? null;
}
