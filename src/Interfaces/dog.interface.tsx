import { Pet } from "./pet.interface";

export interface Dog extends Pet {
    breed_group: string;
    size: string;
    lifespan: string;
    temperament: string;
    colors: string[];
  }