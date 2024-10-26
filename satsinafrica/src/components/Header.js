import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io";


const Header = () => {
  return (
    <div className="flex flex-row items-center w-full h-[70px] bg-black px-4 py-2 space-x-80">
    <img src="LOGO.png" className="h-[50px] w-[50px] mr-auto cursor-pointer" alt="logo"/>
    <div className="self-center">
      <ul className="flex flex-row text-white space-x-12 mr-auto">
        <li className="flex flex-row items-center font-sans cursor-pointer">
          ABOUT 
          <IoMdArrowDropdown className="text-sm mt-1 ml-2"/>
        </li>
        <li className="flex flex-row items-center font-sans cursor-pointer">
          DATABASE 
          <IoMdArrowDropdown className="text-sm mt-1 ml-2"/>
        </li>
        <li className="flex flex-row items-center font-sans cursor-pointer">
          TABLES 
          <IoMdArrowDropdown className="text-sm mt-1 ml-2"/>
        </li>
        <li className="flex flex-row items-center font-sans cursor-pointer mr-2">
          CONTACT 
          <IoMdArrowDropdown className="text-sm mt-1 ml-2"/>
        </li>        
      </ul>
    </div>
    </div>
  )
}

export default Header