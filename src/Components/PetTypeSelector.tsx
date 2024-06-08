import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormDialog from "./FormDialog";

interface PetTypeSelectorProps {
  onSelect: (type: string) => void;
}

const PetTypeSelector: React.FC<PetTypeSelectorProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFormDialog, setShowFormDialog] = useState(false);

  const handleSelect = (type: string) => {
    onSelect(type);
    setSelectedType(type);
  };

  const handleAddNew = () => {
    if (selectedType) {
      setShowFormDialog(true);
    }
  };

  const handleCloseFormDialog = () => {
    setShowFormDialog(false);
  };

  return (
    <div className="flex justify-between items-center mb-4 pl-5">
      <div className="flex space-x-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            selectedType === "dogs" ? "bg-blue-500" : ""
          }`}
          onClick={() => handleSelect("dogs")}
        >
          Dogs
        </button>
        <button
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            selectedType === "cats" ? "bg-green-500" : ""
          }`}
          onClick={() => handleSelect("cats")}
        >
          Cats
        </button>
        <button
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            selectedType === "birds" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleSelect("birds")}
        >
          Birds
        </button>
      </div>
      {selectedType && (
        <>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
            onClick={handleAddNew}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add new {selectedType}
          </button>
          {showFormDialog && (
            <FormDialog
              isOpen={showFormDialog}
              onClose={handleCloseFormDialog}
              type={selectedType}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PetTypeSelector;
