import React, { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import Header from "./Header";


const LandingSection = ({ scrollToMapSection }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    scrollToMapSection();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('BackGround.png')", 
      }}
    >   
    <div className="absolute top-0 left-0 w-full z-20">
        <Header />
    </div> 

    <div className="absolute inset-0 bg-[#001219] opacity-[0.86]"></div>
    
    <div className="relative z-10 flex flex-col items-center">
      <h1 className="text-5xl font-title font-bold mb-4">Sats In Africa</h1>
      <p className="text-lg font-sans mb-8">Visualize African Space Industry</p>
      {/*<button 
      onClick={scrollToMapSection} 
      className="text-lg bg-[#D64045] px-10 py-2 rounded-full hover:bg-sky-400 transition-colors">
        EXPLORE
      </button>*/}
      <button
          onClick={handleClick}
          className={`text-lg px-10 py-2 rounded-full font-sans transition-colors ${
            isClicked ? 'bg-sky-500' : 'bg-[#D64045]'
          } hover:bg-sky-500`}
        >
          EXPLORE
        </button>
    </div>

      <SlArrowDown 
        className="absolute bottom-12 text-4xl animate-bounce cursor-pointer transition-all duration-200 ease-in-out"
        style={{ strokeWidth: "0.5" }} // Minceur de la flèche
        onMouseEnter={(e) => e.currentTarget.classList.remove('animate-bounce')}
        onMouseLeave={(e) => e.currentTarget.classList.add('animate-bounce')}
        onClick={scrollToMapSection}
      />
    </div>
  );
};

export default LandingSection;
