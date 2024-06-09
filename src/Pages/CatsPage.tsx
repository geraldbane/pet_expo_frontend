import { useEffect, useState } from "react";
import { Cat } from "../Interfaces/cat.interface";
import PetCard from "../Components/PetCard";
import SearchBar from "../Components/SearchBar";
import { ThreeDots } from "react-loader-spinner";
import { fetchPets, filterPets } from "../utils/externalApi.utils";

const CatsPage = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPets(setCats, setLoading, "cats");
  }, []);

  const filteredCats = filterPets(cats, searchQuery);

  return (
    <div className="min-w-screen">
      <div className="px-4 pt-5">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          type={"cats"}
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
          {filteredCats.map((cat) => (
            <div key={cat.id} className="w-1/4 p-4">
              <PetCard pet={cat} type={"cat"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatsPage;
