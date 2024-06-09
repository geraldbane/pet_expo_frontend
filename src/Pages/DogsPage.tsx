import { useEffect, useState } from "react";
import { Dog } from "../Interfaces/dog.interface";
import SearchBar from "../Components/SearchBar";
import PetCard from "../Components/PetCard";

import { ThreeDots } from "react-loader-spinner";
import { fetchPets, filterPets } from "../utils/externalApi.utils";

const DogsPage = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPets(setDogs, setLoading, "dogs");
  }, []);

  const filteredDogs = filterPets(dogs, searchQuery);
  return (
    <div className="min-w-screen">
      <div className="px-4 pt-5">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          type={"dogs"}
        />
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
