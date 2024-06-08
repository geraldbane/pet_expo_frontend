import axios from "axios";
import { useEffect, useState } from "react";
import { Dog } from "../Interfaces/dog.interface";
import SearchBar from "../Components/SearchBar";
import PetCard from "../Components/PetCard";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const DogsPage = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get("/pets/dogs");
        setDogs(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching dogs: ${error}`);
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-w-screen'>
      <div className="px-4 pt-5">
        <SearchBar value={searchQuery} onChange={setSearchQuery} type={"dogs"} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen mt-20">
          <ThreeDots
            color="#F59E0B"
            height={80}
            width={80}
            radius="50"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
      <div className="flex flex-wrap y">
        {filteredDogs.map((dog) => (
          <div key={dog.id} className="w-1/4 p-4">
            <PetCard pet={dog} type={"dog"} />
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default DogsPage;
