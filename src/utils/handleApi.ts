import axios from "axios";
import { Pet } from "../Interfaces/pet.interface";
import { toast } from "react-toastify";

const fetchData = async (type: string, setPets: any) => {
  try {
    const response = await axios.get(`/${type}`);
    const data = response.data;
    setPets(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const deleteData = async (type : string, onClose : () => void, setPets: any,pet:Pet) => {
    try {
      await axios.delete(`/${type}/${pet._id}`);
      onClose();
      toast.success(
        `${pet.name} has been deleted successfully.`
      );
      fetchData(type,setPets);
    } catch (error: any) {
      onClose();
      toast.error(`Error deleting ${pet.name}: ${error.message}`);
    }
  };


  const submitData = async (formData: any, setFormErrors: any,imageFile: File | null, pet:Pet | undefined, type: string,onClose : () => void,setPets:any) => {
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

      if (pet) {
        await axios.put(`/${type}/${pet._id}`, formDataToSend);
        onClose();
        toast.success(`Data successfully updated!`);
      } else {
        await axios.post(`/${type}`, formDataToSend);
        onClose();
        toast.success(`Data successfully uploaded!`);
      }
      fetchData(type,setPets);
    } catch (error) {
      onClose();
      toast.error(`Error uploading data: ${error}`);
      console.error("Error:", error);
    }
  };





export { fetchData, deleteData,submitData };
