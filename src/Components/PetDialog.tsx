import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Bird } from "../Interfaces/bird.interface";
import { Cat } from "../Interfaces/cat.interface";
import { Dog } from "../Interfaces/dog.interface";
import { Pet } from "../Interfaces/pet.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface PetDialogProps {
  type: string;
  pet: Pet;
  onClose: () => void;
}

const PetDialog: React.FC<PetDialogProps> = ({ type, pet, onClose }) => {
  console.log("petDialog");
  console.log(type);
  const renderPetDetails = () => {
    switch (type) {
      case "dog":
      case "dogs":
        const dog = pet as Dog;

        return (
          <>
            <p>
              <b>Origin:</b> {dog.origin}
            </p>
            <p>
              <b>Breed Group:</b> {dog.breed_group}
            </p>
            <p>
              <b>Size:</b> {dog.size}
            </p>
            <p>
              <b>Lifespan:</b> {dog.lifespan}
            </p>
            <p>
              <b>Temperament:</b> {dog.temperament}
            </p>
            <p>
              <b>Colors:</b> {dog.colors.join(", ")}
            </p>
          </>
        );
      case "cat":
      case "cats":
        const cat = pet as Cat;
        return (
          <>
            <p>
              <b>Origin:</b> {cat.origin}
            </p>
            <p>
              <b>Temperament:</b> {cat.temperament}
            </p>
            <p>
              <b>Colors:</b> {cat.colors.join(", ")}
            </p>
          </>
        );
      case "bird":
      case "birds":
        const bird = pet as Bird;
        return (
          <>
            <p>
              <b>Species:</b> {bird.species}
            </p>
            <p>
              <b>Family:</b> {bird.family}
            </p>
            <p>
              <b>Habitat:</b> {bird.habitat}
            </p>
            <p>
              <b>Found in:</b> {bird.place_of_found}
            </p>
            <p>
              <b>Diet:</b> {bird.diet}
            </p>
            <p>
              <b>Weight:</b> {bird.weight_kg} kg
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="bg-transparent">
      <DialogTitle className=" text-black flex justify-between">
        <span>{pet.name}</span>
        <button onClick={onClose} className="text-black">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </DialogTitle>
      <DialogContent>
        <div className="flex items-center pb-2">
          <img
            src={pet.image}
            alt={pet.name}
            className="h-40 rounded-lg mr-4"
          />
          <p className="text-base mb-4">
            <b>Description:</b> {pet.description}
          </p>
        </div>

        {renderPetDetails()}
      </DialogContent>
    </Dialog>
  );
};

export default PetDialog;
