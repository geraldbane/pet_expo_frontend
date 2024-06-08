import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ type, value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  const handleClearClick = () => {
    onChange("");
  };

  return (
    <div className="flex justify-between items-center px-8 pb-5">
      <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600 font-semibold text-center ">Meet our {type}!</p>
      <div className="flex items-center border border-gray-300 rounded-md bg-slate-100">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-500 text-lg ml-2 mr-1"
        />
        <input
          type="text"
          placeholder={`Search ${type} by name`}
          value={value}
          onChange={handleInputChange}
          className="border-none focus:outline-none text-m px-3 py-2 bg-slate-100"
        />
        {value && (
          <button
            className="focus:outline-none"
            onClick={handleClearClick}
            aria-label="Clear"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-500 text-lg mr-2 bg-inherit"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
