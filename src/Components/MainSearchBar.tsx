import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const MainSearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const togglePlaceholder = () => {
    setPlaceholderVisible(!placeholderVisible);
  };

  return (
    <div className="relative my-10 h-12">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={togglePlaceholder}
        onBlur={togglePlaceholder}
        placeholder={placeholderVisible ? "Search..." : ""}
        className="block w-64 pl-14 py-3 pr-10 text-base text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-full"
      />
      <button
        className="absolute right-0 top-0 bottom-0 flex items-center px-4 text-base text-gray-100 border-l border-gray-300 rounded focus:outline-none bg-petOrange h-full"
        onClick={onSearch}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default MainSearchBar;
