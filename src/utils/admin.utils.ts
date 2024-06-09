import axios from "axios";
import { Pet } from "../Interfaces/pet.interface";
import { toast } from "react-toastify";

const fetchData = async (type: string, setPets: React.Dispatch<React.SetStateAction<Pet[]>>) => {
  try {
    const response = await axios.get(`/${type}`);
    const data = response.data;
    setPets(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


const fetchPetsByName = async (
  type: string,
  searchText: string,
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>,
  setImage: any
) => {
  if(searchText){
    try {
 
      const response = await axios.get(`/${type}/search/${searchText}`);
      const data = response.data;
      
      if (data.length === 0) {
        toast.info("No data found.");
        return;
      }
  
      setPets(data);
  
    
      data.forEach(async (pet: Pet) => {
        if (pet.image) {
          try {
            const imageResponse = await fetch(`/images/${pet.image}`);
            if (!imageResponse.ok) {
              throw new Error("Failed to fetch image");
            }
            const blob = await imageResponse.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage((prevImageMap: Map<string, string>) =>
                new Map(prevImageMap.set(pet._id, reader.result as string))
              );
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Error fetching pets.");
    }
  }else{
    toast.error("Enter an input first!");
  }

};

const deleteData = async (type: string, pet: Pet, onClose: () => void, setPets: React.Dispatch<React.SetStateAction<Pet[]>>) => {
  if (!pet._id) {
    toast.error("Pet ID is missing. Cannot delete.");
    return;
  }
  try {
    await axios.delete(`/${type}/${pet._id}`);
    onClose();
    toast.success(`${pet.name} has been deleted successfully.`);
    fetchData(type, setPets);
  } catch (error: any) {
    onClose();
    toast.error(`Error deleting ${pet.name}: ${error.message}`);
  }
};

const submitData = async (
  formData: any,
  setFormErrors: any,
  imageFile: File | null,
  pet: Pet | undefined,
  type: string,
  onClose: () => void,
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>
) => {
  const errors: { [key: string]: boolean } = {};

  for (const property in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, property)) {
      if (property !== "image" && (formData[property as keyof typeof formData] === null || formData[property as keyof typeof formData] === undefined)) {
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

    if (pet) {
      await axios.put(`/${type}/${pet._id}`, formDataToSend);
      onClose();
      toast.success(`Data successfully updated!`);
    } else {
      await axios.post(`/${type}`, formDataToSend);
      onClose();
      toast.success(`Data successfully uploaded!`);
    }
    fetchData(type, setPets);
  } catch (error) {
    onClose();
    toast.error(`Error uploading data: ${error}`);
    console.error("Error:", error);
  }
};

const fetchImage = (imagePath: string | undefined ,setImagePreview: any) => {
  if (imagePath) {
    fetch(`/images/${imagePath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setImagePreview(null);
      });
  } else {
    setImagePreview(null);
  }
};


export { fetchData, deleteData, submitData, fetchImage ,fetchPetsByName };
