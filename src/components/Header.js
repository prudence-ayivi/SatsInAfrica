import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMenuAlt4, HiX } from "react-icons/hi"; // Icons for menu

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-row items-center w-full h-[70px] bg-white/20 px-4 py-2">
      {/* Logo */}
      <img
        src="satlogovec.png"
        className="h-[55px] w-[55px] mr-auto cursor-pointer"
        alt="logo"
      />

      {/* Menu Desktop */}
      <div className="hidden md:flex self-center">
        <ul className="flex flex-row text-white space-x-12">
        <li>
            <a
              href="#map-section"
              className="flex flex-row items-center font-sans cursor-pointer"
            >
              MAP
              <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
            </a>
          </li>
          <li>
            <a
              href="#chart-section"
              className="flex flex-row items-center font-sans cursor-pointer"
            >
              CHART
              <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
            </a>
          </li>
          <li>
            <a
              href="#orbit-section"
              className="flex flex-row items-center font-sans cursor-pointer"
            >
              ORBIT
              <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
            </a>
          </li>
        </ul>
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden flex items-center">
        {isMenuOpen ? (
          <HiX
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        ) : (
          <HiMenuAlt4
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white/20 text-white flex flex-col items-center space-y-4 p-4 z-50 md:hidden">
          <a
            href="#map-section"
            className="font-sans flex items-center cursor-pointer"
            onClick={toggleMenu}
          >
            MAP
            <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
          </a>
          <a
            href="#chart-section"
            className="font-sans flex items-center cursor-pointer"
            onClick={toggleMenu}
          >
            CHART
            <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
          </a>
          <a
            href="#orbit-section"
            className="font-sans flex items-center cursor-pointer"
            onClick={toggleMenu}
          >
            ORBIT
            <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
          </a>
          <a
            href="#about-section"
            className="font-sans flex items-center cursor-pointer"
            onClick={toggleMenu}
          >
            ABOUT
            <IoMdArrowDropdown className="text-sm mt-1 ml-2" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
