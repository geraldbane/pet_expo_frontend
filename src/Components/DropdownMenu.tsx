import React, { createContext, useContext, useState, ReactNode } from "react";
import { Link } from "react-router-dom";

const MenuContext = createContext({});

export const useMenu = () => useContext(MenuContext);

const Menu = ({ children }: { children: ReactNode }) => {
  return <ul className="flex space text-white relative">{children}</ul>;
};

const MenuItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to}>
      <li>{children}</li>
    </Link>
  );
};

const DropdownMenu = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li
      className="relative"
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
    >
      <div className="hover:bg-petOrange hover:text-gray-100 hover:font-semibold transition-colors duration-300 px-4 py-2 rounded-lg border border-transparent">
        {label}
      </div>
      {isOpen && (
        <div className="absolute bg-gray-700 p-2 rounded-md shadow-md">
          {children}
        </div>
      )}
    </li>
  );
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  return <MenuContext.Provider value={{}}>{children}</MenuContext.Provider>;
};

export { Menu, MenuItem, DropdownMenu };
