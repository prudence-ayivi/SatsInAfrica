import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import countriesData from "../utils/countries_complete.json";

const FilterDropdown = ({
  onCountryFilterChange,
  onYearFilterChange,
  onSatelliteFilterChange,
}) => {
  const [isCountryOpen, setCountryOpen] = useState(false);
  const [isYearOpen, setYearOpen] = useState(false);
  const [isSatellitesOpen, setSatellitesOpen] = useState(false);

  const [countrySelections, setCountrySelections] = useState([]);
  const [yearSelections, setYearSelections] = useState([]);
  const [satelliteSelections, setSatelliteSelections] = useState([]);

  const toggleCountry = () => setCountryOpen(!isCountryOpen);
  const toggleYear = () => setYearOpen(!isYearOpen);
  const toggleSatellites = () => setSatellitesOpen(!isSatellitesOpen);

  const handleCountrySelection = (country) => {
    const updatedSelections = countrySelections.includes(country)
      ? countrySelections.filter((c) => c !== country)
      : [...countrySelections, country];
    setCountrySelections(updatedSelections);
    onCountryFilterChange(updatedSelections);
  };

  const handleYearSelection = (year) => {
    const updatedSelections = yearSelections.includes(year)
      ? yearSelections.filter((y) => y !== year)
      : [...yearSelections, year];
    setYearSelections(updatedSelections);
    onYearFilterChange(updatedSelections);
  };

  const handleSatelliteSelection = (range) => {
    const updatedSelections = satelliteSelections.some(selected => selected[0] === range[0] && selected[1] === range[1])
      ? satelliteSelections.filter(selected => selected[0] !== range[0] || selected[1] !== range[1])
      : [...satelliteSelections, range];
    setSatelliteSelections(updatedSelections);
    onSatelliteFilterChange(updatedSelections);
  };
  

  const countryList = countriesData.map((country) => country.country).sort();
  const launchYears = [
    ...new Set(
      countriesData
        .filter((country) => country.first_launch_year)
        .map((country) => country.first_launch_year)
    ),
  ].sort((a, b) => a - b);

  return (
    <div className="flex flex-row space-x-2">
      {/* Country Filter */}
      <div className="dropdown">
        <button
          onClick={toggleCountry}
          className="flex justify-between items-center font-sans w-full px-[3px] py-[4px] bg-gray-200 rounded"
        >
          Country
          <IoIosArrowDown className="text-xl cursor-pointer ml-1" />
        </button>
        {isCountryOpen && (
          <div className="mt-2 p-2 text-left bg-white border rounded shadow max-h-40 overflow-y-auto">
            {countryList.map((country, index) => (
              <label key={index} className="block font-sans">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={() => handleCountrySelection(country)}
                  checked={countrySelections.includes(country)}
                />{" "}
                {country}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* First Year of Launch Filter */}
      <div className="dropdown">
        <button
          onClick={toggleYear}
          className="flex justify-between items-center font-sans w-full px-[3px] py-[4px] bg-gray-200 rounded"
        >
          First year launch
          <IoIosArrowDown className="text-xl cursor-pointer ml-1" />
        </button>
        {isYearOpen && (
          <div className="mt-2 p-2 text-left text-left bg-white border rounded shadow max-h-40 overflow-y-auto">
            {launchYears.map((year, index) => (
              <label key={index} className="block font-sans">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={() => handleYearSelection(year)}
                  checked={yearSelections.includes(year)}
                />{" "}
                {year}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Number of Satellites Filter */}
      <div className="dropdown">
        <button onClick={toggleSatellites} className="flex justify-between items-center font-sans w-full px-[3px] py-[4px] bg-gray-200 rounded">
          No. of satellites
          <IoIosArrowDown className="text-xl cursor-pointer ml-1" />
        </button>
        {isSatellitesOpen && (
          <div className="mt-2 p-2 text-left bg-white border rounded shadow max-h-40 overflow-y-auto">
            <label className="flex items-center font-sans">
              <input
                type="checkbox"
                className="mr-1"
                onChange={() => handleSatelliteSelection([1, Infinity])} // "At least 1" option with range for any number > 0
                checked={satelliteSelections.some(
                  (selected) => selected[0] === 1 && selected[1] === Infinity
                )}
              />
              At least 1
            </label>
            <label className="flex items-center font-sans">
              <input
                type="checkbox"
                className="mr-1"
                onChange={() => handleSatelliteSelection([1, 1])} // Option for countries with exactly 1 satellite
                checked={satelliteSelections.some(
                  (selected) => selected[0] === 1 && selected[1] === 1
                )}
              />
              1
            </label>
            {[
              [2, 3],
              [4, 5],
              [6, 8],
              [8, 10],
              [10, 20],
            ].map((range) => (
              <label key={range.join("-")} className="flex items-center font-sans">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={() => handleSatelliteSelection(range)}
                  checked={satelliteSelections.some(
                    (selected) =>
                      selected[0] === range[0] && selected[1] === range[1]
                  )}
                />
                {`${range[0]}-${range[1]}`}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
