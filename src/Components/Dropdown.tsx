import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative my-10 mx-1 h-12"> 
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 text-lg text-gray-800 bg-gray-100 rounded-lg focus:outline-none mz-10 h-full"
      >
        {selectedOption}
        <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute left-0 bg-white rounded-md shadow-lg mt-1 z-20 w-70" ref={dropdownRef}>
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className="block w-full px-4 py-2 text-base text-gray-800 hover:bg-petOrange hover:text-white"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
