import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "tailwindcss/tailwind.css";
import { Pet } from "../Interfaces/pet.interface";

interface FormData {
  name: string;
  description: string;
  image?: string;
}

interface PetDialogProps {
  type: string;
  pet?: Pet;
  onClose: () => void;
  isOpen: boolean;
}

const CUDialog: React.FC<PetDialogProps> = ({ type, pet, onClose, isOpen }) => {
  const initialFormData: FormData = {
    name: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (pet) {
      setFormData({ ...initialFormData, ...pet });
    } else {
      setFormData(initialFormData);
    }
  }, [pet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    // Ensure that e.target is correctly typed as an HTMLInputElement when dealing with the 'file' type
    const inputElement = e.target as HTMLInputElement;
  
    // Get the new value
    const newValue = type === 'file' ? (inputElement.files ? inputElement.files[0] : null) : value;
  
    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  
    // Check for errors in the form fields
    if (type !== 'file' && (newValue === undefined || (typeof newValue === 'string' && newValue === ""))) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  const handleSubmit = async () => {
    const errors: { [key: string]: boolean } = {};

    for (const property in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, property)) {
        if (property !== "image" && !formData[property as keyof FormData]) {
          errors[property] = true;
        }
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      let imagePath = formData.image;

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const response = await axios.post(`/${type}/upload`, imageFormData);
        imagePath = response.data.imagePath;
      }

      const formDataToSend: FormData = {
        ...formData,
        image: imagePath,
      };
 console.log(formDataToSend);
      if (pet) {
        await axios.put(`/${type}/${pet._id}`, formDataToSend);
        onClose();
        toast.success(`Data successfully updated. Refresh the page!`);
      } else {
        await axios.post(`/${type}`, formDataToSend);
        onClose();
        toast.success(`Data successfully uploaded. Refresh the page!`);
      }
    } catch (error) {
      onClose();
      toast.error(`Error uploading data: ${error}`);
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
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

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      className="bg-transparent"
    >
      <DialogTitle className="text-black flex justify-between">
        <span>{pet ? `Edit ${pet.name}` : `Add New ${type}`}</span>
        <button
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="text-black"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4 m-3">
          {properties[type].map((property) => (
            <div key={property}>
              {property === "description" ? (
                <textarea
                  name={property}
                  placeholder={`Enter ${property}`}
                  value={formData[property] || ""}
                  onChange={handleChange}
                  className={`mb-2 p-2 border rounded outline-none ${
                    formErrors[property] ? "border-red-500" : ""
                  }`}
                />
              ) : property === "image" ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <input
                type="text"
                name={property}
                placeholder={`Enter ${property}`}
                value={formData[property as keyof FormData] || ""}
                onChange={handleChange}
                className={`mb-2 p-2 border rounded outline-none ${
                  formErrors[property] ? "border-red-500" : ""
                }`}
              />
              )}
              {formErrors[property] && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div>
            <button
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {pet ? "Update" : "Add"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CUDialog;
