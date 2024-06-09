import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "tailwindcss/tailwind.css";
import { Pet } from "../Interfaces/pet.interface";
import { fetchImage, submitData } from "../utils/admin.utils";
import { properties } from "../utils/general.utils";

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
  setPets: any;
}

const FormDialog: React.FC<PetDialogProps> = ({
  type,
  pet,
  onClose,
  isOpen,
  setPets,
}) => {
  const initialFormData: FormData = {
    name: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (pet) {
      setFormData({ ...initialFormData, ...pet });
    } else {
      setFormData(initialFormData);
    }
  }, [pet]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const inputElement = e.target as HTMLInputElement;
      const file = inputElement.files ? inputElement.files[0] : null;
      setImageFile(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file ? file.name : "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    if (type !== "file" && (value === undefined || value === "")) {
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setImagePreview(null);
    setImageFile(null);
  };
  useEffect(() => {
    fetchImage(pet?.image, setImagePreview);
  }, [pet]);

  const handleSubmit = async () => {
    await submitData(
      formData,
      setFormErrors,
      imageFile,
      pet,
      type,
      onClose,
      setPets
    );
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
        <span>{pet ? `Edit: ${pet.name}` : `Add new ${type}`}</span>
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
              <label
                className="block mb-1 text-black font-semibold"
                htmlFor={property}
              >
                {property.charAt(0).toUpperCase() + property.slice(1)}:
              </label>
              {property === "description" ? (
                <textarea
                  id={property}
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
                    id={property}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 rounded"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </div>
              ) : (
                <input
                  id={property}
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

export default FormDialog;
