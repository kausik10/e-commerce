
import { NavItems } from "../type/NavItems";
import { ModeToggle } from "./mode-toggle";
import CartLabel from "./CartLabel";
import SignInInfo from "./SignInInfo";
import { Link } from "react-router-dom";
import { useState } from "react";
import {Input} from "@/component/ui/input";
import { MenuIcon, PanelLeftCloseIcon, SearchIcon} from "lucide-react";

const navItems: NavItems[] = [
  { id: 1, label: "Home" },
  { id: 2, label: "Today's Deal" },
  { id: 3, label: "Gift Cards" },
  { id: 4, label: "Sell" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navList = navItems.map((item, index) => (
    <Link
      to={`${item.label}`}
      key={index}
      className="hover:text-blue-400 text-lg font-semibold hover:underline text-secondary-background cursor-pointer"
    >
      {item.label}
    </Link>
  ));

  return (
    <header className="w-full p-2 flex flex-grow justify-center border-b-2 shadow-lg items-center">
      <nav className="flex flex-col md:flex-row items-center justify-between w-[90%] md:gap-8">
        <div className="flex flex-row w-full md:w-[60%] justify-between items-center gap-4">
          <section className="flex flex-row items-center justify-center gap-4">
            <MenuIcon
              size={24}
              className="h-8 w-8 lg:hidden hover:cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <Link
              to="/"
              className="text-2xl font-bold flex flex-row items-center gap-2 md:gap-4"
            >
              <img
                width={36}
                height={36}
                src="/images/kecommerce.webp"
                alt="logo"
                className="h-auto max-w-16 rounded-full"
              />
              <p className="md:hidden text-md">Commerce</p>
            </Link>
          </section>

          {/* Search bar for larger screens */}
          <section className="hidden md:flex justify-center items-center w-full">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search For Products"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </section>

          {/* Icons for smaller screens */}
          <ul className="md:hidden flex flex-row items-center gap-2">
            <CartLabel />
            <SignInInfo />
          </ul>
        </div>

        {/* Sidebar for mobile view */}
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`fixed h-full w-screen z-30 lg:hidden backdrop-blur-sm top-0 right-0 transition-transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <section className="flex flex-col bg-secondary w-48 absolute left-0 top-0 h-screen p-8 gap-4 z-50">
            <PanelLeftCloseIcon
              size={24}
              className="hover:cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <ul className="flex flex-col gap-4">{navList}</ul>
            
            <section className="flex flex-row justify-between items-center gap-4 w-full">
              <p className="text-lg font-semibold">Theme</p>
              <ModeToggle />
            </section>

          </section>
        </div>

        {/* Top row items for larger screens */}
        <ul className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <CartLabel />
          <SignInInfo />
        </ul>

        {/* Search bar for smaller screens */}
        <section className="block md:hidden flex justify-center items-center w-full mt-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search For Products"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </section>
      </nav>
    </header>
  );
};
export default Navbar;
