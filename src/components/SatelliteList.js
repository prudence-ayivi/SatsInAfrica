import React, { useState, useMemo } from 'react'

const SatelliteList = ({ satellites }) => {
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByName, setSortByName] = useState(false);

  // Tri des satellites selon les options
  const sortedSatellites = useMemo(() => {
    let sorted = [...satellites];
    if (sortByDate) {
      sorted.sort(
        (a, b) => new Date(a.launch_date) - new Date(b.launch_date)
      );
    } else if (sortByName) {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [satellites, sortByDate, sortByName]);

  // Gestion exclusive des filtres
  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    setSortByName(false);
  };
  const handleSortByName = () => {
    setSortByName(!sortByName);
    setSortByDate(false);
  };

  return (     
    <div>
      {/* Filtres */}
      <div className="flex flex-row items-center justify-center gap-6 m-4 text-md font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          Sort by launch date
          <input
            type="checkbox"
            checked={sortByDate}
            onChange={handleSortByDate}
            className="w-4 h-4"
          />
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          Sort by name (A–Z)
          <input
            type="checkbox"
            checked={sortByName}
            onChange={handleSortByName}
            className="w-4 h-4"
          />
        </label>
      </div>

    {/* Satellit list  */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full max-h-[500px] overflow-y-auto bg-white shadow-md rounded-md p-2">
    
      {sortedSatellites.map((sat, index) => (
        <div
          key={index}
          className="flex flex-col items-center border rounded-lg shadow-sm p-2 space-y-1 bg-zinc-100"
        >
          {/* Première ligne : Nom du satellite et badge de statut */}
          <div className="flex items-center w-full">
            <span className="font-semibold text-md md:text-lg mr-2">{sat.name}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                sat.status === 'Active'
                  ? 'bg-[#082F91] text-white'
                  : 'bg-[#F7FF99] text-black'
              }`}
            >
              {sat.status}
            </span>
          </div>

          {/* Deuxième ligne : Pays et date de lancement */}
          <div className="flex flex-row gap-4 w-full text-sm font-medium">
            <span> {sat.country} </span>
            <span> {new Date(sat.launch_date).toLocaleDateString()} </span>
            <span>{sat.orbit_type}</span>
          </div>
           {/* Troisième ligne : Mission du satellite */}
           <div className="flex w-full text-sm text-gray-800">
            <span> Mission : {sat.mission} </span>
          </div>
        </div>
      ))}
    </div>

    </div>

  )
}

export default SatelliteList;