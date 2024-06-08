import { Pet } from "./pet.interface";

export interface Bird extends Pet {
    species: string;
    family: string;
    habitat: string;
    place_of_found: string;
    diet: string;
    weight_kg: number;
  }