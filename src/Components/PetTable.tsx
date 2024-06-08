import React, { useEffect, useState } from "react";
import { Pet } from "../Interfaces/pet.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "./DeleteDialog";

import FormDialog from "./FormDialog";
import { fetchData } from "../utils/handleApi";

interface PetTableProps {
  type: string;
  setPets: any;
  pets: Pet[];
}

const typeColors: { [key: string]: string } = {
  dogs: "bg-blue-500",
  cats: "bg-green-500",
  birds: "bg-yellow-500",
};

const PetTable: React.FC<PetTableProps> = ({ type, setPets, pets }) => {
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);

  const handleEditClick = (petId: string) => {
    setEditingPetId(petId);
  };

  const handleDeleteClick = (petId: string) => {
    setDeletingPetId(petId);
  };

  const handleCloseFormDialog = () => {
    setEditingPetId(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeletingPetId(null);
  };

  useEffect(() => {
    fetchData(type, setPets);
  }, [type]);

  return (
    <div className="px-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={typeColors[type]}>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Origin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Update/Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-globalBackground divide-y divide-gray-200">
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td className="px-4 py-4 whitespace-nowrap text-white">
                {pet._id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-white">
                {pet.name}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-white">
                {pet.origin ? pet.origin : "-"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap border-bottom  border-gray-200">
                {editingPetId === pet._id && (
                  <FormDialog
                    isOpen={true}
                    onClose={handleCloseFormDialog}
                    type={type}
                    pet={pet}
                    setPets={setPets}
                  />
                )}
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2 px-2"
                  onClick={() => handleEditClick(pet._id.toString())}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {deletingPetId === pet._id && (
                  <DeleteDialog
                    type={type}
                    pet={pet}
                    onClose={handleCloseDeleteDialog}
                    setPets={setPets}
                  />
                )}
                <button className="text-red-500 hover:text-red-700">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteClick(pet._id.toString())}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;
