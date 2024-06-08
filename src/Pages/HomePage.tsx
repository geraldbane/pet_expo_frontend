import React, { useState } from "react";
import petImage from "../Images/pets.jpg";
import bird from "../Images/bird_img.png";
import cat from "../Images/cat_img.jpg";
import dog from "../Images/dog_image.jpg";
import Dropdown from "../Components/Dropdown";
import ImageCard from "../Components/ImageCard";
import MainSearchBar from "../Components/MainSearchBar";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>("Cats");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    alert(`Search: ${searchTerm}`);
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
            options={["Cats", "Dogs", "Birds"]}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
          <MainSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
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
