import { Link } from "react-router-dom";
import { DropdownMenu, Menu, MenuItem, MenuProvider } from "./DropdownMenu";


const Navbar = () => {
  return (
    <MenuProvider>
      <nav className="bg-navbarColor p-4 flex justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <img src={'./favicon.ico'} alt="Favicon" className="mr-2 h-10" />
          <div className="text-petOrange font-roboto font-bold text-xl">petEXPO</div>
        </Link>
        <div className="flex items-center z-10">
          <Menu>
            <DropdownMenu label="Menu" >
              <MenuItem to={"dogs"}>Dogs</MenuItem>
              <MenuItem to={"cats"}>Cats</MenuItem>
              <MenuItem to={"birds"}>Birds</MenuItem>
              <MenuItem to={"admin"}>Admin</MenuItem>
            </DropdownMenu>
          </Menu>
          <ul className="flex space-x-4 text-white ml-4">
            <li>
              <a href="#about" className=" hover:hover:bg-petOrange hover:text-gray-100 hover:font-semibold transition-colors duration-300 px-4 py-2 rounded-lg border border-transparent">About Us</a>
            </li>
            <li>
              <a href="#contact" className=" hover:bg-petOrange hover:text-gray-100 hover:font-semibold transition-colors duration-300 px-4 py-2 rounded-lg border border-transparent">Contact Us</a>
            </li>
          </ul>
        </div>
      </nav>
    </MenuProvider>
  );
};

export default Navbar;
