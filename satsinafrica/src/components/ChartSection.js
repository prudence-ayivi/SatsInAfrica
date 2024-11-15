import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import CountUp from 'react-countup';
import SatelliteLaunchesChart from './Chart/SatelliteLaunchesChart';
import LaunchDateVsAgencyCreationChart from './Chart/LaunchDateVsAgencyCreationChart';
import CountriesBySatelliteRangeChart from './Chart/CountriesBySatelliteRangeChart';
import countryData from '../utils/countries_complete.json';

Chart.register(CategoryScale);

const ChartSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(countryData);
  }, []);

  return (
    <div className="font-sans xl:max-w-[70%] mx-auto flex flex-col">
      {/* Section des informations générales */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-title font-bold md:text-4xl mb-4">
            Satellites lunched by African Countries 
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            A quick overview of space exploration activities in Africa
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-6 gap-8">
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-extrabold text-blue-600">
              <CountUp start={0} end={17} duration={2} />
            </span>
            <p className="text-lg font-medium">African Countries</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-extrabold text-blue-600">
              <CountUp start={0} end={58} duration={3} />
            </span>
            <p className="text-lg font-medium">Satellites in Orbit</p>
          </div>
        </div>
      </div>

      {/* Section des chartes */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-2 gap-4 lg:gap-4 p-4">
        <div className="bg-zinc-100 shadow-md p-2 rounded-md h-full flex items-center justify-center max-h-[400px]">
          <SatelliteLaunchesChart data={data} />
        </div>
        <div className="bg-zinc-100 shadow-md p-2 rounded-md h-full flex items-center justify-center max-h-[400px]">
          <LaunchDateVsAgencyCreationChart data={data} />
        </div>
        <div className="bg-zinc-100 shadow-lg p-2 mb-2 rounded-md h-full flex items-center justify-center max-h-[400px]">
          <CountriesBySatelliteRangeChart data={data} />
        </div>
        {/*<div className="bg-zinc-100 shadow-lg p-2 mb-2 rounded-md h-full flex items-center justify-center max-h-[400px]">
         * Section vide pour l'instant *
        </div>*/}
      </div>
    </div>
  );
};

export default ChartSection;
