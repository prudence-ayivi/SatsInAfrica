import React from 'react';
import { SlArrowDown } from "react-icons/sl";
import Header from "./Header";

const LandingSection = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('BackGround.png')", 
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#001219] opacity-[0.86]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-title font-bold mb-4">Sats In Africa</h1>
        <p className="text-lg font-sans mb-8">Visualize African Space Industry</p>

        {/* Explore Button */}
        <a
          href="#map-section"
          className="text-lg px-10 py-2 rounded-full font-sans bg-[#D64045] hover:bg-sky-500 transition-colors"
        >
          EXPLORE
        </a>
        <p className="text-[10px] py-6">The data used on this site have been sourced from <br/>Space in Africa, 
        SpaceHubs Africa and In The Sky</p>

      </div>

      {/* Scroll Down Icon */}
      <a
        href="#map-section"
        className="absolute bottom-12 text-4xl animate-bounce cursor-pointer transition-all duration-200 ease-in-out"
        style={{ strokeWidth: "0.5" }}
      >
        <SlArrowDown />
      </a>
    </div>
  );
};

export default LandingSection;
