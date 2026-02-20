import React, {useState, useEffect } from 'react';
import { SlArrowDown } from "react-icons/sl";
import Header from "./Header";
import CountUp from 'react-countup';
import countryData from '../utils/countries_complete.json';


const LandingSection = () => {
  const [countriesWithSats, setCountriesWithSats] = useState(0);
  const [totalSats, setTotalSats] = useState(0);

  useEffect(() => {
    const countries = countryData.filter((country) => country.satellites > 0).length;
    setCountriesWithSats(countries);

    const satellites = countryData
    .filter((country) => country.satellites > 0) 
    .reduce((total, country) => total + country.satellites, 0);
    setTotalSats(satellites);

  }, []);

  return (
    <div
      className="font-sans relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('BackGround.png')", 
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#14191b]/80"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-title font-bold mb-4">Sats In Africa</h1>
        <p className="text-lg mx-3 md:mx-0 mb-8">The most accurate african satellites data app</p>

        {/* Explore Button */}
        <a
          href="#map-section"
          className="text-lg px-10 py-2 rounded-full bg-[#D64045] hover:bg-sky-500 transition-colors"
        >
          EXPLORE
        </a>

        <div className="flex flex-wrap justify-center mx-2 mt-6 gap-3 md:gap-8">
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-extrabold text-blue-600">
              <CountUp start={0} end={countriesWithSats} duration={4} />
            </span>
            <p className="text-md font-medium">African Countries</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-extrabold text-blue-600">
              <CountUp start={0} end={totalSats} duration={7} />
            </span>
            <p className="text-md font-medium">Satellites lunched in Orbit</p>
          </div>
        </div>

      </div>

      {/* Scroll Down Icon */}
       <SlArrowDown 
          className="absolute bottom-12 text-4xl animate-bounce transition-all duration-200 ease-in-out"
        />
    </div>
  );
};

export default LandingSection;
