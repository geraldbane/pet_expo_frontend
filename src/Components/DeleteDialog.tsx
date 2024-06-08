import React from "react";
import { Pet } from "../Interfaces/pet.interface";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteData } from "../utils/handleApi";

interface DeleteDialogProps {
  type: string;
  pet: Pet;
  onClose: () => void;

  setPets: any;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  type,
  pet,
  onClose,

  setPets,
}) => {
  const submitDeletion = async () => {
    console.log(pet._id);
    await deleteData(type, pet, onClose, setPets);
  };

  return (
    <Dialog open={true} onClose={onClose} classes={{ paper: "bg-transparent" }}>
      <DialogTitle className="flex justify-between ">
        <span>Delete: {pet.name}</span>
        <button onClick={onClose} className="text-black ">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </DialogTitle>
      <DialogContent>
        <div className="mb-1">
          <h2>Are you sure you want to delete these data?</h2>
          <h4 className="text-red-500 font-semibold">
            This action is irreversible!
          </h4>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          autoFocus
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          onClick={submitDeletion}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
