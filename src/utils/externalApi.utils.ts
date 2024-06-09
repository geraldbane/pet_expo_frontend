import axios from "axios";
import { toast } from "react-toastify";
import { Pet } from "../Interfaces/pet.interface";


const fetchPets = async (setPets: any ,setLoading: any,type: string) => {
    try {
      const response = await axios.get(`/pets/${type}`);
      setPets(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(`Error fetching ${type}: ${error}`);
      setLoading(false);
    }
  };

const filterPets = (pets: Pet[], searchQuery: string): Pet[] => {
    return pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  export{fetchPets, filterPets}