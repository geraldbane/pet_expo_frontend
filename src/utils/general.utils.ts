const typeColors: { [key: string]: string } = {
    dogs: "bg-blue-500",
    cats: "bg-green-500",
    birds: "bg-yellow-500",
  };
  const properties: { [key: string]: string[] } = {
    dogs: [
      "name",
      "breed_group",
      "size",
      "lifespan",
      "origin",
      "temperament",
      "colors",
      "description",
      "image",
    ],
    cats: ["name", "origin", "temperament", "colors", "description", "image"],
    birds: [
      "name",
      "species",
      "family",
      "habitat",
      "place_of_found",
      "diet",
      "description",
      "weight_kg",
      "height_cm",
      "image",
    ],
  };
  export {typeColors, properties}