import React, { useState } from 'react';
import FilterDropdown from './FilterDropdown';
import CountryList from './CountryList';
import countryData from '../utils/countries_complete.json';

const CountryPage = ({ searchQuery }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLaunchYears, setSelectedLaunchYears] = useState([]);
  const [selectedSatelliteRanges, setSelectedSatelliteRanges] = useState([]);

  const handleCountryFilterChange = (selectedCountries) => {
    setSelectedCountries(selectedCountries);
    // console.log("Selected Countries:", selectedCountries);
  };

  const handleYearFilterChange = (selectedLaunchYears) => {
    setSelectedLaunchYears(selectedLaunchYears);
    // console.log("Selected Launch Years:", selectedLaunchYears);
  };

  const handleSatelliteFilterChange = (selectedSatelliteRanges) => {
    setSelectedSatelliteRanges(selectedSatelliteRanges);
    // console.log("Selected Number of Satellites:", selectedSatelliteRanges);
  };

  const filteredCountries = countryData.filter((country) => {
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(country.country);
    const matchesLaunchYear = selectedLaunchYears.length === 0 || selectedLaunchYears.includes(country.first_launch_year);
    const matchesSatellites = selectedSatelliteRanges.length === 0 || selectedSatelliteRanges.some((range) => {
      const [min, max] = range;
      return country.satellites >= min && country.satellites <= max;
    });

    const matchesSearchQuery = searchQuery === "" || country.country.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesLaunchYear && matchesSatellites && matchesSearchQuery;
  });

  // console.log("Filtered Countries:", filteredCountries);

  return (
    <div>
      <FilterDropdown
        onCountryFilterChange={handleCountryFilterChange}
        onYearFilterChange={handleYearFilterChange}
        onSatelliteFilterChange={handleSatelliteFilterChange}
      />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default CountryPage;
