import React, { useState } from 'react';
import { FaSatellite, FaRocket } from 'react-icons/fa';

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const toggleCountryInfo = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  };
  

  return (
    <div className="country-list mt-8">
      {countries.map((country) => (
        <div
          key={country.country}
          className="country-item bg-white p-4 rounded shadow my-2 cursor-pointer"
          onClick={() => toggleCountryInfo(country)}
        >
          {/* Affichage préliminaire ou détaillé selon le pays sélectionné */}
          {selectedCountry === country ? (
            <div className="country-info flex flex-col items-center">
              {/* En-tête cliquable pour revenir à l'affichage initial */}
              <div className="text-center">
                <img src={country.flag} className="h-[60px] w-[80px] mx-auto mb-2" alt={`${country.country} flag`} />
                <h3 className="font-bold mb-4">{country.country}</h3>
              </div>

              {/* Satellites */}
              <div className="satellite-section mb-4">
                <div className="flex items-center justify-start space-x-2">
                  <FaSatellite className="text-xl" />
                  <span className="font-semibold font-title">Satellites</span>
                </div>
                <hr className="my-2" />
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="font-sans">No. of satellites :</div>
                  <div className="text-right font-sans">{country.satellites || "N/A"}</div>
                  <div className="font-sans">First launch year :</div>
                  <div className="text-right font-sans">{country.first_launch_year || "N/A"}</div>
                  <div className="font-sans">Project in progress :</div>
                  <div className="text-right font-sans">{country.space_projects.project_name || "None"}</div>
                </div>
              </div>

              {/* Space Agency */}
              <div className="space-agency-section w-full">
                <div className="flex items-center justify-start space-x-2">
                  <FaRocket className="text-xl" />
                  <span className="font-semibold font-title">Space Agency</span>
                </div>
                <hr className="my-2" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="text-left font-sans">Name :</div>
                  <div className="text-right font-sans">{country.space_agency.name || "N/A"}</div>
                  <div className="text-left font-sans">Created in :</div>
                  <div className="text-right font-sans">{country.space_agency.creation_date || "N/A"}</div>
                  <div className="text-left font-sans">Annual budget :</div>
                  <div className="text-right font-sans">{country.space_agency.budget || "N/A"}</div>
                </div>
              </div>
            </div>
          ) : (
            // Normal display
            <div className="flex flex-row justify-center items-center space-x-4">
              <img src={country.flag} className="h-[60px] w-[80px]" alt={`${country.country} flag`} />
              <div className="text-left">
                <h3 className="font-bold font-title mb-1">{country.country}</h3>
                <p className="font-sans">{country.satellites} satellites</p>
                <p className="font-sans">First launch year: {country.first_launch_year || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountryList;
