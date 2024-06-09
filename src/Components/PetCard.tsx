import React, { useState } from "react";
import { Pet } from "../Interfaces/pet.interface";
import PetDialog from "./PetDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface PetCardProps {
  image?:any
  pet: Pet;
  type: string;
}

const PetCard: React.FC<PetCardProps> = ({ pet, type, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className="pet-card rounded-lg shadow-md relative overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer"
      onClick={toggleModal}
    >
      <div className="pet-image">
        <img
          src={pet.image}
          alt={pet.name}
          className="rounded-t-lg rounded-b-none object-cover w-full h-45"
        />
      </div>
      <div className="pet-info absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-75">
        <h2 className="text-lg font-bold">{pet.name}</h2>
        {pet.origin && (
          <div className="flex items-center mt-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-gray-500"
            />
            <p className="ml-1 text-gray-500">{pet.origin}</p>
          </div>
        )}
      </div>

      {isModalOpen && <PetDialog pet={pet} onClose={toggleModal} type={type} />}
    </div>
  );
};

export default PetCard;
