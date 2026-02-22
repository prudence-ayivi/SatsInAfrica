import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import SatelliteLaunchesChart from './Chart/SatelliteLaunchesChart';
import CountryAgency from './Chart/CountryAgency';
import CountriesBySatelliteRangeChart from './Chart/CountriesBySatelliteRangeChart';
import ActiveVsInactiveSats from './Chart/ActiveVsInactiveSats';
import SatelliteTypeChart from './Chart/SatelliteTypeChart';
import OrbitDistribution from './Chart/OrbitDistribution';
import { CgArrowDownR } from "react-icons/cg";
import SatelliteList from './SatelliteList'
import countryData from '../utils/countries_complete.json';

Chart.register(CategoryScale);

const ChartSection = () => {
  const [data, setData] = useState([]);
  const [totalSats, setTotalSats] = useState(0);
  const [satelliteData, setSatelliteData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  useEffect(() => {
    setData(countryData);
    const satellites = countryData
    .filter((country) => country.satellites_list)
    .reduce((acc, country) => acc.concat(country.satellites_list.map((sat) => ({
            ...sat,
            country: country.country,
          }))
        ),
      []
    );
    setTotalSats(satellites.length);
    setSatelliteData(satellites);

  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div id="chart-section" className="font-sans xl:max-w-[80%] mx-auto flex flex-col">
      {/* Section des informations générales */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-title font-bold md:text-4xl mb-4">
            Satellites launched by African Countries
          </h1>
          <p className="text-lg px-2 md:text-xl text-gray-600">
            A quick overview of the african space activities 
          </p>
        </div>

        <div className="w-[97%] m-4">
          <p className="flex flex-row items-center justify-center gap-4 bg-zinc-100 p-4 text-lg font-bold cursor-pointer" onClick={toggleDropdown}> 
          See the full list and details of all {totalSats} african satellites 
          <CgArrowDownR size={20}/>
          </p>
          {isDropdownOpen && <SatelliteList satellites={satelliteData} />}
        </div>
      </div>

      {/* Section des chartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 m-4">
        <div className="bg-zinc-100 shadow-md p-2 rounded-md flex items-center justify-center ">
          <SatelliteLaunchesChart data={data} />
        </div>
        <div className="bg-zinc-100 shadow-md p-2 rounded-md flex items-center justify-center ">
          <CountryAgency data={data} />
        </div>
        <div className="bg-zinc-100 shadow-md p-2 rounded-md flex items-center justify-center">
          <CountriesBySatelliteRangeChart data={data} />
        </div>
        <div className="bg-zinc-100 shadow-md p-2 rounded-md flex items-center justify-center">
          <ActiveVsInactiveSats data={satelliteData} />
        </div>
        <div className="bg-zinc-100 shadow-md p-2 rounded-md flex items-center justify-center">
          <SatelliteTypeChart data={data} />
        </div>
        <div className="bg-zinc-100 shadow-md p-2 rounded-md flex items-center justify-center">
          <OrbitDistribution data={data} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
