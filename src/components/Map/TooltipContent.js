import React from 'react';
import { IoMdCalendar } from "react-icons/io"; 
import { FaSatellite } from 'react-icons/fa';

const TooltipContent = ({ country }) => {
  if (!country) return null;

  // Country with no info
  if (country.satellites_list.length === 0 && (!country.space_projects || !country.space_projects.some((p) => p.status === 'In progress'))) {
    return (
      <div className="flex items-center justify-center w-[100px] h-[40px] p-[5px] font-sans">
        <div className="font-bold text-center text-md text-[#4E8FCC]">
          {country.country}
        </div>
      </div>
    );
  }

  // Country with first project in progress 
  if (country.satellites_list.length === 0 && country.space_projects?.some((p) => p.status === 'In progress')) {
    return (
      <div className="flex flex-col items-center w-[140px] h-[75px] p-[5px] font-sans">
        <div className="font-bold text-center text-md text-[#4E8FCC] p-[2px]">
          {country.country}
        </div>
        <div className="text-black">
          <p>Project In Progress</p>
        </div>
      </div>
    );
  }

  // Country with satellites 
  if (country.satellites_list.length > 0) {
    return (
      <div className="w-[140px] h-[75px] p-[5px] font-sans">
        <div className="font-bold text-center text-md text-[#4E8FCC] p-[2px]">
          {country.country}
        </div>
        <div className="flex items-center justify-around mt-2">
          <div className="flex items-center text-black space-x-1">
            <FaSatellite className="text-lg" />
            <span>{country.satellites_list.length}</span>
          </div>
          <div className="text-black">|</div>
          <div className="flex items-center text-black space-x-1">
            <IoMdCalendar className="text-lg" />
            <span>{country.first_launch_year}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TooltipContent;
