import React from "react";
import { NavItems } from "../type/NavItems";
import { ModeToggle } from "./mode-toggle";
const navItems: NavItems[] = [
  { id: 1, label: "Home" },
  { id: 2, label: "Products" },
  { id: 3, label: "About" },
];
const Navbar = () => {
  const navList = navItems.map((item, index) => (
    <li key={index}>
      <a className="text-blue-400 text-lg font-semibold hover:underline hover:text-blue-300 cursor-pointer">
        {item.label}
      </a>
    </li>
  ));
  return (
    <header className="w-full h-20 flex justify-center border-b-2  shadow-lg items-center">
      <nav className="w-[80%] flex items-center justify-between ">
        <div className="text-2xl font-bold ">
          <p>KE-commerce</p>
        </div>
        <ul className="style-none flex gap-10">{navList}</ul>
        <ModeToggle />
      </nav>
    </header>
  );
};
export default Navbar;
