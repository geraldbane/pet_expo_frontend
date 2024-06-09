import React, { useState } from "react";
import petImage from "../Images/pets.jpg";
import bird from "../Images/bird_img.png";
import cat from "../Images/cat_img.jpg";
import dog from "../Images/dog_image.jpg";
import Dropdown from "../Components/Dropdown";
import ImageCard from "../Components/ImageCard";
import MainSearchBar from "../Components/MainSearchBar";
import { fetchPetsByName } from "../utils/admin.utils";
import { Pet } from "../Interfaces/pet.interface";
import PetCard from "../Components/PetCard";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [selectedOption, setSelectedOption] = useState<string>("cats");
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [image, setImage] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const handleSearch = () => {
    try {
      fetchPetsByName(selectedOption, searchTerm, setPets, setImage);
    } catch (error) {
      console.error("Error searching pets:", error);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <main>
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${petImage})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

        <div className="text-petOrange text-center pt-20 z-10">
          <h1 className="text-5xl font-bold">Find your new best friend!</h1>
          <h3 className="text-lg mb-8">
            Browse pets from our vast catalogue and give them a new family!
          </h3>
        </div>
   
        <div className="flex justify-center">
          <Dropdown
            options={["cats", "dogs", "birds"]}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
          <MainSearchBar
            value={searchTerm}
            onChange={handleSearchInputChange}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        {pets.map((pet) => (
          <div className="w-1/4 p-4" key={pet.id}>
            <PetCard pet={pet} type={selectedOption} />
          </div>
        ))}
      </div>

      <h1 className="text-petOrange text-left text-2xl font-semibold mt-10 mx-20">
        Discover our pets
      </h1>
      <div className="flex flex-wrap justify-center items-center mt-4">
        <ImageCard to="/birds" imageUrl={bird} altText="birds" />
        <ImageCard to="/cats" imageUrl={cat} altText="cats" />
        <ImageCard to="/dogs" imageUrl={dog} altText="dogs" />
      </div>
    </main>
  );
};

export default HomePage;
