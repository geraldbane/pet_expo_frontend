import React, { useState } from "react";
import PetTypeSelector from "../Components/PetTypeSelector";
import PetTable from "../Components/PetTable";
import { Pet } from "../Interfaces/pet.interface";

const AdminPage = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [pets, setPets] = useState<Pet[]>([]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="h-screen pt-10 px-2">
      {!selectedType && (
        <div className="mb-5 ml-5 text-petOrange font-semibold text-xl">
          Select a type to continue:
        </div>
      )}

      <PetTypeSelector onSelect={handleTypeSelect} setPets={setPets} />
      {selectedType && (
        <PetTable type={selectedType} setPets={setPets} pets={pets} />
      )}
    </div>
  );
};

export default AdminPage;
