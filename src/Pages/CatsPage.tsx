import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cat } from "../Interfaces/cat.interface";
import PetCard from "../Components/PetCard";
import SearchBar from "../Components/SearchBar";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const CatsPage = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get("/pets/cats");
        setCats(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching cats: ${error}`);
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const filteredCats = cats.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
