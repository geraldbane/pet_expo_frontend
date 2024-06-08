import React from "react";
import { Link } from "react-router-dom";

interface ImageCardProps {
  to: string;
  imageUrl: string;
  altText: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ to, imageUrl, altText }) => {
  return (
    <Link to={to} className="card-link relative block mx-10 my-4">
      <div className="relative">
        <img src={imageUrl} alt={altText} className="rounded-lg w-80 h-60 cursor-pointer" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gray-100 bg-opacity-40 rounded-lg ">
          <p className="text-petOrange text-center text-xl font-bold">{`Discover our ${altText}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;

