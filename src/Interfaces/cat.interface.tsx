import { Pet } from "./pet.interface";

export interface Cat extends Pet {
    temperament: string;
    colors: string[];
  }