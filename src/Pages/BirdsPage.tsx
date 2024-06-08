import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Bird } from "../Interfaces/bird.interface";
import PetCard from "../Components/PetCard";
import SearchBar from "../Components/SearchBar";
import { toast } from "react-toastify";

const BirdsPage = () => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await axios.get("/pets/birds");
        setBirds(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching birds: ${error}`);
        setLoading(false);
      }
    };

    fetchBirds();
  }, []);

  const filteredBirds = birds.filter((bird) =>
    bird.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-w-screen">
      <div className="px-4 pt-5">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          type={"birds"}
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
        <div className="flex flex-wrap">
          {filteredBirds.map((bird) => (
            <div className="w-1/4 p-4" key={bird.id}>
              <PetCard pet={bird} type={"bird"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BirdsPage;
